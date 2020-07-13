import React from 'react';

const UserIncorrect = (props) => {
    const { page, userResponse } = props;

    let feedback;
    if (userResponse === page.incorrect_response_option_1) {
        feedback = page.response_if_incorrect_1;
    }
    if (userResponse === page.incorrect_response_option_2) {
        feedback = page.response_if_incorrect_2;
    }
    if (userResponse === page.incorrect_response_option_3) {
        feedback = page.response_if_incorrect_3;
    }

    return (
        <div
            role="alert"
        >
            <p>{feedback}</p>
            <p>Try again</p>
        </div>
    )
}

export default UserIncorrect;