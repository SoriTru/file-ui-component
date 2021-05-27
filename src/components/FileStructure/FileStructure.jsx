import React, { Component } from "react";

import styles from "./FileStructure.module.css";
import arrow from "./arrow.png";
import folderIcon from "./folder.png";

class FileStructure extends Component {
  displaySelectedFolder = () => {
    // if there is no selected folder or it has no children, don't display anything
    if (
      !this.props.selectedFolder ||
      this.props.selectedFolder.children === undefined
    ) {
      return;
    }

    // display information for all children of the folder
    return this.props.selectedFolder.children.map((node, index) => {
      let nodeIsFile = node.type === "file";
      let nodeIsSelected = nodesAreEqual(node, this.props.selectedFile);

      return (
        <tr
          key={index}
          className={
            nodeIsFile && nodeIsSelected
              ? styles.item_selected
              : styles.item_unselected
          }
        >
          <td>
            {nodeIsFile ? (
              <div className={styles.file_icon}>
                <p
                  className={`${styles.file_icon_text} ${
                    nodeIsFile && nodeIsSelected
                      ? styles.item_selected
                      : styles.item_unselected
                  }`}
                >
                  {node.name.match(/\.[0-9a-z]+$/i)[0]}
                </p>
              </div>
            ) : (
              <img
                src={folderIcon}
                className={styles.folder_icon}
                alt={"selection arrow"}
              />
            )}
          </td>
          <td
            onClick={() => {
              this.props.setSelected(node);
            }}
            className={styles.clickable}
          >
            {node.name}
          </td>
          <td>{`${node.modified.getMonth()}/${node.modified.getDate()}/${node.modified.getFullYear()}`}</td>
          <td>{nodeIsFile ? `${node.size} KB` : ""}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className={styles.grid_container}>
        <div className={styles.tree_column}>
          <TreeItem
            folder={this.props.rootFolder}
            setSelected={this.props.setSelected}
            selectedFolder={this.props.selectedFolder}
          />
        </div>
        <div className={styles.list_column}>
          <table>
            <thead>
              <tr>
                <th />
                <th className={styles.name_column}>Name</th>
                <th className={styles.date_column}>Date Modified</th>
                <th>File Size</th>
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
                setSelected={this.props.setSelected}
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
          className={`${styles.docname} ${
            nodesAreEqual(this.props.selectedFolder, this.props.folder)
              ? styles.item_selected
              : styles.item_unselected
          }`}
          onClick={() => {
            this.props.setSelected(this.props.folder);
            this.setState({ childrenVisible: true });
          }}
        >
          <img
            src={folderIcon}
            alt={"selection arrow"}
            className={styles.folder_icon}
          />
          {this.props.folder.name}
        </div>
        <div
          className={`${styles.doclist} ${
            this.state.childrenVisible ? styles.visible : styles.hidden
          }`}
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
