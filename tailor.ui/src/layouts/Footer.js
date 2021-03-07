import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto bg-light">
                <div className="container">
                    <p className="float-end mb-1">
                        <a href="#">Back to top</a>
                    </p>
                    <p className="mb-1">Application example is © Bootstrap, but please download and customize it for yourself!</p>
                    <p className="mb-0">New to Bootstrap? <a href="#">Visit the homepage</a></p>
                </div>
            </footer>
        );
    }
}
export default Footer;