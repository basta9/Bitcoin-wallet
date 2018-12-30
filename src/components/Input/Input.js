import React, { Component } from 'react';


class Input extends Component {
    render() {
        return (
            <label>
                {this.props.title} <input type={this.props.type}
                    value={this.props.value}
                    name={(this.props.name) ? this.props.name : ''}
                    placeholder={(this.props.placeholder) ? this.props.placeholder : ''}
                    onChange={this.props.onSetInput} />
            </label>
        )
    }
}

export default Input