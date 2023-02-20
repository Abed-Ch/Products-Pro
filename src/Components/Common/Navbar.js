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
            <nav className="navbar navbar-expand-md ">
                <div className="container-fluid">
                    <a className="navbar-brand">Products Pro</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-md-0 ms-md-auto">
                            {this.state.Path === '/' && <li className="nav-item">
                                <Link className="nav-link active" to="/addproduct">Add Product</Link>
                            </li>}
                            {this.state.Path === "/addproduct" && <> <li className="nav-item" onClick={this.props.Save}>
                                <a className="nav-link active" href="#">Save</a>
                            </li>
                                <li className="nav-item" onClick={this.props.CancelProduct}>
                                    <Link className="nav-link active" to="/">Cancel</Link>
                                </li></>}
                            <li className="nav-item" onClick={this.props.toggleDark}>
                                <a className="nav-link" href="#">{this.props.DarkMode ? <BsSun /> : <BsFillMoonFill />}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}