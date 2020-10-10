import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesList from '../NotesList/NotesList';
import ProgressReport from '../ProgressReport/ProgressReport';
import NextStory from '../NextStory/NextStory';
import './Dashboard.css';

const Dashboard = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.match.path]);

    return (
        <section className='Dashboard__outer-section'>
            <h2>Dashboard</h2>
            <NextStory />
            <ProgressReport />
            <NotesList suffix='dashboard' />
        </section>
    );
}

Dashboard.defaultProps = {
    match: {
        path: '',
    }
};

Dashboard.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string,
    }).isRequired,
}

export default Dashboard;
