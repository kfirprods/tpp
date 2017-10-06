import React from 'react';

import InteractiveList from "react-interactive-list";
// IMPORTANT: This style is responsible for the basic formation
import "react-interactive-list/lib/styles/react-interactive-list.css";
// Some extra styling for the input and the delete button
import "react-interactive-list/lib/styles/react-input-list.css";

import '../../styles/input-list.css';


export default class InputList extends React.Component {
    constructor() {
        super();

        this.renderInput = this.renderInput.bind(this);
    }

    renderInput(props, removable, uniqueId, index, onChangeCallback) {
        let inputClasses = "interactive-list-input";
        if (removable) {
            inputClasses += " interactive-list-input--removable";
        }

        return (
            <input
                type="text"
                className={inputClasses}
                onChange={e => onChangeCallback(e.target.value)}
                placeholder={props.placeholder}
            />
        );
    }

    render() {
        return (
            <InteractiveList {...this.props}
                             renderItem={this.renderInput} />
        );
    }
}
