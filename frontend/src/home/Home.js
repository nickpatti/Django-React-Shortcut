import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import HomePageList from "./HomePage";
import NewHomePageModal from "./NewHomePageModal";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import axios from "axios";


class HomePage extends Component {
    state = {
        homepages: []
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
    };


    componentDidMount() {
        this.resetState();
    }

    getHomePage = () => {
        axios.get('/api/homepage/').then(res => this.setState({ homepages: res.data }));
    };

    resetState = () => {
        this.getHomePage();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const createView = (
            <Row>
                <Col>
                    <NewHomePageModal create={true} resetState={this.resetState} />
                </Col>
            </Row>
        )

        const notAuth = (
            <div />
        )

        return(
            <div>
            { isAuthenticated ? createView : notAuth}
            <div className="scene_element scene_element--fadein">
                <HomePageList
                    homepages={this.state.homepages}
                    resetState={this.resetState}
                />
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
      auth: state.auth,
    })

export default connect(mapStateToProps, )(HomePage);
