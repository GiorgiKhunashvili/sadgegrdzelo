import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { changeRecordButton, CountRecordingTime } from '../../actions/index';

class CreateSad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sad: props.sad
        }
    }
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
    onAudioButtonClick = (e, recording) => {
        e.preventDefault();
        this.props.changeRecordButton(recording);
    }
    renderAudioRecorder = () => {
        console.log(this.props.sad.recording)
        if (this.props.sad.recording === true){
            return (
                <div>
                      <button onClick={(e) => this.onAudioButtonClick(e, false) } className="ui button">
                        <i className="pause icon"></i>
                        Pause 
                    </button>

                </div>
            )
        }else {
            return (
                <div>
                    <button onClick={(e) => this.onAudioButtonClick(e, true)} className="ui button">
                        <i className="play icon"></i>
                        Start Recording
                    </button>
                </div>
    
            )
        }
 
    }
    
    componentWillReceiveProps({ sad }) {
        this.setState({ sad })
    }

    componentDidMount() {
        console.log('Aloo')
        if(this.props.recording){
            this.RecordTimer = setInterval(() => {
                let time = this.state.recordedTime + 1
                this.CountRecordingTime(time);
            }, 1000)
        }

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
                    { this.renderAudioRecorder() }
                    { this.props.sad.recordedTime}
                </form>
                
            </div>
        )
    }
}

const formWrapper = reduxForm({
    form: "CreateSad",
}
)(CreateSad);

const mapStateToProps = (state) => {
    return {
        sad: state.sad
    }
}

export default connect(mapStateToProps, { changeRecordButton, CountRecordingTime })(formWrapper);