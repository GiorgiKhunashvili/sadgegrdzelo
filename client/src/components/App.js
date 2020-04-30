import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateSad from './sadgegrdzelo/CreateSad';
import SadList from './sadgegrdzelo/SadList';
import EditSad from './sadgegrdzelo/EditSad';
import DeleteSad from './sadgegrdzelo/DeleteSad';

import Login from './auth/Login';
import Signup from './auth/SignUp';

import Header from './Header';
import history from '../history'

import PrivateRoute from './PrivateRout';
class App extends React.Component {

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={SadList} />
                        {/* <Route path="/sad/create" exact component={CreateSad} onClick={this.requireAuth} /> */}
                        <Route path="/sad/edit" exact component={EditSad} />
                        <Route path="/sad/delete" exact component={DeleteSad} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <PrivateRoute path="/sad/create" exact component={CreateSad} />
                    </div>
                </Router>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App);