import React from 'react';
import { Debounce } from 'react-throttle';

import SelectableList from './SelectableList';


export default class FilterableSelectableList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: ""
        };

        this.filterTextChanged = this.filterTextChanged.bind(this);
    }

    filterTextChanged(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    render() {
        // Filter items based on the filter text and the filterField prop
        let items = this.props.items.filter((item) =>
            item[this.props.filterField].toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
        );

        return (
            <div>
                <Debounce time="350" handler="onChange">
                    <input className="react-list-select-filter-box ReactTextField--input"
                           type='text'
                           placeholder={this.props.placeholder}
                           onChange={this.filterTextChanged} />
                </Debounce>

                <SelectableList {...this.props}
                                items={items} />
            </div>
        );
    }
}
