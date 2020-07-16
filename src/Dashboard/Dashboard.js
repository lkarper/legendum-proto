import React from 'react';
import NotesList from '../NotesList/NotesList';
import ProgressReport from '../ProgressReport/ProgressReport';

const Dashboard = () => {

    return (
        <div>
            <ProgressReport />
            <NotesList />
        </div>
    );
}

export default Dashboard;