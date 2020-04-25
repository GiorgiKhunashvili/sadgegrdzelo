import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../actions/index';

class Header extends React.Component {

    renderAuthLink() {
        if (this.props.isSignIn){
            return (
                <div className="right menu">
                    <div className="item">
                        <NavLink to="/" exact onClick={this.props.logout()} className="ui primary button">Log out</NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="right menu">
                    <div className="item">
                        <NavLink to="/signup" exact className="ui primary button">Sign Up</NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/login" exact className="ui primary button">Sign In</NavLink>
                    </div>
                </div>
            )
        }
    }
    
    render() {
        return (
            <div>
                <div className="ui large menu">
                <NavLink to="/" exact className="item" activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/sad/create" exact className="item" activeClassName="active">
                    Messages
                </NavLink>
                {this.renderAuthLink()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignIn: state.auth.isSignIn
    }
}

export default connect(mapStateToProps, { logout })(Header);