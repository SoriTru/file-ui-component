import React, { Component } from "react";

import styles from "./FileStructure.module.css";

class FileStructure extends Component {
  constructor(props) {
    super(props);

    this.testFile1 = {
      type: "file",
      name: "test.txt",
      size: 5,
      modified: new Date(),
    };

    this.testFile2 = {
      type: "file",
      name: "test.pdf",
      size: 17,
      modified: new Date(),
    };

    this.testFolder = {
      type: "folder",
      name: "Documents",
      modified: new Date(),
      children: [this.testFile1, this.testFile2],
    };
  }

  displaySelectedFolder = (selectedFolder) => {
    // if the selected folder doesn't have content, don't display anything
    if (!selectedFolder.children || selectedFolder.children.length === 0) {
      return;
    }

    return selectedFolder.children.map((node, index) => {
      return (
        <tr key={index}>
          {/*TODO: replace with actual icons*/}
          <td>{node.type === "file" ? "FI" : "FO"}</td>
          <td>{node.name}</td>
          <td>{`${node.modified.getMonth()}/${node.modified.getDate()}/${node.modified.getFullYear()}`}</td>
          <td>{node.type === "folder" ? "" : `${node.size} KB`}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className={styles.grid_container}>
        <div className={styles.tree_column}></div>
        <div className={styles.list_column}>
          <table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Date Modified</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>{this.displaySelectedFolder(this.testFolder)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FileStructure;
