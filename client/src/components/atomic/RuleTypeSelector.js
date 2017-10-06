import React from 'react';
import Select from 'react-select';
import axios from 'axios';


export default class RuleTypeSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            ruleTypes: []
        };
    }

    componentDidMount() {
        axios.get('/rule-types').then((response) => {
            this.setState({ruleTypes: response.data.map((ruleType) => {
                return { typeName: ruleType }
            })});
        });
    }

    render() {
        return (
            <Select options={this.state.ruleTypes}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    labelKey="typeName"
                    valueKey="typeName" />
        );
    }
}
