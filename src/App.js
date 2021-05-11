import FileStructure from "./components/FileStructure/FileStructure";

function getSelectedFolder(selectedFolder) {
  // Here you'd be able to do whatever with the selected folder
  console.log(selectedFolder);
}

function App() {
  const subFolder = {
    type: "folder",
    name: "Subfolder",
    modified: new Date(),
    size: 0,
    children: [
      {
        type: "folder",
        name: "Trash",
        size: 3,
        modified: new Date(),
      },
      {
        type: "file",
        name: "test.pdf",
        size: 17,
        modified: new Date(),
      },
      {
        type: "file",
        name: "somefile.pdf",
        size: 3,
        modified: new Date(),
      },
    ],
  };

  const rootFolder = {
    type: "folder",
    name: "Documents",
    modified: new Date(),
    children: [
      subFolder,
      {
        type: "folder",
        name: "Images",
        size: 3,
        modified: new Date(),
      },
      {
        type: "file",
        name: "test.pdf",
        size: 17,
        modified: new Date(),
      },
      {
        type: "file",
        name: "test.txt",
        size: 5,
        modified: new Date(),
      },
    ],
  };

  return (
    <FileStructure
      // set the list of nodes from its root folder
      rootFolder={rootFolder}
      // set the selected folder by passing it in as props
      selectedFolder={subFolder}
      // callback function to get selected folder when it updates
      getSelectedFolder={getSelectedFolder}
    />
  );
}

export default App;
