import React from 'react';
import { Route } from 'react-router-dom';
import Learn from '../Learn/Learn';
import Do from '../Do/Do';

const Exercise = (props) => {
    return (
        <div>
            <Route 
                path="/game/exercises/:chapt/learn"
                component={Learn}
            />
            <Route 
                path="/game/exercises/:chapt/do"
                component={Do}
            />

        </div>
    );
}

export default Exercise;