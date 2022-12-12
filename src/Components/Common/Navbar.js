import React from "react";
import { BsFillMoonFill, BsSun } from 'react-icons/bs'
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {

    state = {
        Path: window.location.pathname
    }

    componentDidUpdate() {
        if (window.location.pathname !== this.state.Path) {
            this.setState(() => {
                return {
                    Path: window.location.pathname
                }
            })
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-title h4">{this.state.Path === "/" ? "Product List" : "Add Product"}</div>
                <ul className="Navbar">
                    {this.state.Path === "/" && <><li><Link to="/addproduct" className="nav-btn add" id="Add-New-Product">ADD</Link></li>
                        <li><button className="nav-btn delete" id="delete-product-btn" onClick={this.props.toggleDel}>MASS DELETE</button></li></>}
                    {this.state.Path === "/addproduct" && <><li><button className="nav-btn save" onClick={this.props.Save} id="Save-Product">Save</button></li>
                        <li><Link to="/" className="nav-btn cancel" id="Cancel-Product" onClick={this.props.CancelProduct}>Cancel</Link></li></>}
                    <li onClick={this.props.toggleDark}>{this.props.DarkMode && <BsSun />}{!this.props.DarkMode && <BsFillMoonFill />}</li>
                </ul>
            </nav>
        )
    }
}