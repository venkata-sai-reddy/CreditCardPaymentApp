import React, { Component } from 'react';
import './PaymentStyle.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../../Store/Actions/UserActions';
import upi from '../../../Images/upi.jpg';
import { Redirect } from 'react-router';

class PayUnBill extends Component {

    constructor() {
        super();
        this.state = {
            amount: '',
            method: '',
            accountNumber:'',
            errors: {}
        }
    }
    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount() {
        const { userAction, match } = this.props;
        userAction.fetchUnBilledStatements(match.params.cardNumber);
        userAction.fetchAccounts(match.params.userId);
    }
    validate = () => {
        let amount = this.state.amount;
        let method = this.state.method;
        let accountNumber = this.state.accountNumber;
        let errors = {};
        let isValid = true;

        if (!amount) {
            isValid = false;
            errors["amount"] = "Enter the amount";
        }else if(!amount.match("^[1-9][0-9.]{0,14}")){
            isValid = false;
            errors["amount"] = "Enter valid Amount";
        }

        if (!method) {
            isValid = false;
            errors["method"] = "choose payment method";
        }

        if (method === "BANKACCOUNT") {
            if (!accountNumber) {
                isValid = false;
                errors["accountNumber"] = "choose account Number";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
    doPayment = event => {
        event.preventDefault();

        const { match, userAction } = this.props;
        const payment = {
            amount: this.state.amount,
            method: this.state.method
        };
        if (this.validate()) {
            if (payment.method === "BANKACCOUNT") {
                userAction.doPaymentCardUsingAccount(match.params.cardNumber, this.state.accountNumber, payment);
            } else if (payment.method === "UPI") {
                userAction.doPaymentUsingUPI(match.params.cardNumber, payment)
            }

        }
    }

    render() {
        const { isFetchedUnBilledStatements,unBilledStatements,paymentUPI, isPayedUPI, paymentCardAccount, isPayedCardAccount, isFetchedAccounts, accounts } = this.props;

        if(isPayedUPI || isPayedCardAccount){
            return <Redirect to={`/home/${this.props.match.params.userId}`}/>
        }

        if (isFetchedUnBilledStatements) {
            return (
                <div className=" container-fluid top-padding">
                    <div className="conatiner-fluid heading-payments">
                        <div className="row">
                            <div className="col-sm-12">
                                <div>
                                    {
                                        (isPayedCardAccount === true || isPayedUPI === true) && <div className="alert alert-success" role="alert">Paied Successful</div>
                                    }
                                    {
                                        (isPayedCardAccount === false || isPayedUPI === false) && <div className="alert alert-danger" role="alert">Payment Failed {(isPayedCardAccount === false) && paymentCardAccount} {(isPayedUPI === false) && paymentUPI}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 payment-body">
                        <div className="container ">
                            <div className="container-fluid no-padding">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <div className="col-sm-12 bg-light login-body text-dark">
                                            <h3 className="text h3">Payment Gateway</h3>
                                            <form className="login-form" onSubmit={this.doPayment} type="POST">
                                                <div className="form-group form-payment">
                                                    <label htmlFor="cardNumber">Card Number</label>
                                                    <input type="text" name="cardNumber" id="cardNumber" className="form-control" placeholder="amount" defaultValue={unBilledStatements.cardNumber} onChange={this.handleInputChange} disabled />
                                                </div>
                                                <div className="form-group form-payment">
                                                    <label htmlFor="amount">Amount</label>
                                                    <input type="text" name="amount" id="amount" className="form-control" placeholder="amount" defaultValue={unBilledStatements.dueAmount} onChange={this.handleInputChange} />
                                                    <span className="text-danger">{this.state.errors.amount}</span>
                                                </div>
                                                <div className="row form-group form-payment">
                                                    <label htmlFor="method">Payment Method</label>
                                                    <div className="col-sm-4"><label><input type="radio" id="method" name="method" value="UPI" className="upi-radio" onChange={this.handleInputChange} /><img className="image-upi radio-logos" src={upi} alt="UPI"></img></label></div>
                                                    {
                                                        (isFetchedAccounts) && <div className="col-sm-4"><label><input type="radio" id="method" name="method" value="BANKACCOUNT" className="account-radio" onChange={this.handleInputChange} /><i className="fa fa-bank fa-bank-account-logo radio-logos"></i></label></div>
                                                    }
                                                    <span className="text-danger">{this.state.errors.method}</span>
                                                </div>
                                                <div className="row form-group form-payment-account">
                                                    {
                                                        (this.state.method === "BANKACCOUNT" && isFetchedAccounts === true) &&
                                                        <div>
                                                            <label htmlFor="accountNummber">Account Number</label>
                                                            <select name="accountNumber" id="accountNumber" className="form-control select-account" onChange={this.handleInputChange} >
                                                                <option disabled selected>choose an Account</option>
                                                                {
                                                                    accounts.map(account =>
                                                                        <option value={account.accountNumber}>{account.accountNumber}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <span className="text-danger">{this.state.errors.accountNumber}</span>
                                                        </div>
                                                    }

                                                </div>
                                                <div className="form-group buttons-transact">
                                                    <input type="submit" className=" btn btn-success bttn-send" value="Pay Bill" />
                                                    <input type="reset" className="btn btn-danger bttn-transact-cancel" value="Cancel" />
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    fetching...
                </div>
            )
        }

    }
}
function mapStateToProps(state) {
    return {
        unBilledStatements : state.UserReducers.unBilledStatements,
        isFetchedUnBilledStatements : state.UserReducers.isFetchedUnBilledStatements,
        accounts: state.UserReducers.accounts,
        isFetchedAccounts: state.UserReducers.isFetchedAccounts,
        paymentUPI : state.UserReducers.paymentUPI,
        isPayedUPI : state.UserReducers.isPayedUPI,
        paymentCardAccount : state.UserReducers.paymentCardAccount,
        isPayedCardAccount : state.UserReducers.isPayedCardAccount,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userAction, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PayUnBill);