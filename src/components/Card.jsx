import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            artist,
            imageUrl,
            name,
            originalType,
            setName,
        } = this.props;

        return (
            <div className="mtg-card">
                <img
                    src={imageUrl}
                    height={300}
                    alt={name}
                />
                <div className="mtg-card-info">
                    <div><strong>Name:</strong> {name}</div>
                    <div><strong>Artist:</strong> {artist}</div>
                    <div><strong>Set Name:</strong> {setName}</div>
                    <div><strong>Original Type:</strong> {originalType}</div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    artist: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    originalType: PropTypes.string,
    setName: PropTypes.string,
};

export default Card;
