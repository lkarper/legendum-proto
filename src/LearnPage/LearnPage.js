import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LearnHints from '../LearnHints/LearnHints';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import './LearnPage.css';

const LearnPage = (props) => {
    const [showHintsBoolean, setShowHintsBoolean] = useState(false);

    const { pages, page, setPage, chapt } = props.data;
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
            {image}
            <div className='LearnPage__text-container'>
                <div className='LearnPage__text-hints-container'>
                    <p className='LearnPage__text'>{pageToDisplay.text}</p>
                    {pageToDisplay.hints 
                        ? 
                            <LearnHints 
                                page={pageToDisplay} 
                                showHintsBoolean={showHintsBoolean} 
                                setShowHintsBoolean={setShowHintsBoolean} 
                            />
                        : ''
                    }
                    {page === pages.length 
                        ?
                            <Link
                                className='LearnPage__do-link' 
                                to={`/game/exercises/${chapt}/do`}
                            >
                                Practice What You've Learned
                            </Link>
                        : 
                            ''
                        }
                </div>
                <div className='LearnPage__button-container'>
                    <button
                        className='LearnPage__nav-button'
                        disabled={page === 1} 
                        onClick={() => {
                            setShowHintsBoolean(false);
                            setPage(page - 1);
                        }}
                    >
                        &#60;
                    </button>
                    <button
                        className='LearnPage__nav-button'
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
};

export default LearnPage;