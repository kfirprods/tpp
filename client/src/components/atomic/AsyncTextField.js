import React from 'react';
import debounce from 'javascript-debounce';


const VALIDATION_STATUSES = {
    EMPTY: "empty",
    LOADING: "loading",
    VALID: "valid",
    INVALID: "invalid"
};


export default class AsyncTextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repositoryStatus: VALIDATION_STATUSES.EMPTY,
            errorMessage: ''
        };

        this.renderField = this.renderField.bind(this);
        this.handleTextChanged = this.handleTextChanged.bind(this);
        this.validator = this.validator.bind(this);
        this.validator = debounce(this.validator, this.delay);
    }

    get delay() {
        return this.props.delay || 600;
    }

    handleTextChanged(e) {
        if (!e.target.value) return;

        // Call the debounced function that would then invoke the .validate property
        this.validator(e.target.value);
    }

    validator(value) {
        if (this.props.validate) {
            this.setState({repositoryStatus: VALIDATION_STATUSES.LOADING});
            this.props.validate(value).then((validationResult) => {
                if (validationResult.isValid) {
                    this.setState({
                        repositoryStatus: VALIDATION_STATUSES.VALID,
                        errorMessage: ''
                    });
                }
                else {
                    this.setState({
                        repositoryStatus: VALIDATION_STATUSES.INVALID,
                        errorMessage: validationResult.errorMessage
                    });
                }
            });
        }
    }

    renderField() {
        if (this.props.renderField) {
            return this.props.renderField(this.props, this.handleTextChanged);
        }

        return (
            <input {...this.props}
                   type="text"
                   onChange={this.handleTextChanged} />
        );
    }

    render() {
        let image = "";
        if (this.state.repositoryStatus === VALIDATION_STATUSES.LOADING) {
            image = '/img/Gear.svg';
        }
        else if (this.state.repositoryStatus === VALIDATION_STATUSES.VALID) {
            image = '/img/tick.svg';
        }
        else if (this.state.repositoryStatus === VALIDATION_STATUSES.INVALID) {
            image = '/img/x.svg';
        }
        const statusAnimation = <img alt="" src={image} style={{height: '2.5em'}} />;

        return (
            <div>
                <div className="flexbox flex-left-to-right">
                    <div className="flex-9">
                        {this.renderField()}
                    </div>

                    <div className="flex-1 centered">
                        {statusAnimation}
                    </div>
                </div>
                <div className="error">
                    {this.state.errorMessage}
                </div>
            </div>
        )
    }
}
