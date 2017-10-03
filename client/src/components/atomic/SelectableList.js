import React from 'react';
import List from 'react-list-select';

import '../../styles/react-list-select.css';


export default class SelectableList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };

        this.onChangeWrapper = this.onChangeWrapper.bind(this);
    }

    // Wrap onChange to invoke onChange with item objects instead of indexes
    onChangeWrapper(indexes) {
        this.setState({selected: indexes});

        let selectedItems = indexes.map((index) => this.props.items[index]);

        if (this.props.onChange) {
            this.props.onChange(selectedItems);
        }
    }

    render() {
        // Create components out of data items based on a renderItem prop function
        let ruleComponents = this.props.items.map((item) => this.props.renderItem(item));

        return <List {...this.props}
                     items={ruleComponents}
                     multiple={true}
                     onChange={this.onChangeWrapper}
                     selected={this.state.selected} />;
    }
}
