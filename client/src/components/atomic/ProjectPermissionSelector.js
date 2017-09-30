import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class ProjectPermissionSelector extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedUserNames: []
        };

        this.onSelectedUserNamesChanged = this.onSelectedUserNamesChanged.bind(this);
    }

    getUsers(input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch(`/users?q=${input}`).then((response) => response.json()).then((response) => {
            let options = response.map((username) => {
                return { username: username };
            });

            return { options: options };
        });
    }

    onSelectedUserNamesChanged(value) {
        this.setState({selectedUserNames: value});

        if (this.props.onSelectedUserNamesChanged)
            this.props.onSelectedUserNamesChanged(value);
    }

    render() {
        return (
            <div>
                <Select.Async multi={true}
                              loadOptions={this.getUsers}
                              backspaceRemoves={true}
                              value={this.state.selectedUserNames}
                              onChange={this.onSelectedUserNamesChanged}
                              labelKey="username"
                              valueKey="username" />
            </div>
        );
    }
}
