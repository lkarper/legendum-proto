import React from 'react';

const UserCorrect = (props) => {
    const { page, userResponse } = props;
    return (
        <div 
            role="alert"
        >
            {page.correct_response ? <p>Correct!</p> : <p>Thanks for the input; be sure to remember what you wrote!</p>}
            <p>Keep up the good work!</p>
        </div>
    );
}

export default UserCorrect;