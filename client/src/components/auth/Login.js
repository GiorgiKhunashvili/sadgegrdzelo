import React from 'react';
import { Field, reduxForm } from 'redux-form';


class Login extends React.Component {


    renderInput = ({ label, type, holder }) => {
        return(
        <div className="field">
            <label>{ label }</label>
            <input type={ type } placeholder={ holder } />
        </div>
        )
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
    const errors = {};
    if(!formValues.email){
        errors.email = "Please enter Email";
    }
    if(!formValues.password){
        errors.password = "Please enter Password";
    }
    if(!"@" in formValues.email){
        errors.email = "Please enter Email"
    }
}

export default reduxForm({
    form: "LoginForm",
    validate,
})(Login);