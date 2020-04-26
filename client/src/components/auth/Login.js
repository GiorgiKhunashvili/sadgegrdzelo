import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../../actions';
import FlashMessage from 'react-flash-message';

class Login extends React.Component {

    renderSignUpMessage = () => {
        if (this.props.auth.successSignUpMessage){
            return (
                <FlashMessage duration={5000} >
                    <div class="ui green message">{ this.props.auth.successSignUpMessage }</div>
                </FlashMessage>
            )
        }
    }
    renderError({error, touched}) {
        if(error && touched){
            return (
                <div className="ui error message">
                    <div className="header">
                        { error }
                    </div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, type, holder, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        return(
            <div className={className}>
                <label>{ label }</label>
                <input {...input} type={ type } placeholder={ holder } />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.login(formValues);
    }

    render() {
        return (
            <div>
                {this.renderSignUpMessage()}
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { login })(formWrapper);