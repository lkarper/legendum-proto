import React from 'react';
import PropTypes from 'prop-types';
import './UserCorrect.css';

const UserCorrect = (props) => {
    const { page } = props;
    
    if (Object.keys(page).length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try again.</p>
        );
    }

    return (
        <p 
            className='UserCorrect__message'
        >
            {/* If a question has no 'correct_response' listed, then it merely saves user input */}
            {page.correct_response 
                ? 'Correct! ' 
                : 'Thanks for the input; be sure to remember what you wrote! '
            }
            Keep up the good work!
        </p>
    );
}

UserCorrect.defaultProps = {
    page: {},
};

UserCorrect.propTypes = {
    page: PropTypes.object,
};

export default UserCorrect;
