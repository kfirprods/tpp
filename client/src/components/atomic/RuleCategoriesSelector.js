import React from 'react';
import { AsyncCreatable } from 'react-select';


export default class RuleCategoriesSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            options: [],
            value: ''
        };
    }

    getCategories(input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch(`/rule-categories?q=${input}`).then((response) =>
            response.json()).then((response) => {
            let options = response.map((ruleCategory) => {
                return { ruleCategory };
            });

            return { options: options };
        });
    }

    render() {
        return (
            <AsyncCreatable loadOptions={this.getCategories}
                            multi={true}
                            placeholder="example: C#, C++"
                            value={this.props.value}
                            onChange={this.props.onChange}
                            labelKey="ruleCategory" />
        );
    }
}
