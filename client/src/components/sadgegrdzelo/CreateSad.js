import React from 'react';


class CreateSad extends React.Component {
    render() {
        return (
            <div>
                <div class="event">
                    <div class="label">
                    <img src="/images/avatar/small/helen.jpg" />
                    </div>
                    <div class="content">
                    <div class="date">
                        4 days ago
                    </div>
                    <div class="summary">
                        <a>Helen Troy</a> added <a>2 new illustrations</a>
                    </div>
                    <div class="extra images">
                        <a><img src="/images/wireframe/image.png" alt="araferi"/></a>
                        <a><img src="/images/wireframe/image.png" alt="araferi"/></a>
                    </div>
                    <div class="meta">
                        <a class="like">
                        <i class="like icon"></i> 1 Like
                        </a>
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}

export default CreateSad;