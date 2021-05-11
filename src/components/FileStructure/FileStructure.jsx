import React, { Component } from "react";

import styles from "./FileStructure.module.css";
import caret from "./caret.png";
import folderIcon from "./folder.png";

class FileStructure extends Component {
  constructor(props) {
    super(props);

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
          <td>
            {this.state.selectedFolder.type === "file" ? (
              <div className={styles.file_icon}>
                <p className={styles.file_icon_text}>
                  {this.state.selectedFolder.name.match(/\.[0-9a-z]+$/i)[0]}
                </p>
              </div>
            ) : (
              <img
                src={folderIcon}
                style={{
                  height: "1.2em",
                  margin: "0 .25em",
                  verticalAlign: "middle",
                }}
              />
            )}
          </td>
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
          <td>
            {node.type === "file" ? (
              <div className={styles.file_icon}>
                <p className={styles.file_icon_text}>
                  {node.name.match(/\.[0-9a-z]+$/i)[0]}
                </p>
              </div>
            ) : (
              <img
                src={folderIcon}
                style={{
                  height: "1.2em",
                  margin: "0 .25em",
                  verticalAlign: "middle",
                }}
              />
            )}
          </td>
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
          <TreeItem folder={this.props.rootFolder} setFolder={this.setFolder} />
        </div>
        <div className={styles.list_column}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "10%" }} />
                <th style={{ width: "60%" }}>Name</th>
                <th
                  style={{
                    width: "1%",
                    whiteSpace: "nowrap",
                    paddingRight: "1em",
                  }}
                >
                  Date Modified
                </th>
                <th
                  style={{
                    textAlign: "right",
                    width: "1%",
                    whiteSpace: "nowrap",
                  }}
                >
                  File Size
                </th>
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
          className={styles.arrow_container}
          onClick={() => {
            this.setState({ childrenVisible: !this.state.childrenVisible });
          }}
        >
          {this.props.folder.children ? (
            <img src={caret} className={styles.arrow} />
          ) : (
            ""
          )}
        </div>
        <div
          className={styles.docname}
          onClick={() => this.props.setFolder(this.props.folder)}
        >
          <img
            src={folderIcon}
            style={{
              height: "1.2em",
              margin: "0 .25em",
              verticalAlign: "middle",
            }}
          />
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
