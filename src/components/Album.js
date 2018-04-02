import React, { Component } from 'react';

class Album extends Component {
    render() {
        let image = [];
        
        if (this.props.data !== undefined) {
            this.props.data.map(function(item) {
                if (item.link.substr(-3) === 'mp4') {
                    image.push(<video preload="auto" autoplay="autoplay" loop="loop">
                        <source src={item.link} type="video/mp4" />
                    </video>);
                } else {
                    image.push(<img key={item.id} src={item.link} alt="img" />);
                }
            })
        }

        return (
            <div>
                {
                    image.map(function(item){
                        return item;
                    })
                }
            </div>
        );
    }
}

export default Album;