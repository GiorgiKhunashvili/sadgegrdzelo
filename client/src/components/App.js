import React from 'react';
import { Router, Route } from 'react-router-dom';

import CreateSad from './sadgegrdzelo/CreateSad';
import SadList from './sadgegrdzelo/SadList';
import EditSad from './sadgegrdzelo/EditSad';
import DeleteSad from './sadgegrdzelo/DeleteSad';

import Login from './auth/Login';

import Header from './Header';
import history from '../history'

class App extends React.Component {

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={SadList} />
                        <Route path="/sad/create" exact component={CreateSad} />
                        <Route path="/sad/edit" exact component={EditSad} />
                        <Route path="/sad/delete" exact component={DeleteSad} />
                        <Route path="/login" exact component={Login} />
                    </div>
                </Router>

            </div>
        )
    }
}

export default App;