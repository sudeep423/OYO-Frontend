import React, { Component } from 'react'
import classes from './Search.module.css'
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Hotels from '../../components/Hotels/Hotels'

class search extends Component {

    state = {
        controls: {
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'city'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            boardingDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'Date',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            stayDay: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    min: "1",
                    max: ""
                },
                value: 1,
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        }
    }

    componentDidMount() {
        let newState = { ...this.state }
        newState.controls.city.value = this.props.city
        newState.controls.boardingDate.value = this.props.dateIn
        newState.controls.stayDay.value = this.props.stayDay
        this.setState(newState)
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


    }

    submitHandler = (event) => {
        event.preventDefault();
        const details = {}
        details.city = this.state.controls.city.value
        details.dateIn = this.state.controls.boardingDate.value
        details.stayDay = this.state.controls.stayDay.value
        console.log(details)
        console.log("kick")
        this.props.searchHotels(details)
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        // this.setState(prevState => {
        //     return { isSignup: !prevState.isSignup };
        // });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        console.log('Fight', this.props.stayDay)

        // if (this.props.loading) {
        //     form = <Spinner />
        // }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        // let authRedirect = null;
        // if (this.props.isAuthenticated) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath} />
        // }

        return (
            <div className={classes.CoverAuth}>
                <div className={classes.Auth}>
                    <h2 className={classes.Heading}>Search Your destination</h2>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SEARCH</Button>
                    </form>
                </div>
                <Hotels hotels={this.props.hotels} boardingDate={this.props.boardingDate} stayDay={this.props.stayDay} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        hotels: state.hotels.hotels,
        city: state.search.city,
        boardingDate: state.search.dateIn,
        stayDay: state.search.stayDay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchHotels: (details) => dispatch(actions.searchHotels(details)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(search)
