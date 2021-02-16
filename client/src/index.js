
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';
const RootStyles = styled.div`
  /* max-height: 100vh; */
  height: 100%;
  width: 100vw
`;

ReactDOM.render(
  <RootStyles>
    <App />
  </RootStyles>,
  document.getElementById('root')
)

// import { render } from "react-dom";
// import SortableTree, {
//   SortableTreeWithoutDndContext,
// } from "react-sortable-tree";
// import {
//   addNodeUnderParent,
//   // getFlatDataFromTree,
//   // getDescendantCount,
//   // walk,
//   // walkDescendants,
//   getNodeAtPath,
//   removeNodeAtPath,
// } from "./utils/tree-data-utils";
// import Button from "react-bootstrap/Button";
// import styled, { ThemeConsumer } from 'styled-components'
// import "bootstrap/dist/css/bootstrap.min.css";
// import { get } from "mongoose";
// import InputForm from './utils/InputForm';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import apis from "./api/index";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { routes } from './routes';
// import { DisplayTrees, PageLayout } from './views';

// const HomeStyles = styled.div`
//   padding:0% 25%;
//   height: 100vh;
// `;
// const SaveButton = styled.button`
//   padding: 0% 25%;
//   align-items: center;
//   background: #1a202c;
//   color: white;
//   cursor: pointer;
//   border: 1px solid #1a202c;
//   padding: 8px;
//   min-width: 64px;
//   transition: all 0.1s ease-in;
//   &:hover {
//     background: transparent;
//     color: black;
// }
// `;

// export default class Tree extends Component {
//   constructor(props) {
//     super(props);
//     this.updateTreeData = this.updateTreeData.bind(this);
//     this.addNode = this.addNode.bind(this);
//     this.removeNode = this.removeNode.bind(this);
//     this.state = {
//       tree: {
//         title: "Recent Title",
//         trees: () => this.state.treeData
//       },
//       treeData: [
//         { title: "AND", expanded: true },
//         { title: "OR", expanded: true },
//         {
//           title: "ERBB2",
//           expanded: true,
//           children: [
//             { title: "MUTATION" },
//             {
//               title: "CNV",
//               expanded: false,
//               children: [{ title: "High Amplification" }],
//             },
//           ],
//         },
//         {
//           title: "MTAP",
//           expanded: true,
//           children: [
//             {
//               title: "MUTATION",
//               expanded: false,
//               children: [
//                 { title: "p.R654L" },
//                 { title: "p.T657K" },
//                 { title: "p.Y89I" },
//               ],
//             },
//             { title: "Structural Variation" },
//           ],
//         },
//         {
//           title: "MTOR",
//           expanded: true,
//           children: [{ title: "CNV" }, { title: "MUTATION" }],
//         },
//       ],
//     };
//   }

//   addNode(rowInfo) {

//     let { node, treeIndex, path } = rowInfo;
//     path.pop();
//     let parentNode = getNodeAtPath({
//       treeData: this.state.treeData,
//       path: path,
//       getNodeKey: ({ treeIndex }) => treeIndex,
//       ignoredCollapsed: true,
//     });
//     // console.log(parentNode)
//     let getNodeKey = ({ node: object, treeIndex: number }) => {
//       return number;
//     };
//     let parentKey = getNodeKey(parentNode);
//     if (parentKey === -1) {
//       parentKey = null;
//     }
//     // console.log(getNodeKey)

//     let NEW_NODE = {
//       title: node.title,
//       treeIndex: treeIndex + 1}
//     console.log(NEW_NODE)
//     let newTree = addNodeUnderParent({
//       treeData: this.state.treeData,
//       newNode: NEW_NODE,
//       expandParent: true,
//       parentKey: parentKey,
//       getNodeKey: ({ treeIndex }) => treeIndex,
//     });
//     // debugger;
//     this.setState({ treeData: newTree.treeData });
//     console.log(newTree)
//   }

//   removeNode(rowInfo) {
//     let { node, treeIndex, path } = rowInfo;
//     this.setState({
//       treeData: removeNodeAtPath({
//         treeData: this.state.treeData,
//         path: path,
//         getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
//           console.log(number);
//           return number;
//         },
//         ignoredCollapsed: false,
//       }),
//     });
//   }

//   updateTreeData(treeData) {
//     this.setState({ treeData });
//   }

//   getFlatDataFromTree() {
//     // debugger;
//     if (!this.state.treeData || this.state.treeData.length < 1) {
//       return [];
//     }
//     // debugger;
//     const flattened = {
//       title: this.state.tree.title,
//       children: this.state.tree.trees()
//     }
//     console.log("This is the saved tree ---->" , flattened)

//     return apis.insertTree(flattened)
//       .then(resp => {
//         console.log("this is the response", resp)
//         if (resp) {
//           window.alert(resp.data.message);
//         }
//         return resp;
//       })
//       .catch(err => {
//         console.error(err);
//         return err;
//       });


//   };

// render() {

//     return (


//         <HomeStyles>
//           <Router>
//             <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
//               <Navbar.Brand href="#home">Todo-React-App</Navbar.Brand>
//               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//               <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto">
//                   <Nav.Link href="/trees">Get Trees</Nav.Link>
//                   <Nav.Link href="/tree">Create Tree</Nav.Link>
//                 </Nav>
//               </Navbar.Collapse>
//             </Navbar>
//           </Router>
// {/*
//           <SortableTree
//             treeData={this.state.treeData}
//             onChange={(treeData) => {
//               debugger;
//               this.setState({ treeData })}
//             }
//             generateNodeProps={(rowInfo) => ({
//               buttons: [
//                 <div>
//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={(event) => this.removeNode(rowInfo)}
//                   >
//                     delete
//                   </Button>
//                   &nbsp;
//                   <Button
//                     variant="outline-info"
//                     size="sm"
//                     onClick={(event) => this.addNode(rowInfo)}
//                   >
//                     add
//                   </Button>
//                 </div>,
//               ],
//             })}
//           />
//           <SaveButton
//           type="button"
//           variant="success"
//           size="lg"
//           onClick={(event) => this.getFlatDataFromTree()}
//           >
//             Save
//           </SaveButton> */}
//         </HomeStyles>


//     );

//   }

// }

// render(<Tree />, document.getElementById("root"));
