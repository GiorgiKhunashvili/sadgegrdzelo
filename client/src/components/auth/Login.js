import React from 'react';


class Login extends React.Component {


    render() {
        return (
            <div>
                <form className="ui form">
                    <div className="field">
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" />
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" className="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                    </form>
            </div>
        )
    }
}

export default Login;