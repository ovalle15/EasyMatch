import React, { Component } from 'react';
import styled from 'styled-components';
import * as actions from '../actions';
// import ReactTable from 'react-table-6';
// import 'react-table-6/react-table.css';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../api'
import {DeleteButton} from "../components";
import {Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

class DisplayTrees extends Component {

    state = {
        needsRefresh: false,
        trees: null
    };

    componentDidMount(){
        console.log("TreeList: props");
        this.setState({needsRefresh: !this.state.needsRefresh})
        // api.getAllTrees();
        const trees = api.getAllTrees()
        console.log("This are the trees returned by the api",trees);
        return trees.then(resp => {
            // debugger;
            const trees = resp.data.items;
            this.setState({
                needsRefresh: !this.state.needsRefresh,
                trees
            });
        })
    };

    handleRemoveTree = tree =>{
        const treeId = tree;

        api.deleteTreeById(treeId).then(resp => {
            console.log("handleRemoveTree: resp");
            console.log(resp);
            api.getAllTrees();
        });
    }
    render() {
        console.log(this.state);

        // const data = { "_id": this.state.trees}
        // console.log("state data-->", data)
        console.log("This is the data (_id) ---> ", this.props);

        const { trees } = this.state;
        console.log("this is trees ---->", trees);

        return (trees || []).length > 0 && (
            <Table aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Mongo Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trees.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline-info"
                                    size="sm">
                                    <Link
                                        style={{
                                            color: 'inherit',
                                            textDecoration: 'none'
                                        }}
                                        data-update-id={row._id}
                                        to={`/tree/update/${row._id}`}
                                    >
                                        Update
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <DeleteButton
                                id={row._id}
                                onDelete={this.handleRemoveTree}
                                >
                                </DeleteButton>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        );
    }

}
export default DisplayTrees;