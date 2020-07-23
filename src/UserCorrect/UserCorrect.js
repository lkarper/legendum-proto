import React from 'react';
import './UserCorrect.css';

const UserCorrect = (props) => {
    const { page } = props;
    return (
        <>
            <p className='UserCorrect__message'>{page.correct_response ? 'Correct! ' : 'Thanks for the input; be sure to remember what you wrote! '}Keep up the good work!</p>
        </>
    );
}

export default UserCorrect;