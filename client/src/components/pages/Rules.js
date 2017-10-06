import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Subheader from 'material-ui/Subheader';
import axios from 'axios';


export default class Rules extends React.Component {
    constructor() {
        super();

        this.state = {
            rules: [],
            selected: []
        }
    }

    componentDidMount() {
        axios.get("/rules").then((response) => {
            this.setState({rules: response.data});
        }).catch((error) => {

        });
    }

    renderRule(rule) {
        let selected = this.state.selected.indexOf(rule) !== -1;

        let classes = "tile";
        if (selected)
            classes += " tile--selected";

        return (
            <div className={classes} onClick={() => {
                if (!selected)
                    this.setState({ selected: this.state.selected.concat([rule]) });
                else
                    this.setState({selected: this.state.selected.filter((r) => r._id !== rule._id)});
            }}>
                <span className="tile-title">
                    <span className="rule-title">{rule.title}</span>
                    <span className="rule-author">by {rule.creatorUsername}</span>
                </span>
                <div>
                    Rule description
                </div>
            </div>
        );
    }

    render() {
        let gridItems = this.state.rules.map((rule) =>
            <GridTile key={rule._id}>{this.renderRule(rule)}</GridTile>);

        return (
            <MuiThemeProvider>
                <div style={{flexWrap: 'wrap', display: 'flex', justifyContent: 'space-around'}}>
                    <GridList cellHeight={140}
                              style={{overflowY: 'auto'}}>
                        <Subheader>Category Name</Subheader>
                        {gridItems}

                        <Subheader>Another Category</Subheader>
                        {gridItems}
                    </GridList>
                </div>
            </MuiThemeProvider>
        );
    }
}
