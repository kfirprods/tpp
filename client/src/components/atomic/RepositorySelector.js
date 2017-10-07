import React from 'react';
import axios from 'axios';
import AsyncTextField from './AsyncTextField';


export default class RepositorySelector extends React.Component {
    constructor() {
        super();

        this.handleTextChanged = this.handleTextChanged.bind(this);
    }

    static validateRepositoryExists(repositoryUrl) {
        return axios.get("/utility/repository-exists", {
            params: {repositoryUrl}
        }).then((response) => {
            return {
                isValid: response.data.success
            };
        });
    }

    handleTextChanged(repositoryUrl) {
        if (this.props.onChange) {
            this.props.onChange({
                address: repositoryUrl,
                username: '',
                password: '',
                sourceBranch: 'default',
                targetBranch: 'default'
            });
        }
    }

    render() {
        return (
            <AsyncTextField {...this.props}
                            placeholder="Repository URL, e.g: https://github.com/kfirprods/tpp"
                            className="repository-selector ReactTextField--input"
                            onChange={this.handleTextChanged}
                            validate={RepositorySelector.validateRepositoryExists} />
        )
    }
}
