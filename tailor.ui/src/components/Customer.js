import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserConsumer from "../context";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Customer extends Component {

    static defaultProps = {
        id: 0,
        name: "Bilgi Yok",
        surname: "Bilgi Yok",
        phone1: "Bilgi Yok",
        phone2: "Bilgi Yok",
        adress1: "Bilgi Yok",
        adress2: "Bilgi Yok",
        city: "Bilgi Yok",
        state: "Bilgi Yok",
        mail: "Bilgi Yok",
        notes: "Bilgi Yok",
        date: new Date().toLocaleDateString("sv")
    }

    state = {
        isVisible: false,
    }

    onClickEvent = (event) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeleteCustomer = async (dispatch, e) => {
        const { id } = this.props;
        // Delete Request 
        await axios.delete(`http://localhost:1415/customers/${id}`);

        // Consumer Dispatch
        dispatch(
            {
                type: "DELETE_CUSTOMER",
                payload: id
            }
        );
    }

    componentWillUnmount() {
        // console.log("componentWillUnmount");
        // component domdan silinmedne önce yapılması gerekenler yada uyarılar verilebilir
    }

    render() {
        const { id, name, surname, date } = this.props;
        const { isVisible } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100" >
                                    <div className="card-header p-4" onClick={this.onClickEvent.bind(this)} style={{ cursor: "pointer" }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div >
                                                <p className="h4">{name} </p>
                                                <p className="h6">{surname} </p>
                                            </div>
                                            <small className="text-muted">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-danger">
                                                        <i className="far fa-trash-alt" onClick={this.onDeleteCustomer.bind(this, dispatch)} style={{ cursor: "pointer" }}></i>
                                                    </button>
                                                </div>
                                            </small>
                                        </div>
                                    </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <div className="order-md-last">
                                                    <ul className="list-group mb-3">
                                                        <li className="list-group-item d-flex justify-content-between bg-light">
                                                            <div>
                                                                <h6 className="my-0 py-2">Total Orders</h6>
                                                            </div>
                                                            <span className="text-muted  py-2">5</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between  lh-sm">
                                                            <div>
                                                                <h6 className="my-0 py-2">Total Payments</h6>
                                                            </div>
                                                            <span className="text-muted  py-2">8</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                                            <div className="text-success">
                                                                <h6 className="my-0 py-2">Remaining Payment</h6>
                                                            </div>
                                                            <span className="text-success py-2">$20</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="card-footer">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`viewCustomer/${id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                                                <Link to={`updateCustomer/${id}`} className="btn btn-sm btn-outline-secondary">Update</Link>
                                            </div>
                                            <small className="text-muted">{new Date(date).toLocaleDateString("tr")}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </UserConsumer>
        )
    }
}

Customer.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    phone1: PropTypes.string.isRequired,
    phone2: PropTypes.string.isRequired,
    adress1: PropTypes.string.isRequired,
    adress2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
}

export default Customer;
