import React, { Component } from "react";
import FileStructure from "./components/FileStructure/FileStructure";

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
      size: 66,
      modified: new Date(),
      children: [
        {
          type: "folder",
          name: "Vacation",
          size: 35,
          modified: new Date(),
          children: [
            {
              type: "folder",
              name: "Rome",
              size: 3,
              modified: new Date(),
              children: [
                {
                  type: "file",
                  name: "sevenhills.png",
                  size: 33,
                  modified: new Date(),
                },
              ],
            },
          ],
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFolder: subFolder,
      selectedFile: null,
    };
  }

  setSelected = (item) => {
    console.log(item);
    if (item.type === "folder") {
      this.setState({ selectedFolder: item });
    } else if (item.type === "file") {
      this.setState({ selectedFile: item });
    } else {
      console.warn(`Unknown node type: ${item.type}`);
    }
  };

  render() {
    return (
      <FileStructure
        // set the list of nodes from its root folder
        rootFolder={rootFolder}
        // set the selected items by passing them in as props
        selectedFolder={this.state.selectedFolder}
        selectedFile={this.state.selectedFile}
        // callback function to get selected folder when it updates
        setSelected={this.setSelected}
      />
    );
  }
}

export default App;
