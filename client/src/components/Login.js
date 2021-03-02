// import  response  from 'express';
import React from 'react';
import { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css';
import api from '../api';




class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
            // id:''
        };
        console.log("this is the current state", this);

        // this.getToken = this.getToken.bind(this);
        // const token = this.getToken();
        // console.log("Token --->", token);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    // findCurrentUsers = (all_users) => {
    //     console.log(all_users.data.items);
    // }


    handleSubmit = (event, user) => {
        console.log("User ??? #1", this.state)

        const all_users = api.getUsers();

        all_users.then(resp => {
            if (resp) {
                console.log(resp.data.items)
            }
            const array = resp.data.items;
            var i;
            const len = array.length;
            for (i=0; i < len; i++){
            // console.log("This array ==>", array[i]['name'])
                if (array[i]['email'] == this.state.email && array[i]['password'] == this.state.password) {
                    // window.alert("You " + this.state.email + "Login !!!!");
                    const _id = array[i]['_id']
                    const treeId = array[i]['trees']
                    console.log(treeId)
                    console.log(_id)


            }}

        })
        event.preventDefault();
        // return api.getTreeById(treeId)

        // console.log("All users", all_users);
        // fetch("http://localhost:3000/api/users/all", {
        //     method: 'GET',
        //     // body: JSON.stringify({user:this.state}),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //       })
        // }).then(
        //     (response)  =>  {
        //         // debugger;
        //         response.json()
        //     }
        // ).then((data) => {
        //     console.log("This data ---->", data);
        //     // this.props.setToken(data.sessionToken)
        // }).catch((e) => {
        //     console.log("This is the erroror !!!1", e)

        // });
        // console.log("User ???", this.state)
        // console.log("Data", this.state.data);

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit} >
                    {/* <FormGroup>
                        <Label for="name">First Name</Label>
                        <Input id="li_name" type="text" name="name" placeholder="enter first name" onChange={this.handleChange} />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="li_email"
                        type="text"
                        name="email"
                        placeholder="enter email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                        id="li_password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="enter password"
                        onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default Login;