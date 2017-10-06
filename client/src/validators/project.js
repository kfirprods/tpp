export const projectNameValidators = [
    {
        message: 'Project name must be at least 3 characters long',
        validator: value => value.length >= 3 || value.length === 0
    },
    {
        message: 'Project name must be 32 characters long at most',
        validator: value => value.length <= 32
    },
    {
        message: 'Project name must only consist of letters, digits and spaces',
        validator: value => value.match(/^[\w\d][\w\d\s]+$/) || value.length === 0
    }
];
