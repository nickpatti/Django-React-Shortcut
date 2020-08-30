import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { withAlert } from 'react-alert';


import axios from "axios";

import {createMessage} from '../actions/messages';


class NewHomePageForm extends Component {
    state = {
        id:0,
        title: "",
        content: "",
    }

    componentDidMount() {
        if (this.props.homepage) {
            const { id, title, content } = this.props.homepage;
            this.setState({ id, title, content });

        }
    }



    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    createHomePage = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);

        axios.post('/api/homepage/', form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
            }).then(() => {
            this.props.resetState();
            this.props.toggle();
            this.props.alert.success("Home Page Created")

        });
    };

    editHomePage = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        axios.put('/api/homepage/' + this.state.id + '/', form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then(() =>{
            this.props.resetState();
            this.props.toggle();
            this.props.alert.success("Home Page Updated")
        }).catch(err => {this.props.alert.error(err)
        })
    };

    defaultIfEmpty = value => {
        return value === ""?"" : value;
    }

    render() {
        return(
            <Form onSubmit={this.props.homepage ? this.editHomePage: this.createHomePage}>
                <FormGroup>
                    <Label for="title">Title: </Label>
                    <Input
                    type="text" name="title" onChange={this.onChange} value={this.defaultIfEmpty(this.state.title)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content: </Label>
                    <Input
                    type="text" name="content" onChange={this.onChange} value={this.defaultIfEmpty(this.state.content)}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default withAlert()(NewHomePageForm);
