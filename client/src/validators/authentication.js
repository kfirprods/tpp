import {default as validate} from 'validator';


export const usernameValidators = [
    {
        message: 'Username may only consist of letters and digits',
        validator: value => validate.isAlphanumeric(value) || value.length === 0
    },
    {
        message: 'Username must be at least 3 characters long',
        validator: value => value.length >= 3 || value.length === 0
    },
    {
        message: 'Username must be 32 characters long at most',
        validator: value => value.length <= 32
    }
];


export const passwordValidators = [
    {
        message: "Password must be at least 3 characters long",
        validator: value => value.length >= 3 || value.length === 0
    },
    {
        message: 'Password must be 32 characters long at most',
        validator: value => value.length <= 32
    }
];

export const emailValidators = [
    {
        message: "Invalid email",
        validator: value => validate.isEmail(value) || value.length === 0
    },
];