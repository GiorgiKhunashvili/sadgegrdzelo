import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CreateSad extends React.Component {
    renderInput = ({label, input, type, holder}) => {
        let formInput = <input {...input} placeholder={holder} />
        if(type === "textare"){
            formInput = <textarea />
        }
        return (
            <div className="field">
                <label>{ label }</label>
                {formInput}
            </div>
        )
    }

    renderAudioRecorder = () => {
        return (
            <div>
                
            </div>

        )
    }
    render() {
        return (
            <div>
                <form className="ui form error">
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Tilte"
                        holder="Enter Title"
                        type="text"
                    />
                    <Field
                        name="description"
                        component={this.renderInput}
                        label="Description"
                        holder="Enter Description"
                        type="textarea"
                    />
                </form>
            </div>
        )
    }
}

const formWrapper = reduxForm({
    form: "CreateSad",
}
)(CreateSad);

export default formWrapper;