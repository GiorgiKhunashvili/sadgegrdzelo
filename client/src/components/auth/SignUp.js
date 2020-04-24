import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signup } from '../../actions/index';

class Signup extends React.Component {

    renderError({ error, touched }) {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }

    }

    renderInput = ({ input, label, type, holder, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return (
            <div className={className}>
                <label>{ label }</label>
                <input {...input} type={ type } placeholder={ holder } />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.signup(formValues);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field 
                        name="email"
                        component={this.renderInput}
                        type="email"
                        label="Email"
                        holder="Enter Email"
                    />
                    <Field 
                        name="username"
                        component={this.renderInput}
                        type="text"
                        label="Username"
                        holder="Enter Username"
                    />
                    <Field
                        name="password"
                        component={this.renderInput}
                        label="Password"
                        type="password"
                        holder="Enter Password"
                    />
                    <Field
                        name="confirmPassword"
                        component={this.renderInput}
                        label="Confirm Password"
                        type="password"
                        holder="Confirm Password"
                    />
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.email) {
        errors.email = "Please enter email";
    }
    if(!formValues.username) {
        errors.username = "Please enter username";
    }
    if(!formValues.password) {
        errors.password = "Please enter password";
    }
    if(!formValues.confirmPassword) {
        errors.confirmPassword = "Please enter confirm password";
    }
    if(typeof(formValues.password) === "undefined") {
    } else if( formValues.password.length < 7) {
        errors.password = "Password length must be more then 7 char or equal to 8";
    }
    if(formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = "password does not match";
    }
    return errors;
}

const formWrapper = reduxForm({
    form: "SignupForm",
    validate
})(Signup);

export default connect(null, { signup })(formWrapper);