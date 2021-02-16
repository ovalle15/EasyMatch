// import { Button } from 'bootstrap';
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from "react-bootstrap/Button";

const Delete = styled.button`
    align-items: center;
    background: Darkred;
    color: white;
    cursor: pointer;
    border: 1px solid #1a202c;
    padding: 2px;
    min-width: 20px;
    transition: all 0.1s ease-in;
    &:hover {
        background: transparent;
        color: red;
    }
`;

class DeleteButton extends Component {
    confirmDeleteItem = event => {
        event.preventDefault();

        if (
            window.confirm(
                `Do you want to permanently delete this item? ${this.props.id}`,
            )
        ) {
            this.props.onDelete(this.props.id);
        }

    }

    render() {
        return <Button variant="outline-danger"
        size="sm" onClick={this.confirmDeleteItem}>Delete</Button>;
    }
};
export default DeleteButton;
