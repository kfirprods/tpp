import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


export default class ProjectPermissionSelector extends React.Component {
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

    render() {
        return (
            <div>
                <Select.Async multi={true}
                              loadOptions={this.getUsers}
                              backspaceRemoves={true}
                              value={this.props.value}
                              onChange={this.props.onChange}
                              labelKey="username"
                              valueKey="username" />
            </div>
        );
    }
}
