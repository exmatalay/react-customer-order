import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <main className="flex-shrink-0 container" >

            
            <div className="album py-5 bg-light">
                <div className="row row-cols-1 row-cols-sm-12 row-cols-md-12">
                    <div className="navbar navbar-dark bg-dark shadow-sm">
                        <div className="cover-container d-flex w-50 h-300 p-5 mx-auto flex-column">
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <Link to="/" className="nav-link">Home</Link>
                            </nav>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="navbar navbar-dark bg-dark shadow-sm">
                        <div className="cover-container d-flex w-50 h-300 p-5 mx-auto flex-column">
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <Link to="/customers" className="nav-link">Customers</Link>
                            </nav>
                        </div>
                    </div>
                    <hr></hr>

                    <div className="navbar navbar-dark bg-dark shadow-sm">
                        <div className="cover-container d-flex w-50 h-300 p-5 mx-auto flex-column">
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <Link to="/orders" className="nav-link">Orders</Link>
                            </nav>
                        </div>
                    </div>
                    <hr></hr>

                    <div className="navbar navbar-dark bg-dark shadow-sm">
                        <div className="cover-container d-flex w-50 h-300 p-5 mx-auto flex-column">
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <Link to="/payments" className="nav-link">Payments</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Home;
