import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Post.css';

import Image from './Image';
import Album from './Album';
import Comments from './Comments';

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            section: this.props.match.params.section,
            id: this.props.match.params.id,
            data: []
        }

        this.timeConverter = this.timeConverter.bind(this);  
    }

    componentWillMount() {
        fetch(`https://api.imgur.com/3/gallery/${this.state.section}/${this.state.id}`, {
            method: 'GET',
            headers: {
              "Authorization": "Client-ID 3c7254dc9ab6a60"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                data: json.data
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
        return (
            <div className="post-wrap">
                <Link to='/' className='back'>Back</Link>
                <div className="header-post">
                    <h3>{this.state.data.title}</h3>
                    <span className='date'>{this.timeConverter(this.state.data.datetime)}</span>
                </div>
                {
                    this.state.section === "image"
                    ? <Image link={this.state.data.link} />
                    : <Album data={this.state.data.images} />
                }
                {
                    this.state.data.comment_count > 0
                    ? <Comments section={this.state.section} id={this.state.id} />  
                    : null
                }          
            </div>      
        );
    }
}

export default Post;