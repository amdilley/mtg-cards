import React from 'react';

export default () => (
    <div className="mtg-placeholder-card-container">
        {(new Array(20)).fill().map((entry, i) => (
            <div key={i} className="mtg-placeholder-card"/>
        ))}
    </div>
);
