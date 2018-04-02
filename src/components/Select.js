import React, { Component } from 'react';

import './Select.css';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.filter[0]};
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let parametr = event.target.value;

        this.setState({value: parametr});
        this.props.data(parametr);
    }

    render() {
        return (
            <div className="select-style"> 
                <select value={this.state.value} onChange={this.handleChange}>
                    {
                        this.props.filter.map(function(item) {
                            return <option value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
        );
      }
}

export default Select;