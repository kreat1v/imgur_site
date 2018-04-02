import React, { Component } from 'react';

import './Comments.css';

import Reply from './Reply';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: this.props.section,
            id: this.props.id,
            comments: []
        }

        this.timeConverter = this.timeConverter.bind(this);       
    }
    
    componentWillMount() {
        fetch(`https://api.imgur.com/3/gallery/${this.state.section}/${this.state.id}/comments/top`, {
            method: 'GET',
            headers: {
                "Authorization": "Client-ID 3c7254dc9ab6a60"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                comments: json.data
            }); 
        })
    }

    timeConverter(UNIX_timestamp) {
        let newDate = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = newDate.getFullYear();
        let month = months[newDate.getMonth()];
        let date = newDate.getDate();
        let hour = newDate.getHours();
        let min = newDate.getMinutes();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
    }

    render() {
        let _this = this;

        return (
            <div>
                <div className='title'>
                    <h4>{this.state.comments.length} COMMENTS</h4>
                </div>
                {
                    this.state.comments.map(function(item) {
                        return <div>
                            <div className="comment">
                                <span>{item.author}</span>
                                {
                                    item.platform !== 'desktop'
                                    ? <span className="platform"> via {item.platform}</span>
                                    : null
                                }
                                <span className='date'>{_this.timeConverter(item.datetime)}</span>
                                <p>{item.comment}</p>
                            </div>
                            {
                                item.children.length > 0
                                ? <Reply len={item.children.length} data={item.children} />
                                : null
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Comments;