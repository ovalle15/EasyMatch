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


export default class UpdateTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: reorganize this better
            tree: {},
            treeData: [],
            getTreeData: () => this.state.treeData
        };
      this.updateTreeData = this.updateTreeData.bind(this);
      this.addNode = this.addNode.bind(this);
      this.removeNode = this.removeNode.bind(this);
      this.setStateOfTitle = this.setStateOfTitle.bind(this);
      this.updateTreeNodeLabels = this.updateTreeNodeLabels.bind(this);
      this.fetchIndexAtNode = this.fetchIndexAtNode.bind(this);
      this.getFlatDataFromTree = this.getFlatDataFromTree.bind(this);
    }



    componentDidMount(){
        // console.log("TreeList: props");
        // console.log(this.props.match.params.id);
        // api.getAllTrees();
        const { id } = this.props.match.params;
        const tree = api.getTreeById(id)
        // console.log("This are the tree returned by the api",tree);
        return tree.then(resp => {
            // debugger;
            console.log("this is the current data--->",resp.data.item.children)
            const tree = resp.data.item;
            console.log(tree);
            this.setState({
                tree: tree,
                treeData: tree.children,
            });


        })
    };

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
      const num = Math.floor(Math.random() * 90 + 10)
      let NEW_NODE = {
        title: node.title,
        treeIndex: treeIndex + num}
      console.log("This is the new node ====>",NEW_NODE)
      let newTree = addNodeUnderParent({
        treeData: this.state.treeData,
        newNode: NEW_NODE,
        expandParent: true,
        parentKey: parentKey,
        getNodeKey: ({ treeIndex }) => treeIndex,
      });
      // debugger;
      this.setState({ treeData: newTree.treeData });
      console.log("This is newTree ===>",newTree)
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
    fetchIndexAtNode(rowInfo) {
      console.log("Row Info ===>",rowInfo);
      const currentRowInfo = rowInfo

      for (var i=0; i< currentRowInfo.length; i++){
        if (currentRowInfo[i]['children']){
          console.log("ROW INFO ===>",currentRowInfo[i])
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
      const index = JSON.stringify(rowInfo.node.index)
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

      for (var i = 0; i < currentTreeData.length; i++){
        if (currentTreeData[i].index === currentIndex){
          console.log(currentTreeData[i].index === currentIndex)
          currentTreeData[i].title =  value;
          console.log("THIS IS CURRENT TREE DATA===>",currentTreeData[i])
        } else if (currentTreeData[i].treeIndex === currentIndex){
          currentTreeData[i].title = value;
        }

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
      event.preventDefault();
      if (!this.state.treeData || this.state.treeData.length < 1) {
        return [];
      }
      // debugger;
      const flattened = {
        // TODO: clean this up
        title: this.state.tree.title,
        children: this.state.getTreeData()
      }
      console.log("This is the saved tree ---->" , flattened)
      const { _id } = this.state.tree;
      return api.updateTreeById(_id, flattened)
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
        const treeData = this.state.treeData;
        console.log(treeData);
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
                    style={{height: "100%"}}
                    treeData={treeData}
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
                <Link to='/trees'>
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

