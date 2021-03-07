import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserConsumer from "../context";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Payment extends Component {

    static defaultProps = {
        id: 0,
        customerid: 0,
        orderid: 0,
        name: "Bilgi Yok",
        date: new Date().toLocaleDateString("sv"),
        notes: "Bilgi Yok",
        totalamount: "Bilgi Yok",
        paidamount: "Bilgi Yok",
        remainingamount: "Bilgi Yok",
    }

    state = {
        isVisible: false,
    }

    onClickEvent = (event) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    onDeletePayment = async (dispatch, e) => {
        const { id } = this.props;
        // Delete Request 
        await axios.delete(`http://localhost:1415/payments/${id}`);

        // Consumer Dispatch
        dispatch(
            {
                type: "DELETE_PAYMENT",
                payload: id
            }
        );
    }

    componentWillUnmount() {
        // console.log("componentWillUnmount");
        // component domdan silinmedne önce yapılması gerekenler yada uyarılar verilebilir
    }

    render() {
        const { id, name, date } = this.props;
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
                                                <p className="h6"> </p>
                                            </div>
                                            <small className="text-muted">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-danger">
                                                        <i className="far fa-trash-alt" onClick={this.onDeletePayment.bind(this, dispatch)} style={{ cursor: "pointer" }}></i>
                                                    </button>
                                                </div>
                                            </small>
                                        </div>
                                    </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <div className="payment-md-last">
                                                    <ul className="list-group mb-3">
                                                        <li className="list-group-item d-flex justify-content-between bg-light">
                                                            <div>
                                                                <h6 className="my-0 py-2">Total Payments</h6>
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
                                                <Link to={`viewPayment/${id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                                                <Link to={`updatePayment/${id}`} className="btn btn-sm btn-outline-secondary">Update</Link>
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

Payment.propTypes = {
    id: PropTypes.number.isRequired,
    customerid: PropTypes.number.isRequired,
    orderid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    notes: PropTypes.string.isRequired,
    totalamount: PropTypes.string.isRequired,
    paidamount: PropTypes.string.isRequired,
    remainingamount: PropTypes.string.isRequired
}

export default Payment;