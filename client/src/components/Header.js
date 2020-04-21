import React from 'react';
import { NavLink } from 'react-router-dom';


class Header extends React.Component {
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
                <div className="right menu">

                    <div className="item">
                        <div className="ui primary button">Sign Up</div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Header;