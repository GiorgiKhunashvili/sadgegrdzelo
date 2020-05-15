import React from 'react';
import { connect } from 'react-redux';

import { getSadgegrdzeloData } from '../../actions';

class SadList extends React.Component {

    componentDidMount() {
        this.props.getSadgegrdzeloData();
    }
    renderSadList(){
        return this.props.sad.map((sad, index) => {
            return (
                <div className="sad" key={index}>
                    <div className="event">
                    <div className="label">
                    <img src="/images/avatar/small/helen.jpg" alt="avatar" />
                    </div>
                    <div className="content">
                    <div className="date">
                        4 days ago
                    </div>
                    <div className="summary">
                        <a href="/#">{sad.user_name}</a> added <a href="/#">2 new illustrations</a>
                    </div>
                    <div className="extra images">
                        {/* <a href="/#"><img src="/images/wireframe/image.png" alt="uncu duncu" /></a>
                        <a href="/#"><img src="/images/wireframe/image.png" alt="uncu duncu" /></a> */}
                        <audio src={sad.audio_url} controls="controls" />
                    </div>
                    <div className="meta">
                        <a href="/#" className="like">
                        <i className="like icon"></i> 1 Like
                        </a>
                    </div>
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