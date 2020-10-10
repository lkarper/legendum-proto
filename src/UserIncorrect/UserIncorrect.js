import React from 'react';
import PropTypes from 'prop-types';
import './UserIncorrect.css';

const UserIncorrect = (props) => {
    const { 
        page, 
        userResponse, 
    } = props;

    let feedback;
    if (userResponse === page.incorrect_response_option_1) {
        feedback = page.response_if_incorrect_1;
    } else if (userResponse === page.incorrect_response_option_2) {
        feedback = page.response_if_incorrect_2;
    } else if (userResponse === page.incorrect_response_option_3) {
        feedback = page.response_if_incorrect_3;
    } else if (page.response_if_incorrect_1) {
        feedback = page.response_if_incorrect_1;
    }

    if (Object.keys(page).length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try again.</p>
        );
    }

    return (
        <>
            <p className='UserIncorrect__message'>{feedback}</p>
            <p className='UserIncorrect__message'>Try again</p>
        </>
    );
}

UserIncorrect.defaultProps = { 
    page: {}, 
    userResponse: '', 
};

UserIncorrect.propTypes = { 
    page: PropTypes.object, 
    userResponse: PropTypes.string, 
};

export default UserIncorrect;
