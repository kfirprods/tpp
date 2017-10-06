export const ruleNameValidators = [
    {
        message: 'Rule name must be at least 3 characters long',
        validator: value => value.length >= 3 || value.length === 0
    },
    {
        message: 'Rule name must be 32 characters long at most',
        validator: value => value.length <= 32
    },
    {
        message: 'Rule name must only only consist of letters, digits, spaces and common special characters',
        validator: value => value.match(/^[\w\d#\-][\w\d#\-\s]+$/) || value.length === 0
    }
];
