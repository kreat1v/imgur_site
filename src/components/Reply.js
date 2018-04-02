import React, { Component } from 'react';

import './Reply.css';

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: "off",
            st: "+"
        };
        this.press = this.press.bind(this);

        this.timeConverter = this.timeConverter.bind(this);       
    }

    press() {
        let className = (this.state.class === "off") ? "on" : "off";
        let st = (this.state.st === "-") ? "+" : "-";
        
        this.setState({
            class: className,
            st: st
        });
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
                <div className="button">
                    <h6 onClick={this.press}>{this.state.st} {this.props.len} REPLY</h6>
                </div>
                <div className={this.state.class}>
                    {
                        this.props.data.map(function(item) {
                            return <div className="reply">
                                <span>{item.author}</span>
                                {
                                    item.platform !== 'desktop'
                                    ? <span className="platform"> via {item.platform}</span>
                                    : null
                                }
                                <span className='date'>{_this.timeConverter(item.datetime)}</span>
                                <p>{item.comment}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Reply;