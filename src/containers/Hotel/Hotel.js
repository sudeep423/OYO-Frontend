import React, { Component } from 'react'

import classes from './Hotel.module.css'

import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router';

class hotel extends Component {

    state = {
        controls: {
            NoOfRooms: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    min: 0
                },
                value: 0,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: "No of rooms"
            }
        },
        notFound: false
    }

    componentDidMount() {
        const query = {}
        query.hotelId = parseInt(new URLSearchParams(this.props.location.search).get("id"))
        query.stayDay = parseInt(new URLSearchParams(this.props.location.search).get("stayDay"))
        query.dateIn = new URLSearchParams(this.props.location.search).get("dateIn")
        if (query.hotelId === undefined || query.stayDay === undefined || query.dateIn === undefined) {
            return this.setState({ notFound: true })
        }
        console.log(query)
        this.props.searchHotel(query)
        let data = { ...this.state }
        data.controls.NoOfRooms.elementConfig.max = this.props.available
        this.setState(data)
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        console.log(1)
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
        this.props.addRooms({ rent: this.props.rent, rooms: updatedControls.NoOfRooms.value })
    }


    submitHandler = (event) => {
        event.preventDefault();
        const details = {}
        details.hotelId = parseInt(new URLSearchParams(this.props.location.search).get("id"))
        details.stayDay = parseInt(new URLSearchParams(this.props.location.search).get("stayDay"))
        details.dateIn = new URLSearchParams(this.props.location.search).get("dateIn")
        details.userId = 3
        details.qtyRooms = parseInt(this.state.controls.NoOfRooms.value)
        this.props.book(details)
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        console.log(this.props.booked)
        let redirect = null
        if (this.props.booked) {
            redirect = <Redirect to="/search" />
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.label}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let hotel = null
        if (this.props.hotel != null) {
            hotel = (<div>
                <p>{this.props.hotel.address}</p>
                <p>{this.props.hotel.city}</p>
                <p>{this.props.hotel.state}</p>
                <p>{this.props.hotel.pinCode}</p>
            </div>
            )
        }

        return (
            <div className={classes.MainCover}>
                <img className={classes.Image}></img>
                <div className={classes.test}>
                    {hotel}
                    {redirect}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">BOOK NOW</Button> <div>Total Rent = Rs {this.props.CurrentRent}</div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.hotel.available,
        rent: state.hotel.rent,
        hotel: state.hotel.hotel,
        CurrentRent: state.hotel.currentRent,
        booked: state.hotel.booked
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchHotel: (details) => dispatch(actions.searchHotel(details)),
        addRooms: (details) => dispatch(actions.addRooms(details)),
        book: (details) => dispatch(actions.book(details))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(hotel)
