import React from 'react';
import debounce from 'javascript-debounce';

import SelectableList from './SelectableList';


export default class FilterableSelectableList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: ""
        };

        this.filterTextChanged = this.filterTextChanged.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateFilter = debounce(this.updateFilter, 250);
    }

    filterTextChanged(e) {
        this.updateFilter(e.target.value);
    }

    updateFilter(value) {
        this.setState({filterText: value});
    }

    render() {
        // Filter items based on the filter text and the filterField prop
        let items = this.props.items.filter((item) =>
            item[this.props.filterField].toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
        );

        return (
            <div>
                <input className="react-list-select-filter-box ReactTextField--input"
                       type='text'
                       placeholder={this.props.placeholder}
                       onChange={this.filterTextChanged} />

                <SelectableList {...this.props}
                                items={items} />
            </div>
        );
    }
}
