import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './View.css';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ''
        };
    }

    componentWillMount() {
        let _this = this;
        if (this.props.data.images !== undefined) {
            _this.setState({
                images: _this.props.data.images[0].link
            });
        } else {
            _this.setState({
                images: _this.props.data.link
            });
        }
    }

    componentWillReceiveProps(nextProps){
        let _this = this;
        if (nextProps.data.images !== undefined) {
            _this.setState({
                images: nextProps.data.images[0].link
            });
        } else {
            _this.setState({
                images: nextProps.data.link
            });
        }
    }

    render() {
        return (
            <div className="border">
                <div className="wrap">
                    <div className="view-wrap">
                        <a href="">
                            {
                                this.state.images.substr(-3) === 'mp4' 
                                ? <video preload="auto" loop="loop">
                                    <source src={this.state.images} type="video/mp4" />
                                </video>
                                : <img src={this.state.images} alt="img" />
                            }
                        </a>
                    </div>
                    <div className="loop-action">
                        <Link to={`images` in this.props.data ? `/album/${this.props.data.id}` : `/image/${this.props.data.id}`}>View</Link>
                        <div className="smile">
                            <i className="fas fa-smile"></i> {this.props.data.points}
                        </div>
                        <div className="eye">
                            <i className="fas fa-eye"></i> {this.props.data.views}
                        </div>
                    </div>
                </div>
                <div className="view-info">
                    <h3 className="view-title">{this.props.data.title}</h3>
                </div>
            </div>
        );
    }
}

export default View;