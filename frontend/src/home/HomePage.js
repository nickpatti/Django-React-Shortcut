import React, { Component, Fragment } from "react";
import { Button } from "reactstrap"
import NewHomePageModal from "./NewHomePageModal";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class HomePageList extends Component{
        static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    render() {
        const homepages = this.props.homepages;
        const { isAuthenticated, user } = this.props.auth;

        return(
            <div>
                {!homepages || homepages.length <= 0 ? (
                    <h1>No home page created yet</h1>
                    ) : (
                    homepages.map(homepage => (
                        <div className="home" key={homepage.id}>
                            <h1>{homepage.title}</h1>
                            <h4>{homepage.content}</h4>
                            { isAuthenticated
                            ? <Fragment>
                                <NewHomePageModal
                                    create={false}
                                    homepage={homepage}
                                    resetState={this.props.resetState}
                                />
                                &nbsp;&nbsp;
                                <ConfirmRemovalModal
                                    id={homepage.id}
                                    resetState={this.props.resetState}
                                />
                            </Fragment>
                            :<div />
                        }

                        </div>

                    ))

                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
      auth: state.auth,
    })


export default connect(mapStateToProps, )(HomePageList);
