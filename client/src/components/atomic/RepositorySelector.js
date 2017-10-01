import React from 'react';
import axios from 'axios';
import { Debounce } from 'react-throttle';


const REPOSITORY_VALIDATION_STATUSES = {
    EMPTY: "empty",
    LOADING: "loading",
    VALID: "valid",
    INVALID: "invalid"
};


export default class RepositorySelector extends React.Component {
    constructor() {
        super();

        this.state = {
            repositoryStatus: REPOSITORY_VALIDATION_STATUSES.EMPTY,
        };

        this.validateRepositoryExistence = this.validateRepositoryExistence.bind(this);
    }

    validateRepositoryExistence(e) {
        if (!e.target.value) return;

        this.setState({repositoryStatus: REPOSITORY_VALIDATION_STATUSES.LOADING});

        axios.get("/utility/repository-exists", {
            params: {repositoryUrl: e.target.value}
        }).then((response) => {
            if (response.data.success) {
                this.setState({repositoryStatus: REPOSITORY_VALIDATION_STATUSES.VALID});
            }
            else {
                this.setState({repositoryStatus: REPOSITORY_VALIDATION_STATUSES.INVALID});
            }
        });
    }

    render() {
        let image = "";
        if (this.state.repositoryStatus == REPOSITORY_VALIDATION_STATUSES.LOADING) {
            image = '/img/Gear.svg';
        }
        else if (this.state.repositoryStatus == REPOSITORY_VALIDATION_STATUSES.VALID) {
            image = '/img/tick.svg';
        }
        else if (this.state.repositoryStatus == REPOSITORY_VALIDATION_STATUSES.INVALID) {
            image = '/img/x.svg';
        }
        const statusAnimation = <img src={image} style={{height: '2.5em'}} />;

        return (
            <div className="flexbox flex-left-to-right">
                <Debounce handler="onChange" time="600">
                    <input type="text"
                           placeholder="Repository URL, e.g: https://github.com/kfirprods/tpp"
                           className="repository-selector ReactTextField--input flex-9"
                           onChange={this.validateRepositoryExistence} />
                </Debounce>

                <div className="flex-1 centered">
                    {statusAnimation}
                </div>
            </div>
        )
    }
}
