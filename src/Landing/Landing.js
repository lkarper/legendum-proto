import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import NotesService from '../services/notes-service';
import ProgressService from '../services/progress-service';
import AuthApiService from '../services/auth-api-service';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Landing.css';

const Landing = (props) => {
    const { 
        forceUpdate,
        history,
    } = props;

    const context = useContext(UserContext);

    const [loginError, setLoginError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const onLoginSuccess = () => {
        const destination = '/dashboard';
        Promise.all([
            NotesService.getFetchNotesCallByUser(), 
            ProgressService.getFetchProgressCallForUser()
        ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                context.setError(false);
                const notes = values[0];
                const progress = values[1];
                context.setNotes(notes);
                context.setProgress(progress);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                setShowLoading(false);
                console.log('error', error);
                context.setError(true);
            });
    }

    const demoLogin = () => {
        setLoginError(false);
        setShowLoading(true);
        AuthApiService.postLogin({
            user_name: 'demoUser',
            password: 'DemoPassword123!',
        })
            .then(res => {
                onLoginSuccess();
            })
            .catch(res => {
                setLoginError(true);
                setShowLoading(false);
            });
    }

    return (
        <>
            <div className='Landing__image-container'>
                <div className='Landing__speech-bubble-container'>
                    <div className='Landing__speech-bubble'>
                        <p className='Landing__speech-text'>Welcome!</p>
                    </div>
                    <div aria-hidden='true' className='Landing__arrow-container'>
                        <div className='Landing__arrow left'></div>
                        <div className='Landing__arrow center'></div>
                        <div className='Landing__arrow right'></div>
                    </div>
                </div>
                <img
                    className='Landing__greeting-image' 
                    src='/images/enni.png'
                    alt='A friendly-looking, three-headed dog.'
                />
            </div>
            <section
                className='Landing__section'
            >
                <header>
                    <h2>What is Legendum?</h2>
                </header>
                <p>Legendum is a Latin learning app that uses stories, images, and short quizzes to teach Latin!</p>
                <p>This is a demo version of Legendum designed to get initial feedback from users. The site is now hooked up to a backend server, so you can now create an account and save your own notes and progress!</p>
                <div
                    className='Landing__link-container'
                >
                    <Link
                        className='Landing__link' 
                        to='/register'
                    >
                        Click here to create an account and get started!
                    </Link>
                </div>
                <p>(You don't need to register to learn, but you'll need an account to save your own notes and your progress.)</p>
                <p>This demo version of Legendum contains two chapters.  The goal is to release new chapters regularly in the future.</p>
            </section>
            <section 
                className='Landing__section'
            >
                <header>
                    <h2>Want to try all of the features without creating an account?</h2>
                </header>
                <p>Try out Legendum by using a demo account before creating an account of your own.</p>
                <button
                    className='Landing__demo button'
                    type='button'
                    onClick={demoLogin}
                >
                    Try Legendum with a demo account
                </button>
                <div
                    className='Landing__alert-div' 
                    role='alert'
                >
                    {loginError && 
                        <p 
                            className='Landing__p error'
                        >
                            Error: Could not launch demo. Check your connection and try again.
                        </p> 
                    }
                </div>
            </section>
            <section
                className='Landing__section'
            >
                <header>
                    <h2>How does Legendum Work?</h2>
                </header>
                <p>Legendum was designed with two goals in mind: keep the learner engaged and build the learner's confidence.</p>
                <section
                    className='Landing__section'
                >
                    <header>
                        <h3>Engagement Through Stories and Images</h3>
                    </header>
                    <p>Legendum is designed like a game and users learn Latin by completing chapters in a story. The story is full of fun characters, charming images, and the occasional bit of witty banter.</p>
                    <p>Each chapter begins with a story in English that sets the scene.</p>
                    <div
                        className='Landing__link-container'
                    >
                        <Link 
                            to='/game/story/1'
                            className='Landing__link'
                        >
                            Click here to get started with Chapter 1!
                        </Link>
                    </div>
                </section>
                <section
                    className='Landing__section'
                >
                    <header>
                        <h3>Build your Confidence with Comprehensible Input</h3>
                    </header>
                    <p>After the user reads through the story, the chapter's Latin lesson begins. Lessons are designed on the principles of Comprehensible Input. In short, proponents of this theory of language learning argue that the best way to learn a language is to be exposed to it without the filter of another language.</p>
                    <p>Legendum uses short sentences, repetition, and images to help students understand the Latin that they are reading without having to translate it in their heads!</p>
                    <p>There are, however, hints, explanations, and tips throughout the lesson that a user can toggle on and off. This means that users can avoid the stress of "not knowing" what's going on. Stress is a major impediment to language learning, so Legendum aims to make learning Latin as stress-free as possible!</p>
                    <p>Registered users can save the grammatical tidbits that are presented and can even add personal notes.</p>
                    <p>Too exicted about Latin to start with an English story?</p> 
                    <div
                        className='Landing__link-container'
                    >
                        <Link
                            className='Landing__link' 
                            to ='/game/exercises/1/learn'
                        >
                            Jump right in and start learning with Exercise One!
                        </Link>
                    </div>  
                </section>
                <section
                    className='Landing__section'
                >
                    <header>
                        <h3>Test yourself with short quizzes</h3>
                    </header>
                    <p>Each lesson is followed by a short quiz that helps users gauge their comprehension and retention.</p>
                    <p>These quizzes are low-stress undertakings. If an incorrect answer is given, the user is presented with a short hint or explanation on why the answer is incorrect. Users can simply try again if they get the question wrong and overall "grades" are not kept. Registered users have access to their notes throughout.</p>
                    <p>Already know some Latin and want to test yourself out right away?</p> 
                    <div
                        className='Landing__link-container'
                    >
                        <Link 
                            className='Landing__link'
                            to='/game/exercises/1/do'
                        >
                            Try the first quiz!
                        </Link>
                    </div>
                </section>
                <section
                    className='Landing__section'
                >
                    <header>
                        <h3>Keep Track of your Progress</h3>
                    </header>
                    <p>Registered users can track their progress through lessons and stories, see how many times they've completed each chapter, and access and edit their notes on the dashboard.</p>
                    <p>Already have an account?</p>
                    <div
                        className='Landing__link-container'
                    >
                        <Link
                            className='Landing__link' 
                            to='/dashboard'
                        >
                            Checkout the dashboard!
                        </Link>
                    </div>
                </section>
            </section>
            {showLoading && <LoadingSpinner />}
        </>
    );
}

Landing.defaultProps = {
    forceUpdate: () => {},
    history: {
        push: () => {},
    },
};

Landing.propTypes = {
    forceUpdate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default Landing;
