import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import MicRecorder from 'mic-recorder-to-mp3';


import { createSadAction } from '../../actions/index';

const Mp3Recorder = new MicRecorder({ bitRate: 128 })


class CreateSad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recording: false,
            recordedTime: 0,
            isBlocked: true,
            blobURL: "",
            file: null
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
    start = () => {
        if (this.state.isBlocked){
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
            this.setState({ blobURL, isRecording: false, file })
        }).catch((e) => console.log(e));
    }
    onAudioButtonClick = (e, recording) => {
        e.preventDefault();
        if (recording){
            this.setState({ recording: true })
            this.start()
            this.timer = setInterval(() => {
                this.setState({recordedTime: this.state.recordedTime + 1})
            }, 1000)
        }else {
            this.setState({ recording: false })
            clearInterval(this.timer)
            this.stop();
        }
    }
    renderAudioRecorder = () => {
        console.log(this.state.recording)
        if (this.state.recording === true){
            return (
                <div>
                      <button onClick={(e) => this.onAudioButtonClick(e, false) } className="ui button red">
                        <i className="pause icon"></i>
                        { this.state.recordedTime }
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

    componentDidMount(){
        navigator.getUserMedia({audio: true},
            () => {
                console.log("Permision Granted");
                this.setState({ isBlocked: false })
            },
            () => {
                console.log("Permision denide")
                this.setState({ isBlocked: true })
            }
            )
    }

    renderRecorededAudio(){
        if (this.state.blobURL) {
            return (
                <div>
                    <audio src={this.state.blobURL} controls="controls" />
                </div>
            )
        }
    }
    onSubmit = (formValues) => {
        this.props.createSadAction(this.state.file, formValues);
    }
    render() {
        console.log(this.props)
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
                    { this.renderAudioRecorder() }

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

const validate = (formValues) => {
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
        sad: state.sad
    }
}

export default connect(mapStateToProps, { createSadAction })(formWrapper);