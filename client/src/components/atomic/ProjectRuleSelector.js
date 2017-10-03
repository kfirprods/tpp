import React from 'react';
import axios from 'axios';

import FilterableSelectableList from './FilterableSelectableList';


export default class ProjectRuleSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            rules: []
        }
    }

    componentDidMount() {
        axios.get('/rules').then((response) => {
            this.setState({
                rules: response.data
            });
        });
    }

    renderRule(rule) {
        // TODO: Image, title, created by, description
        return <span>{rule.title}</span>;
    }

    render() {
        return (
            <FilterableSelectableList onChange={this.props.onChange}
                                      items={this.state.rules}
                                      renderItem={this.renderRule}
                                      style={{height: '8em'}}
                                      placeholder="Filter Rules"
                                      filterField="title" />
        );
    }
}
