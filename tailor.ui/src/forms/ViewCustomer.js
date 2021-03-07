import React, { Component } from 'react';
import axios from 'axios'

class ViewCustomer extends Component {

    state = {
        name: "",
        surname: "",
        phone1: "",
        phone2: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        mail: "",
        notes: "",
        date: "",
        error: false
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:1415/customers/${id}`)

        const { name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date } = response.data;
        this.setState({
            name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date
        })
    }

    render() {
        const { name, surname, phone1, phone2, address1, address2, city, state, mail, notes, date } = this.state;

        return (
            <div className="container py-3">
                <div className="card">
                    <div className="card-header">
                        <h4>View Customer</h4>
                    </div>
                    <div className="card-body">
                        <form className="row g-3" >
                            <fieldset disabled>
                                <div className="form-group col-md-6">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text"
                                        id="id"
                                        name="name"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={name}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="surname" className="form-label">Surname</label>
                                    <input type="text"
                                        name="surname"
                                        id="surname"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={surname}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone1" className="form-label">Phone</label>
                                    <input type="text"
                                        name="phone1"
                                        id="phone1"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={phone1}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone2" className="form-label">Other Phone</label>
                                    <input type="text"
                                        name="phone2"
                                        id="phone2"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={phone2}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="address1" className="form-label">Address</label>
                                    <input type="text"
                                        name="address1"
                                        id="address1"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={address1}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="address2" className="form-label">Other Address</label>
                                    <input type="text"
                                        name="address2"
                                        id="address2"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={address2}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text"
                                        name="city"
                                        id="city"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={city}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text"
                                        name="state"
                                        id="state"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={state}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="mail" className="form-label">Mail</label>
                                    <input type="mail"
                                        name="mail"
                                        id="mail"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={mail}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="notes" className="form-label">Notes</label>

                                    <input type="text"
                                        name="notes"
                                        id="notes"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={notes}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date"
                                        name="date"
                                        id="date"
                                        placeholder="..."
                                        className="form-control form-control-lg"
                                        value={date}
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewCustomer;
