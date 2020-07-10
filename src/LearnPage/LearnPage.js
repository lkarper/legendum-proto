import React, { useState } from 'react';
import LearnHints from '../LearnHints/LearnHints';

const LearnPage = (props) => {
    const [showHintsBoolean, setShowHintsBoolean] = useState(false);

    const { pages, page, setPage } = props.data;
    const pageToDisplay = pages[page - 1];

    return (
        <div>
            <div>
                {pageToDisplay.image_url 
                    ? <img src={pageToDisplay.image_url} alt={pageToDisplay.image_alt_text} />
                    : ''
                }
            </div>
            <p>{pageToDisplay.text}</p>
            {page !== 1 ? 
                <button 
                    onClick={() => {
                        setShowHintsBoolean(false);
                        setPage(page - 1);
                    }}
                >
                    &#60;
                </button> 
                : ''
            }
            {page !== pages.length ? 
                <button 
                    onClick={() => {
                        setShowHintsBoolean(false);
                        setPage(page + 1);
                    }}
                >
                    &#62;
                </button> 
                : ''
            }
            {pageToDisplay.hints 
                ? <LearnHints page={pageToDisplay} showHintsBoolean={showHintsBoolean} setShowHintsBoolean={setShowHintsBoolean} />
                : ''
            }
        </div>
    );
};

export default LearnPage;