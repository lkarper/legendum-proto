import React from 'react';

const ApiError = (props) => {
    return (
        <main>
            <section
                className='ApiError__section'
            >
                <header>
                    <h2>Error</h2>
                </header>
                <p>Looks like something went wrong.  Check your connection and the url and try again.</p>
            </section>
        </main>
    );
}

export default ApiError;
