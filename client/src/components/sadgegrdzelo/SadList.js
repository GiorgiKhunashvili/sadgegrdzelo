import React from 'react';
import { connect } from 'react-redux';

import { getSadgegrdzeloData } from '../../actions';
import '../../style/mainPage.css';

class SadList extends React.Component {

    componentDidMount() {
        this.props.getSadgegrdzeloData();
    }
    renderSadList(){
        return this.props.sad.map((sad, index) => {
            return (
                <div className="event" key={index}>
                    <div className="label">
                    <img  src={ sad.profile_image_url } />
                    </div>
                    <div className="content">
                    <div className="summary">
                        <a>{ sad.user_name }</a> added new sadgegrdzelo
                        <div className="date">
                        4 days ago
                        </div>
                    </div>
                    <div className="extra images">
                        <audio src={ sad.audio_url } controls="controls" />
                    </div>
                    <div className="meta">
                        <a className="like">
                        <i className="like icon"></i> 1 Like
                        </a>
                    </div>
                    </div>
                </div>

            )
        })

    }
    render() {
        console.log(this.props)
        return (
            <div className="ui large feed">

                {this.renderSadList()}
         </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sad: Object.values(state.sad.allSad) 
    }
}

export default connect(mapStateToProps, { getSadgegrdzeloData })(SadList);