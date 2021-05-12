import React, { Component } from "react";

import styles from "./FileStructure.module.css";
import arrow from "./arrow.png";
import folderIcon from "./folder.png";

class FileStructure extends Component {
  constructor(props) {
    super(props);

    // can send in a selected folder with props initially
    this.state = {
      selectedFolder: this.props.selectedFolder
        ? this.props.selectedFolder
        : null,
      selectedFile: null,
    };
  }

  displaySelectedFolder = () => {
    // if there is no selected folder or it has no children, don't display anything
    if (
      !this.state.selectedFolder ||
      this.state.selectedFolder.children === undefined
    ) {
      return;
    }

    // display information for all children of the folder
    return this.state.selectedFolder.children.map((node, index) => {
      let nodeIsFile = node.type === "file";
      let nodeIsSelected = nodesAreEqual(node, this.state.selectedFile);

      return (
        <tr
          key={index}
          style={
            nodeIsFile && nodeIsSelected
              ? { background: "lightgray" }
              : { background: "white" }
          }
        >
          <td>
            {nodeIsFile ? (
              <div className={styles.file_icon}>
                <p
                  className={styles.file_icon_text}
                  style={
                    nodeIsFile && nodeIsSelected
                      ? { background: "lightgray" }
                      : { background: "white" }
                  }
                >
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
                alt={"selection arrow"}
              />
            )}
          </td>
          <td
            onClick={() => {
              // we want different functionality if there's a folder or a file selected
              nodeIsFile
                ? this.setState({ selectedFile: node })
                : this.setSelectedFolder(node);
            }}
            style={{ cursor: "pointer" }}
          >
            {node.name}
          </td>
          <td>{`${node.modified.getMonth()}/${node.modified.getDate()}/${node.modified.getFullYear()}`}</td>
          <td style={{ textAlign: "right" }}>
            {nodeIsFile ? `${node.size} KB` : ""}
          </td>
        </tr>
      );
    });
  };

  setSelectedFolder = (selectedFolder) => {
    this.setState({ selectedFolder: selectedFolder });
    // alert parent of change to selected folder
    this.props.getSelectedFolder(selectedFolder);
  };

  render() {
    return (
      <div className={styles.grid_container}>
        <div className={styles.tree_column}>
          <TreeItem
            folder={this.props.rootFolder}
            setSelectedFolder={this.setSelectedFolder}
            selectedFolder={this.state.selectedFolder}
          />
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
      this.props.folder.children !== undefined &&
      this.props.folder.children
        .map((node, index) => {
          if (node.type === "folder") {
            return (
              <TreeItem
                folder={node}
                key={index}
                setSelectedFolder={this.props.setSelectedFolder}
                selectedFolder={this.props.selectedFolder}
              />
            );
          }

          return null;
        })
        .filter((item) => {
          return item !== null;
        });

    return (
      <div className={styles.file_grid}>
        <div
          className={styles.arrow_container}
          onClick={() => {
            this.setState({ childrenVisible: !this.state.childrenVisible });
          }}
        >
          {childFolders.length > 0 ? (
            <img
              src={arrow}
              className={
                this.state.childrenVisible ? styles.arrow_down : styles.arrow
              }
              alt={"selection arrow"}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className={styles.docname}
          onClick={() => {
            this.props.setSelectedFolder(this.props.folder);
            this.setState({ childrenVisible: true });
          }}
          style={
            nodesAreEqual(this.props.selectedFolder, this.props.folder)
              ? { background: "lightgray" }
              : { background: "white" }
          }
        >
          <img
            src={folderIcon}
            alt={"selection arrow"}
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
          style={{
            display: this.state.childrenVisible ? "block" : "none",
          }}
        >
          {childFolders}
        </div>
      </div>
    );
  }
}

function nodesAreEqual(node1, node2) {
  if (!node1 || !node2) {
    return false;
  }
  // note: since this doesn't take hierarchical order fully into account
  // (since from a given node we don't necessarily know what its parents are)
  // So not the best solution, but better than simply comparing file/folder names
  return (
    node1.type === node2.type &&
    node1.name === node2.name &&
    node1.modified.getTime() === node2.modified.getTime() &&
    node1.size === node2.size &&
    // this method of comparison for children isn't the best, but I implemented
    // it this way to avoid overly long recursive comparisons that *could* have occurred
    node1.children === node2.children &&
    (node1.children === undefined ||
      node1.children.length === node2.children.length)
  );
}

export default FileStructure;
