import React from 'react';


class SadList extends React.Component {
    render() {
        return (
            <div className="ui large feed">
                <div className="event">
                    <div className="label">
                    <img src="/images/avatar/small/helen.jpg" alt="avatar" />
                    </div>
                    <div className="content">
                    <div className="date">
                        4 days ago
                    </div>
                    <div className="summary">
                        <a>Helen Troy</a> added <a>2 new illustrations</a>
                    </div>
                    <div className="extra images">
                        <a><img src="/images/wireframe/image.png" /></a>
                        <a><img src="/images/wireframe/image.png" /></a>
                    </div>
                    <div className="meta">
                        <a className="like">
                        <i className="like icon"></i> 1 Like
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SadList;