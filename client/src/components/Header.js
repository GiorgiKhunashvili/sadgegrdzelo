import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
    render() {
        return (
            <div>
            <div className="ui secondary pointing menu">
                <Link to="/" className="active item">
                    Home
                </Link>
                <Link
                    to="/sad/create"
                    className="item"
                    onClick={(e) => e.target.classList.add('active')}
                >
                    Create Sad
                </Link>
                <a className="item">
                    Friends
                </a>
                <div className="right menu">
                    <a className="ui item">
                    Logout
                    </a>
                </div>
                </div>
            </div>
        )
    }
}

export default Header;