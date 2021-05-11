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

    this.state = { selectedFolder: null };
  }

  displaySelectedFolder = () => {
    // if there is no selected folder, don't display anything
    if (!this.state.selectedFolder) {
      return;
    }

    // if the "folder" selected if just a file, display the file information
    if (!this.state.selectedFolder.children) {
      return (
        <tr>
          <td>{this.state.selectedFolder.type === "file" ? "FI" : "FO"}</td>
          <td>{this.state.selectedFolder.name}</td>
          <td>{`${this.state.selectedFolder.modified.getMonth()}/${this.state.selectedFolder.modified.getDate()}/${this.state.selectedFolder.modified.getFullYear()}`}</td>
          <td style={{ textAlign: "right" }}>
            {this.state.selectedFolder.type === "folder"
              ? ""
              : `${this.state.selectedFolder.size} KB`}
          </td>
        </tr>
      );
    }

    // display information for all children of the folder
    return this.state.selectedFolder.children.map((node, index) => {
      return (
        <tr key={index}>
          {/*TODO: replace with actual icons*/}
          <td>{node.type === "file" ? "FI" : "FO"}</td>
          <td
            onClick={() => this.setFolder(node)}
            style={{ cursor: "pointer" }}
          >
            {node.name}
          </td>
          <td>{`${node.modified.getMonth()}/${node.modified.getDate()}/${node.modified.getFullYear()}`}</td>
          <td style={{ textAlign: "right" }}>
            {node.type === "folder" ? "" : `${node.size} KB`}
          </td>
        </tr>
      );
    });
  };

  setFolder = (selectedFolder) => {
    this.setState({ selectedFolder: selectedFolder });
  };

  render() {
    return (
      <div className={styles.grid_container}>
        <div className={styles.tree_column}>
          <TreeItem folder={this.testFolder} setFolder={this.setFolder} />
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
            <tbody>{this.displaySelectedFolder()}</tbody>
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
        return (
          <TreeItem
            folder={node}
            key={index}
            setFolder={this.props.setFolder}
          />
        );
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
        <div
          className={styles.docname}
          onClick={() => this.props.setFolder(this.props.folder)}
        >
          {this.props.folder.name}
        </div>
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
