import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <header>
            <div className="bg-dark collapse" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white"> {props.title} </h4>
                            <p className="text-muted">Add some information about the application below, the author, or any other background
                            context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off
                                to some social networking sites or contact information.</p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contact</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                <li><a href="#" className="text-white">Like on Facebook</a></li>
                                <li><a href="#" className="text-white">Email me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong> {props.title} </strong>
                    </a>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/customers" className="nav-link">Customers</Link>
                        <Link to="/orders" className="nav-link">Orders</Link>
                        <Link to="/payments" className="nav-link">Payments</Link>
                    </nav>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
                        aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    )
}

Navbar.defaultProps = {
    title: "Application"
}
Navbar.propTypes = {
    title: PropTypes.string.isRequired
}
export default Navbar;