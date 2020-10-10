import React from 'react';
import PropTypes from 'prop-types';
import './PasswordChecklist.css';

const PasswordChecklist = (props) => {
    const { passwordError } = props;
    const { 
        tooShort,
        tooLong,
        endSpaces,
        upperCase,
        lowerCase,
        number,
        specialChar,
    } = passwordError;

    const checkMark = <span className='PasswordChecklist__check'>&#10004;</span>;
    const xMark = <span className='PasswordChecklist__x'>&#10006;</span>;

    return (
        <div
            className='PasswordChecklist__container'
        >
            <p>Password must:</p>
            <ul>
                <li>Be at least 8 characters in length {tooShort ? xMark : checkMark}</li>
                <li>Be no more than 72 characters in length {tooLong ? xMark : checkMark}</li>
                <li>Not begin or end with a space {endSpaces ? xMark : checkMark}</li>
                <li>Contain at least one lowercase letter {lowerCase ? xMark : checkMark}</li>
                <li>Contain at least one uppercase letter {upperCase ? xMark : checkMark}</li>
                <li>Contain at least one number {number ? xMark : checkMark}</li>
                <li>Contain at least one special character (e.g. !, @, #, $, etc.) {specialChar ? xMark : checkMark}</li>
            </ul>
        </div>
    );
}

PasswordChecklist.defaultProps = {
    passwordError: {},
};

PasswordChecklist.propTypes = {
    passwordError: PropTypes.shape({
        tooShort: PropTypes.bool,
        tooLong: PropTypes.bool,
        endSpaces: PropTypes.bool,
        upperCase: PropTypes.bool,
        lowerCase: PropTypes.bool,
        number: PropTypes.bool,
        specialChar: PropTypes.bool,
    }),
};

export default PasswordChecklist;
