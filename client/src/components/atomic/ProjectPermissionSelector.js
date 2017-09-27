import React from 'react';
import axios from 'axios';
import ReactAutocomplete from 'react-autocomplete';


export default class ProjectPermissionSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            possibleUsernames: []
        };

        this.onUsernameChanged = this.onUsernameChanged.bind(this);
    }

    componentDidMount() {
        axios.get('/users').then((response) => {
            this.setState({possibleUsernames: response.data});
        });
    }

    onUsernameChanged(e) {
        this.setState({selectedUsername: e.target.value});
    }

    render() {
        return (
            <div className="flexbox flex-left-to-right">
                <div>
                    <ReactAutocomplete items={this.state.possibleUsernames}
                                       value={this.state.selectedUsername}
                                       shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                       onChange={this.onUsernameChanged}
                                       onSelect={(val) => {this.setState({ selectedUsername: val })}}
                                       renderItem={
                                           (item, isHighlighted) =>
                                               <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                   {item}
                                               </div>
                                       }
                                       getItemValue={(item) => item} />
                </div>

                <div>
                    Permissions
                </div>
            </div>
        );
    }
}
