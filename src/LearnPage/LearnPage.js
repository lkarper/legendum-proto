import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LearnHints from '../LearnHints/LearnHints';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import './LearnPage.css';

const LearnPage = (props) => {
    const { 
        pages, 
        page, 
        setPage, 
        chapt, 
    } = props;

    const [showHintsBoolean, setShowHintsBoolean] = useState(false);
    
    if (pages.length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try</p>
        )
    } else {
        const pageToDisplay = pages[page - 1];

        const image = pageToDisplay.image_url
            ?
                <BackgroundImage
                    classPrefix='LearnPage'
                    imgUrl={pageToDisplay.background_image_url}
                    imageAltText={pageToDisplay.background_image_alt_text}
                >
                    <img 
                        className='LearnPage__image'
                        src={pageToDisplay.image_url} 
                        alt={pageToDisplay.image_alt_text} 
                    />
                </BackgroundImage>
            :
                <BackgroundImage 
                    classPrefix='LearnPage'
                    imgUrl={pageToDisplay.background_image_url}
                    imageAltText={pageToDisplay.background_image_alt_text}
                />;
        
        return (
            <div className='LearnPage__container'>
                <h2 className='LearnPage__h2'>{pageToDisplay.exercise_title}{' '}{pageToDisplay.exercise_translation}</h2> 
                {image}
                <div className='LearnPage__text-container'>
                    <div className='LearnPage__text-hints-container'>
                        <p className='LearnPage__text'>{pageToDisplay.text}</p>
                        {pageToDisplay.hints.length !== 0 && 
                            <LearnHints 
                                page={pageToDisplay} 
                                showHintsBoolean={showHintsBoolean} 
                                setShowHintsBoolean={setShowHintsBoolean} 
                            />
                        }
                        {page === pages.length &&
                            <Link
                                className='LearnPage__do-link button' 
                                to={`/game/exercises/${chapt}/do`}
                            >
                                Practice What You've Learned
                            </Link>
                        }
                    </div>
                    <div className='LearnPage__button-container'>
                        <button
                            className='LearnPage__nav-button button'
                            disabled={page === 1} 
                            onClick={() => {
                                setShowHintsBoolean(false);
                                setPage(page - 1);
                            }}
                        >
                            &#60;
                        </button>
                        <button
                            className='LearnPage__nav-button button'
                            disabled={page === pages.length} 
                            onClick={() => {
                                setShowHintsBoolean(false);
                                setPage(page + 1);
                            }}
                        >
                            &#62;
                        </button>    
                    </div>
                </div>
            </div>
        );
    }
};

LearnPage.defaultProps = { 
    pages: [], 
    page: 1, 
    setPage: () => {}, 
    chapt: '', 
};

LearnPage.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    setPage: PropTypes.func,
    chapt: PropTypes.string,
};

export default LearnPage;
