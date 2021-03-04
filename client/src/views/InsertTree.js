import React, { Component } from 'react';
import styled from 'styled-components';
import SortableTree from "react-sortable-tree";
import {
  addNodeUnderParent,
  getNodeAtPath,
  removeNodeAtPath,
} from "../utils/tree-data-utils";
import Button from "react-bootstrap/Button";

import api from "../api";
import {Link} from 'react-router-dom';




const HomeStyles = styled.div.attrs({
  className: 'tree-view'
})`
  padding:0% 25%;
  height: 100vh;
`;


export default class InsertTree extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tree: {
          // title: "bhe",
          title: "PLACEHOLDER",
          trees: () => this.state.treeData
        },
        treeData: [
          { title: "", expanded: true , index: 0},
          { title: "", expanded: true , index: 1},
          {
            title: "",
            expanded: true,
            index: 2,
            children: [
              { title: "" , index: 3},
              {
                title: "",
                expanded: false,
                index: 4,
                children: [{ title: "" , index: 5}],
              },
            ],
          },
        ],
      };

      this.updateTreeData = this.updateTreeData.bind(this);
      this.addNode = this.addNode.bind(this);
      this.removeNode = this.removeNode.bind(this);
      this.setStateOfTitle = this.setStateOfTitle.bind(this);
      this.updateTreeNodeLabels = this.updateTreeNodeLabels.bind(this);
      this.fetchIndexAtNode = this.fetchIndexAtNode.bind(this);
      this.getFlatDataFromTree = this.getFlatDataFromTree.bind(this);
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
      let getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
      };
      let parentKey = getNodeKey(parentNode);
      if (parentKey === -1) {
        parentKey = null;
      }

      let NEW_NODE = {
        title: node.title,
        treeIndex: treeIndex + 1}
      console.log("This is the NEW NODE ===>",NEW_NODE)
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
      // console.log("This is rowInfo ===>", this.state.rowInfo)
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
    fetchIndexAtNode(rowInfo) {
      // console.log(rowInfo);
      const currentRowInfo = rowInfo

      for (var i=0; i< currentRowInfo.length; i++){
        if (currentRowInfo[i]['children']){
          console.log(currentRowInfo[i])
          const children = currentRowInfo[i]['children']
          for (var c=0; c <children.length; i++){
            const index = JSON.stringify(children[i])
            return index
          }
        }
      }
      if (currentRowInfo.node.treeIndex){
        console.log("rowInfo treeIndex ===>", currentRowInfo.node.treeIndex)
        const index =JSON.stringify(currentRowInfo.node.treeIndex)
        return index
      }
      const index = JSON.stringify(rowInfo['node']['index'])
      return index

    }

    updateTreeNodeLabels(event) {
      // console.log("this event ==>", event.target.index)

      const target = event.target;
      // console.log("this state target ===>", target)
      const value = target.value;
      console.log("this state value ===>", value)
      const name= target.name;
      const currentIndex = parseInt(name);
      console.log("this state name index ===>", parseInt(name))
      const currentTreeData = this.state.treeData;

      console.log(currentTreeData);
      for (var i = 0; i < currentTreeData.length; i++){
        if (currentTreeData[i].index === currentIndex){
          console.log(currentTreeData[i].index === currentIndex)
          currentTreeData[i].title =  value;
          console.log(currentTreeData[i])
        } else if (currentTreeData[i].treeIndex === currentIndex){
            currentTreeData[i].title = value;
        }
      // console.log(this.state.)
      }
    }
    setStateOfTitle(event) {
      const target = event.target;
      // console.log("This is target ===>",target)
      const value = target.value;
      // console.log("This is value ===>",value)
      const name= target.name
      console.log("This is name ===>",name)
      this.state.tree.title = value
    }

    getFlatDataFromTree(event) {
      // event.preventDefault();
      // debugger;
      if (!this.state.treeData || this.state.treeData.length < 1) {
        return [];
      }
      // debugger;
      // console.log(" this is the state.tree.title ====>" ,this.state.tree.title)
      const flattened = {
        title: this.state.tree.title,
        children: this.state.tree.trees()
      }
      console.log("This is the saved tree ---->" , flattened)

      return api.insertTree(flattened)
        .then(resp => {
          // console.log("this is the response", resp)
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
        // TO DO BFS TREE WALKING
        /**
         * --- indexing ideas ---
         * "topTier0"
         * - "topTier0.nextTier0"
         * -- "topTier0.nextTier0.nextNextTier0"
         * - "topTier0.nextTier1"
         * -- "topTier0.nextTier1.nextNextTier0"
         * - "topTier0.nextTier2"
         * -- "topTier0.nextTier2.nextNextTier0"
         * -- "topTier0.nextTier2.nextNextTier1"
         * -- "topTier0.nextTier2.nextNextTier2"
         *
         *
         * var indexTree = "topTier0.nextTier1.nextNextTier1".split('.')
         *
         */
      return (


          <HomeStyles>
            <br></br>
            <h4>Enter Title</h4>
            <input
              style={{width: "50%"}}
              name="treeTitle"
              type="string"
              value={this.state.rowInfo}
              onChange={this.setStateOfTitle}
              ></input>
              <br></br>
            <SortableTree
              treeData={this.state.treeData}
              onChange={(treeData) => {
                this.setState({ treeData })}
              }
              generateNodeProps={(rowInfo) => ({
                buttons: [
                  <div>
                    <input
                      style={{width: "45%"}}
                      maxLength="15"
                      name={this.fetchIndexAtNode(rowInfo)}
                      type="string"
                      value={this.state.rowInfo}
                      onChange={this.updateTreeNodeLabels}
                      ></input>
                    &nbsp;
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
              onClick={this.getFlatDataFromTree}
              >
                Save
              </Button>
            </Link>
          </HomeStyles>


      );

    }

  }

