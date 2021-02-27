import React, { Component } from 'react';
import styled from 'styled-components';
import SortableTree, {
    SortableTreeWithoutDndContext,
} from "react-sortable-tree";
import {
  addNodeUnderParent,
  // getFlatDataFromTree,
  // getDescendantCount,
  // walk,
  // walkDescendants,
  getNodeAtPath,
  removeNodeAtPath,
} from "../utils/tree-data-utils";
import Button from "react-bootstrap/Button";

import api from "../api";
import {Link} from 'react-router-dom';
import { SwipeableDrawer } from '@material-ui/core';



const HomeStyles = styled.div.attrs({
  className: 'tree-view'
})`
  padding:0% 25%;
  height: 100vh;
`;


export default class InsertTree extends Component {
    constructor(props) {
      super(props);
      this.updateTreeData = this.updateTreeData.bind(this);
      this.addNode = this.addNode.bind(this);
      this.removeNode = this.removeNode.bind(this);
      this.state = {
        tree: {
          title: "Recent Title",
          trees: () => this.state.treeData
        },
        treeData: [
          { title: "AND", expanded: true },
          { title: "OR", expanded: true },
          {
            title: "ERBB2",
            expanded: true,
            children: [
              { title: "MUTATION" },
              {
                title: "CNV",
                expanded: false,
                children: [{ title: "High Amplification" }],
              },
            ],
          },
          {
            title: "MTAP",
            expanded: true,
            children: [
              {
                title: "MUTATION",
                expanded: false,
                children: [
                  { title: "p.R654L" },
                  { title: "p.T657K" },
                  { title: "p.Y89I" },
                ],
              },
              { title: "Structural Variation" },
            ],
          },
          {
            title: "MTOR",
            expanded: true,
            children: [{ title: "CNV" }, { title: "MUTATION" }],
          },
        ],
      };
    }

    addNode(rowInfo) {

      let { node, treeIndex, path } = rowInfo;
      path.pop();
      let parentNode = getNodeAtPath({
        treeData: this.state.treeData,
        path: path,
        getNodeKey: ({ treeIndex }) => treeIndex,
        ignoredCollapsed: true,
      });
      // console.log(parentNode)
      let getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
      };
      let parentKey = getNodeKey(parentNode);
      if (parentKey === -1) {
        parentKey = null;
      }
      // console.log(getNodeKey)

      let NEW_NODE = {
        title: node.title,
        treeIndex: treeIndex + 1}
      console.log(NEW_NODE)
      let newTree = addNodeUnderParent({
        treeData: this.state.treeData,
        newNode: NEW_NODE,
        expandParent: true,
        parentKey: parentKey,
        getNodeKey: ({ treeIndex }) => treeIndex,
      });
      // debugger;
      this.setState({ treeData: newTree.treeData });
      console.log(newTree)
    }

    removeNode(rowInfo) {
      let { node, treeIndex, path } = rowInfo;
      this.setState({
        treeData: removeNodeAtPath({
          treeData: this.state.treeData,
          path: path,
          getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
            console.log(number);
            return number;
          },
          ignoredCollapsed: false,
        }),
      });
    }

    updateTreeData(treeData) {
      this.setState({ treeData });
    }

    getFlatDataFromTree() {
      // debugger;
      if (!this.state.treeData || this.state.treeData.length < 1) {
        return [];
      }
      // debugger;
      const flattened = {
        title: this.state.tree.title,
        children: this.state.tree.trees()
      }
      console.log("This is the saved tree ---->" , flattened)

      return api.insertTree(flattened)
        .then(resp => {
          console.log("this is the response", resp)
          if (resp) {
           window.alert(resp.data.message);
          }
          return resp;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    };

  render() {
        // debugger;
      return (


          <HomeStyles>

            <SortableTree
              treeData={this.state.treeData}
              onChange={(treeData) => {
                debugger;
                this.setState({ treeData })}
              }
              generateNodeProps={(rowInfo) => ({
                buttons: [
                  <div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(event) => this.removeNode(rowInfo)}
                    >
                      delete
                    </Button>
                    &nbsp;
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={(event) => this.addNode(rowInfo)}
                    >
                      add
                    </Button>
                  </div>,
                ],
              })}
            />
            <Link to="/trees">
              <Button
              type="button"
              variant="outline-success"
              size="lg"
              onClick={(event) => this.getFlatDataFromTree()}
              >
                Save
              </Button>
            </Link>
          </HomeStyles>


      );

    }

  }

