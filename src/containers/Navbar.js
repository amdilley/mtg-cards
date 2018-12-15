import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _debounce from 'lodash.debounce';

import {
    setFilterText,
    setSortAttribute,
} from '../actions';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.updateSort = this.updateSort.bind(this);
    }

    updateFilter = _debounce(filter => {
        this.props.setFilterText(filter);
    }, 500)

    updateSort(e) {
        this.props.setSortAttribute(e.target.value);
    }

    sortInput(type, displayText) {
        return (
            <span>
                <input
                    type="radio"
                    name="sort-method"
                    value={type}
                    checked={this.props.sortAttribute === type}
                    id={`sort-${type}`}
                    onChange={this.updateSort}
                />
                {displayText}
            </span>
        );
    }

    render() {
        return (
            <div className="mtg-navbar">
                <input
                    type="text"
                    placeholder="Filter"
                    onChange={e => this.updateFilter(e.target.value)}
                />
                {this.sortInput('none', 'None')}
                {this.sortInput('name', 'Name')}
                {this.sortInput('artist', 'Artist')}
                {this.sortInput('setName', 'Set Name')}
                {this.sortInput('originalType', 'Original Type')}
            </div>
        );
    }
}

Navbar.propTypes = {
    setFilterText: PropTypes.func,
    setSortAttribute: PropTypes.func,
    sortAttribute: PropTypes.oneOf([
        'none',
        'artist',
        'name',
        'originalType',
        'setName',
    ]),
};

const mapStateToProps = state => ({
    sortAttribute: state.cards.sortAttribute,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setFilterText,
    setSortAttribute,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
