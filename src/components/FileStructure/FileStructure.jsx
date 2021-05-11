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

    this.testFolder1 = {
      type: "folder",
      name: "Subfolder",
      modified: new Date(),
      size: 0,
      children: [this.testFile1, this.testFile2],
    };

    this.testFolder = {
      type: "folder",
      name: "Documents",
      modified: new Date(),
      children: [this.testFolder1, this.testFile1, this.testFile2],
    };

    this.state = { test: true };
  }

  // displayFileTree = (rootFolder) => {
  //   let isExpanded = false;
  //
  //   let childFolders =
  //     rootFolder.children &&
  //     rootFolder.children.map((node) => {
  //       return this.displayFileTree(node);
  //     });
  //
  //   return (
  //     <div className={styles.file_grid}>
  //       <div
  //         className={styles.arrow}
  //         onClick={() => {
  //           isExpanded = !isExpanded;
  //           console.log(isExpanded);
  //         }}
  //       >
  //         {rootFolder.children ? "V" : ""}
  //       </div>
  //       <div className={styles.docname}>{rootFolder.name}</div>
  //       <div
  //         className={styles.doclist}
  //         style={{ display: isExpanded ? "" : "none" }}
  //       >
  //         {childFolders}
  //       </div>
  //     </div>
  //   );
  // }

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
          <td style={{ textAlign: "right" }}>
            {node.type === "folder" ? "" : `${node.size} KB`}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className={styles.grid_container}>
        <div className={styles.tree_column}>
          <TreeItem folder={this.testFolder} />
        </div>
        <div className={styles.list_column}>
          <table>
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Date Modified</th>
                <th style={{ textAlign: "right" }}>File Size</th>
              </tr>
            </thead>
            <tbody>{this.displaySelectedFolder(this.testFolder)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class TreeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childrenVisible: false,
    };
  }

  render() {
    let childFolders =
      this.props.folder.children &&
      this.props.folder.children.map((node, index) => {
        return <TreeItem folder={node} key={index} />;
      });

    return (
      <div className={styles.file_grid}>
        <div
          className={styles.arrow}
          onClick={() => {
            this.setState({ childrenVisible: !this.state.childrenVisible });
          }}
        >
          {this.props.folder.children ? "V" : ""}
        </div>
        <div className={styles.docname}>{this.props.folder.name}</div>
        <div
          className={styles.doclist}
          style={{ display: this.state.childrenVisible ? "block" : "none" }}
        >
          {childFolders}
        </div>
      </div>
    );
  }
}

export default FileStructure;
