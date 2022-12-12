import React from 'react';
import ItemList from './ItemsList.js';
import Navbar from '../Common/Navbar.js';
import Footer from '../Common/Footer.js';

export default class ProductListIndex extends React.Component {
    state = {
        MassDelete: false
    }
    toggleDelete = () => {
        this.setState(prevState => ({ MassDelete: !prevState.MassDelete }))
        console.log(this.state.MassDelete)
    }
    render() {
        return (
            <>
                <Navbar DarkMode={this.props.DarkMode} toggleDark={this.props.toggleDark} toggleDel={this.toggleDelete} />
                <ItemList Delete={this.state.MassDelete} />
                <Footer />
            </>
        )
    }
}