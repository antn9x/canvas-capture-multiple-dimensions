const filesInDirectory = (dir: FileSystemDirectoryEntry): any =>
  new Promise(resolve =>
    dir.createReader().readEntries((entries) =>
      Promise.all(
        entries
          .filter(e => e.name[0] !== ".")
          .map(
            e =>
              e.isDirectory
                ? filesInDirectory(e as FileSystemDirectoryEntry)
                : new Promise(resolve => (e as FileSystemFileEntry).file(resolve))
          )
      )
        .then((files: any) => [].concat(...files))
        .then(resolve)
    )
  );

const timestampForFilesInDirectory = (dir: FileSystemDirectoryEntry) =>
  filesInDirectory(dir).then((files: any) =>
    files.map((f: { name: any; lastModifiedDate: any; }) => f.name + f.lastModifiedDate).join()
  );

const reload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0].id) {
      chrome.tabs.reload(tabs[0].id);
    }

    chrome.runtime.reload();
  });
};

const watchChanges = (dir: FileSystemDirectoryEntry, lastTimestamp?: string) => {
  timestampForFilesInDirectory(dir).then((timestamp: string) => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      reload();
    }
  });
};

chrome.management.getSelf(self => {
  if (self.installType === "development") {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
  }
});
