import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

import Customers from './components/Customers'
import AddCustomer from './forms/AddCustomer'
import UpdateCustomer from './forms/UpdateCustomer'
import ViewCustomer from './forms/ViewCustomer'

import Orders from './components/Orders'
import AddOrder from './forms/AddOrder'
import UpdateOrder from './forms/UpdateOrder'
import ViewOrder from './forms/ViewOrder'

import Payments from './components/Payments'
import AddPayment from './forms/AddPayment.js'
import UpdatePayment from './forms/UpdatePayment'
import ViewPayment from './forms/ViewPayment'

import Contributer from './pages/Contributer'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar title="Application" />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/customers" component={Customers} />
          <Route exact path="/addCustomer" component={AddCustomer} />
          <Route exact path="/updateCustomer/:id" component={UpdateCustomer} />
          <Route exact path="/viewCustomer/:id" component={ViewCustomer} />

          <Route exact path="/orders" component={Orders} />
          <Route exact path="/addOrder" component={AddOrder} />
          <Route exact path="/updateOrder/:id" component={UpdateOrder} />
          <Route exact path="/viewOrder/:id" component={ViewOrder} />

          <Route exact path="/payments" component={Payments} />
          <Route exact path="/addPayment" component={AddPayment} />
          <Route exact path="/updatePayment/:id" component={UpdatePayment} />
          <Route exact path="/viewPayment/:id" component={ViewPayment} />

          <Route exact path="/github" component={Contributer} />
          <Route component={NotFound} />
        </Switch>
        <Footer></Footer>
      </Router>
    );
  }
}

export default App;
