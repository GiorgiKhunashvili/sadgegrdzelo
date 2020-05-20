import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import MicRecorder from 'mic-recorder-to-mp3';


import { createSadAction } from '../../actions/index';
import { recordingActon,
        recordedTimeAction,
        isBlockedAction,
        blobURLAction,
        audioFileAction
}
  from '../../actions/recordAudioActions';

const Mp3Recorder = new MicRecorder({ bitRate: 128 })


class CreateSad extends React.Component {

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

    renderInput = ({label, input, type, holder, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`
        let formInput = <input {...input} placeholder={holder} />
        if(type === "textare"){
            formInput = <textarea />
        }
        return (
            <div className={className}>
                <label>{ label }</label>
                {formInput}
                {this.renderError(meta)}
            </div>
        )
    }
    start = () => {
        if (this.props.recordAudio.isBlocked){
            console.log("Permission Denied");
        }else {
            Mp3Recorder.start().then(() => {
                console.log("started recording")
            }).catch((e) => console.error(e))
        }
    }

    stop = () => {
        Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
            const file = new File(buffer, 'me-at-thevoice.mp3', {
                type: blob.type,
                lastModified: Date.now()
              });
            // formData.append("audio", file);
            // formData.append("id", 1);
            // formData.append("title", "aloo");
            // formData.append("description", "aloo123")

            // axios.post('http://localhost:8000/sad/create/', formData, {
            //     headers: {
            //     'Authorization': "JWT " + localStorage.getItem('access_token'),
            //     'Content-Type': 'multipart/form-data'
            //     }
            // }).then().catch((e) => console.log(e.response))
            const blobURL = URL.createObjectURL(blob);
            this.props.recordingActon(false);
            this.props.blobURLAction(blobURL);
            this.props.audioFileAction(file);

        }).catch((e) => console.log(e));
    }
    onAudioButtonClick = (e, recording) => {
        e.preventDefault();
        if (recording){
            this.props.recordingActon(recording=true);
            this.start()
            this.timer = setInterval(() => {
                this.props.recordedTimeAction(this.props.recordAudio.recordedTime + 1);
            }, 1000)
        }else {
            this.props.recordingActon(recording=false);
            clearInterval(this.timer)
            this.stop();
        }
    }
    renderAudioRecorder = ({ label, input, recording, recordedTime, meta }) => {

        if (recording === true){
            return (
                <div>
                      <button onClick={(e) => this.onAudioButtonClick(e, false) } className="ui button red">
                        <i className="pause icon"></i>
                        { recordedTime }
                    </button>
                    {this.renderError(meta)}

                </div>
            )
        }else {
            return (
                <div>
                    <button onClick={(e) => this.onAudioButtonClick(e, true)} className="ui button">
                        <i className="play icon"></i>
                        Start Recording
                    </button>
                    {this.renderError(meta)}
                </div>
    
            )
        }
 
    }

    componentDidMount(){
        navigator.getUserMedia({audio: true},
            () => {
                console.log("Permision Granted");

                this.props.isBlockedAction(false)
            },
            () => {
                console.log("Permision denide")
                this.props.isBlockedAction(true)
            }
            )
    }

    renderRecorededAudio(){
        if (this.props.recordAudio.blobURL) {
            return (
                <div>
                    <audio src={this.props.recordAudio.blobURL} controls="controls" />
                </div>
            )
        }
    }
    onSubmit = (formValues) => {
        this.props.createSadAction(this.props.recordAudio.file, formValues);
        this.props.recordedTimeAction(0);
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
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
                    <Field 
                        name="audioRecorder"
                        component={this.renderAudioRecorder}
                        label="Recorder"
                        holder="Click to start recording"
                        recording={this.props.recordAudio.recording}
                        recordedTime={this.props.recordAudio.recordedTime}

                    />
                    {/* { this.renderAudioRecorder() } */}

                    <div className="ui buttons" style={{ marginTop:"20px" }}>
                        <button className="ui button">Cancel</button>
                        <div className="or"></div>
                        <button type="submit" className="ui positive button">Save</button>
                    </div>
                </form>
                { this.renderRecorededAudio() }
                
            </div>
        )
    }

}

const validate = (formValues, props) => {
    console.log(props)

    const errors = {};
    if( !formValues.title ){
        errors.title = "Please enter title"
    };
    if ( !formValues.description ) {
        errors.description = "Please enter description"
    }

    return errors;
}

const formWrapper = reduxForm({
    form: "CreateSad",
    validate
}
)(CreateSad);

const mapStateToProps = (state) => {
    return {
        sad: state.sad,
        recordAudio: state.recordAudio
    }
}

export default connect(mapStateToProps, {
    createSadAction,
    recordingActon,
    recordedTimeAction,
    isBlockedAction,
    blobURLAction,
    audioFileAction })(formWrapper);