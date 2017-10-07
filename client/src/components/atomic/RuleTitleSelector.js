import React from 'react';
import axios from 'axios';
import { ReactTextField } from 'react-textfield';

import { ruleNameValidators } from '../../validators/rule';
import AsyncTextField from './AsyncTextField';


export default class RuleTitleSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isValid: false
        };

        this.validateTitleAvailability = this.validateTitleAvailability.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    validateTitleAvailability(value) {
        if (!this.state.isValid) {
            return Promise.resolve({
                isValid: false,
                errorMessage: ''
            });
        }

        return axios.get(`/rules?q=${value}`).then((response) => {
            return {
                isValid: response.data === null,
                errorMessage: 'This title is already in use'
            };
        });
    }

    renderField(props, onChange) {
        return (
            <ReactTextField {...props}
                            onChange={onChange}
                            type="text"
                            className="form-control ReactTextField--input"
                            placeholder="Rule Name"
                            validators={ruleNameValidators}
                            afterValidate={(isValid) => {this.setState({isValid})}} />
        );
    }

    render() {
        return (
            <AsyncTextField {...this.props}
                            validate={this.validateTitleAvailability}
                            renderField={this.renderField} />
        );
    }
}
