import React from 'react';

import { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


import '../App.css';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
            // id:''
        };
        console.log("this is the current state", this);
        console.log("LOCAL STORAGE?????",localStorage);
        window.localStorage.getItem('token:')

        // this.getToken = this.getToken.bind(this);
        // const token = this.getToken();
        // console.log("Token --->", token);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // fetchToken = (event) => {
    //     fetch("http://localhost:3000/api/users/create", {

    //     })
    // }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/api/users/current", {
            method: 'GET',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
              })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log("This data ---->", data);
            this.props.setToken(data.sessionToken)
        })
        console.log("User ???", this.state)
        console.log("Data", this.state.data);
        event.preventDefault()
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