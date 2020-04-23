import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../../actions';


class Login extends React.Component {


    renderInput = ({ input, label, type, holder }) => {
        return(
        <div className="field">
            <label>{ label }</label>
            <input {...input} type={ type } placeholder={ holder } />
        </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.login(formValues);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <Field
                        name="email"
                        component={this.renderInput}
                        label="Email"
                        type="email"
                        holder="Enter Email"
                    />
                    <Field
                        name="password"
                        component={this.renderInput}
                        label="Password"
                        type="password"
                        holder="Enter Password"
                    />
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    console.log(formValues)
    const errors = {};
    if(!formValues.email){
        errors.email = "Please enter Email";
    }
    if(!formValues.password){
        errors.password = "Please enter Password";
    }

    return errors
}

const formWrapper = reduxForm({
    form: "LoginForm",
    validate,
})(Login);

export default connect(null, { login })(formWrapper);