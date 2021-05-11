import FileStructure from "./components/FileStructure/FileStructure";

function App() {
  let rootFolder = {
    type: "folder",
    name: "Documents",
    modified: new Date(),
    children: [
      {
        type: "folder",
        name: "Subfolder",
        modified: new Date(),
        size: 0,
        children: [
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

  return <FileStructure rootFolder={rootFolder} />;
}

export default App;
