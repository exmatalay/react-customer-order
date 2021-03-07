import React, { Component } from 'react'
import axios from 'axios';

const UserContext = React.createContext();

// Provider, Consumer

const reducer = (state, action) => {
    switch (action.type) {
        case "DELETE_CUSTOMER":
            return {
                ...state,
                customers: state.customers.filter(customer => action.payload !== customer.id)
            }
        case "ADD_CUSTOMER":
            return {
                ...state,
                customers: [...state.customers, action.payload]
            }

        case "UPDATE_CUSTOMER":
            return {
                ...state,
                customers: state.customers.map(customer => customer.id === action.payload.id ? action.payload : customer)
            }


        case "DELETE_ORDER":
            return {
                ...state,
                orders: state.orders.filter(order => action.payload !== order.id)
            }
        case "ADD_ORDER":
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }

        case "UPDATE_ORDER":
            return {
                ...state,
                orders: state.orders.map(order => order.id === action.payload.id ? action.payload : order)
            }


        case "DELETE_PAYMENT":
            return {
                ...state,
                payments: state.payments.filter(payment => action.payload !== payment.id)
            }
        case "ADD_PAYMENT":
            return {
                ...state,
                payments: [...state.payments, action.payload]
            }

        case "UPDATE_PAYMENT":
            return {
                ...state,
                payments: state.payments.map(payment => payment.id === action.payload.id ? action.payload : payment)
            }

        default:
            return state
    }
}

export class UserProvider extends Component {

    state = {
        customers: [
        ],
        orders: [
        ],
        payments: [
        ],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }
    componentDidMount = async () => {
        const responseCustomers = await axios.get("http://localhost:1415/customers")
        const responseOrders = await axios.get("http://localhost:1415/orders")
        const responsePayments = await axios.get("http://localhost:1415/payments")

        this.setState({
            customers: responseCustomers.data,
            orders: responseOrders.data,
            payments: responsePayments.data
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;