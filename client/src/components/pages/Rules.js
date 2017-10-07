import React from 'react';
import axios from 'axios';

const randomColor = require('randomcolor');


export default class Rules extends React.Component {
    constructor() {
        super();

        this.state = {
            rules: [],
            selected: []
        };
        this._colors = [];
    }

    componentDidMount() {
        axios.get("/rules").then((response) => {
            this._colors = randomColor({luminosity: 'dark', count: response.data.length});
            this.setState({rules: response.data});
        }).catch((error) => {

        });
    }

    renderRule(rule, backgroundColor) {
        let selected = this.state.selected.indexOf(rule) !== -1;

        let classes = "tile rule-tile";
        if (selected)
            classes += " tile--selected";

        return (
            <div className={classes}
                 key={rule._id}
                 style={{backgroundColor}}
                 onClick={() => {
                if (!selected)
                    this.setState({ selected: this.state.selected.concat([rule]) });
                else
                    this.setState({selected: this.state.selected.filter((r) => r._id !== rule._id)});
            }}>
                <div className="tile-title">
                    <span className="rule-title">{rule.title}</span>
                    <span className="rule-author">by {rule.creatorUsername}</span>
                </div>
                <div className="rule-description">
                    {rule.description}
                </div>
            </div>
        );
    }

    render() {
        let colorStack = this._colors.slice(0);
        let categorizedRules = {};

        for (let rule of this.state.rules) {
            for (let categoryName of rule.categories) {
                if (!(categoryName in categorizedRules)) {
                    categorizedRules[categoryName] = [];
                }

                categorizedRules[categoryName].push(rule);
            }
        }

        let categorizedItems = Object.keys(categorizedRules).map((categoryName) => {
            let categoryItems = categorizedRules[categoryName].map((rule) =>
                this.renderRule(rule, colorStack.pop()));

            return (
                <div key={categoryName}>
                    <h4>
                        {categoryName}
                    </h4>
                    <div className="grid">
                        {categoryItems}
                    </div>
                </div>
            );
        });

        return (
            <div className="container-fluid">
                {categorizedItems}
            </div>
        );
    }
}
