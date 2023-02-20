import React from 'react';
import ItemList from './ItemsList.js';
import Navbar from '../Common/Navbar.js';

export default class ProductListIndex extends React.Component {

    render() {
        return (
            <>
                <Navbar DarkMode={this.props.DarkMode} toggleDark={this.props.toggleDark}  />
                <ItemList DarkMode={this.props.DarkMode} />
            </>
        )
    }
}