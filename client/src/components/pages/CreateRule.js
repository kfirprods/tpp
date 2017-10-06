import React from 'react';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { ruleNameValidators } from '../../validators/rule';
import { textFieldStyle } from '../../styles/forms';
import RuleCategoriesSelector from '../atomic/RuleCategoriesSelector';
import RuleTypeSelector from '../atomic/RuleTypeSelector';
import RegularExpressionsList from '../atomic/RegularExpressionsList';


export default class CreateRule extends React.Component {
    constructor() {
        super();
        this.state = {
            ruleId: "",
            ruleName: "",
            description: "",
            ruleCategories: []
        };

        this.handleRuleNameChanged = this.handleRuleNameChanged.bind(this);
        this.handleRuleCategoriesChanged = this.handleRuleCategoriesChanged.bind(this);
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
        this.handleRuleTypeChanged = this.handleRuleTypeChanged.bind(this);
    }

    handleRuleNameChanged(e) {
        this.setState({ruleName: e.target.value});
    }

    handleRuleCategoriesChanged(categories) {
        this.setState({ruleCategories: categories});
    }

    handleDescriptionChanged(e) {
        this.setState({description: e.target.value});
    }

    handleRuleTypeChanged(type) {
        this.setState({ruleType: type});
    }

    createRule(e) {
        e.preventDefault();

    }

    render() {
        if (this.state.ruleId) {
            let ruleUrl = `/rules/${this.state.ruleId}`;
            return (<Redirect to={ruleUrl} />);
        }

        let behaviorSelector = <RegularExpressionsList />;

        return (
            <div className="container">
                <div className="auth-container create-project-container">
                    <h1 className="title text-center">Create Rule</h1>

                    <form>
                        <div className="form-group">
                            <ReactTextField type="text"
                                            style={textFieldStyle}
                                            onChange={this.handleRuleNameChanged}
                                            className="form-control"
                                            placeholder="Rule Name"
                                            validators={ruleNameValidators} />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-paragraph fa" aria-hidden="true" /></span>
                                <div className="icon-label">Description (Up to 160 characters)</div>
                            </div>

                            <textarea type="text"
                                      rows="3"
                                      onChange={this.handleDescriptionChanged}
                                      className="form-control ReactTextField--input"
                                      placeholder="Optional - Describe what your rule does"
                                      maxLength="160" />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true" /></span>
                                <div className="icon-label">Categories</div>
                            </div>

                            <RuleCategoriesSelector value={this.state.ruleCategories}
                                                    onChange={this.handleRuleCategoriesChanged} />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-bullseye fa" aria-hidden="true" /></span>
                                <div className="icon-label">Rule Type</div>
                            </div>

                            <RuleTypeSelector value={this.state.ruleType}
                                              onChange={this.handleRuleTypeChanged} />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-list-ul fa" aria-hidden="true" /></span>
                                <div className="icon-label">Behavior</div>
                            </div>

                            {behaviorSelector}
                        </div>

                        <Button className="btn btn-primary btn-lg btn-block login-button"
                                type="submit"
                                onClick={this.createProject}>Create</Button>
                    </form>
                </div>
            </div>
        )
    }
}
