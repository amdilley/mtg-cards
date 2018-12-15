import {
    ADD_TO_DISPLAY_CARDS,
    ADD_TO_QUEUE_CARDS,
    MOVE_TO_DISPLAY_CARDS,
    SET_FILTER_TEXT,
    SET_SORT_ATTRIBUTE,
} from '../constants';

export const appendDisplayCards = cards => ({
    type: ADD_TO_DISPLAY_CARDS,
    cards,
});

export const appendQueueCards = cards => ({
    type: ADD_TO_QUEUE_CARDS,
    cards,
});

export const moveToDisplayCards = () => ({
    type: MOVE_TO_DISPLAY_CARDS,
});

export const setFilterText = text => ({
    type: SET_FILTER_TEXT,
    text,
});

export const setSortAttribute = text => ({
    type: SET_SORT_ATTRIBUTE,
    text,
});
