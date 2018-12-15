import { combineReducers } from 'redux';
import {
    ADD_TO_DISPLAY_CARDS,
    ADD_TO_QUEUE_CARDS,
    MOVE_TO_DISPLAY_CARDS,
    SET_FILTER_TEXT,
    SET_SORT_ATTRIBUTE,
} from '../constants';

const cards = (state = {
    filterText: '',
    displayCards: [],
    queuedCards: [],
    sortAttribute: 'none',
}, action) => {
    switch (action.type) {
        case ADD_TO_DISPLAY_CARDS:
            return {
                ...state,
                displayCards: [...state.displayCards, ...action.cards],
            };

        case ADD_TO_QUEUE_CARDS:
            return {
                ...state,
                queuedCards: [...state.queuedCards, ...action.cards],
            };

        case MOVE_TO_DISPLAY_CARDS:
            return {
                ...state,
                displayCards: [...state.displayCards, ...state.queuedCards],
                queuedCards: [],
            }
        
        case SET_FILTER_TEXT:
            return {
                ...state,
                filterText: action.text,
            };

        case SET_SORT_ATTRIBUTE:
            return {
                ...state,
                sortAttribute: action.text
            };

        default:
            return state;
    }
};

export default combineReducers({
    cards,
});
