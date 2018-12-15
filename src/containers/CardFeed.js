import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Card from '../components/Card';
import PlaceholderCards from '../components/PlaceholderCards';

import {
    appendDisplayCards,
    appendQueueCards,
    moveToDisplayCards,
} from '../actions';
import {
    asyncCardGenerator,
    cacheCardImages,
    getCards,
    filterFactory,
    sortFactory,
} from '../utils/cards';
import { onScrollLastCardIntoView } from '../utils/scroll';
import compose from '../utils/compose';

class CardFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsIterator: asyncCardGenerator(),
        };
    }

    handleCardsIteration(callback) {
        getCards(this.state.cardsIterator)
            .then(cacheCardImages)
            .then(callback);
    }

    componentDidMount() {
        this.handleCardsIteration(this.props.appendDisplayCards);
        this.handleCardsIteration(this.props.appendQueueCards);

        onScrollLastCardIntoView(() => {
            if (this.props.filterText === '') {
                this.props.moveToDisplayCards();
                this.handleCardsIteration(this.props.appendQueueCards);
            }
        });
    }

    render() {
        const {
            displayCards,
            filterText,
            sortAttribute,
        } = this.props;

        const relevantCards = compose(
            filterFactory(filterText),
            sortFactory(sortAttribute)
        )(displayCards);

        return (
            <div className="mtg-cards-container">
                {
                    displayCards.length === 0
                        ? <PlaceholderCards/>
                        : relevantCards.map((cardData, i) => (
                              <Card key={`${i}-${cardData.multiverseid}`} {...cardData} />
                          ))
                }
            </div>
        );
    }
}

CardFeed.propTypes = {
    appendDisplayCards: PropTypes.func,
    appendQueueCards: PropTypes.func,
    displayCards: PropTypes.arrayOf(PropTypes.object),
    filterText: PropTypes.string,
    queuedCards: PropTypes.arrayOf(PropTypes.object),
    sortAttribute: PropTypes.oneOf([
        'none',
        'artist',
        'name',
        'originalType',
        'setName',
    ]),
};

const mapStateToProps = state => ({
    filterText: state.cards.filterText,
    displayCards: state.cards.displayCards,
    queuedCards: state.cards.queuedCards,
    sortAttribute: state.cards.sortAttribute,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    appendDisplayCards,
    appendQueueCards,
    moveToDisplayCards,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardFeed);
