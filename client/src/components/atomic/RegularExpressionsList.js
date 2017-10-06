import React from 'react';

import InputList from './InputList';


export default class RegularExpressionsList extends React.Component {
    render() {
        return (
            <InputList maxItems={10}
                       placeholder="Regular Expression"
                       addButtonText="Add More" />
        );
    }
}
