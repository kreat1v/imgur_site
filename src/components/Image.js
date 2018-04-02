import React, { Component } from 'react';

class Image extends Component {
    render() {
        let image = null;

        if (this.props.link !== undefined) {
            if (this.props.link.substr(-3) === 'mp4') {
                image = <video preload="auto" autoplay="autoplay" loop="loop">
                    <source src={this.props.link} type="video/mp4" />
                </video>
            } else {
                image = <img src={this.props.link} alt="img" />
            }
        }

        return (
            <div>
                {image}
            </div>
        );
    }
}

export default Image;