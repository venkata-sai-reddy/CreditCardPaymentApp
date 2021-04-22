import Axios from 'axios';

const apiUrl = 'http://localhost:8099';

export const addCreditCardSuccess = (creditCard) => {
    return {
        type : 'ADD_CREDIT_CARD_SUCCESS',
        payload : creditCard
    }
};

export const addCreditCardFail = (message) => {
    return {
        type : 'ADD_CREDIT_CARD_FAIL',
        payload : message
    }
};

export const addCreditCard = (creditCard,userId) => {
    return (dispatch) => {
        return Axios.post(apiUrl + '/home/customers/creditcards/' + userId ,creditCard)
            .then(resp => {
                alert("added"+""+resp.data)
                dispatch(addCreditCardSuccess(resp.data))
            })
            .catch(error => {
                alert(error.response.data)
                dispatch(addCreditCardFail(error.response.data))
            });
    };
};

export const fetchCreditCardsFail = (message) => {
    return {
        type : 'FETCH_CREDIT_CARD_FAIL',
        payload : message
    }
};

export const fetchCreditCardsSuccess = (creditCards) => {
    return {
        type : 'FETCH_CREDIT_CARD_SUCCESS',
        creditCards
    }
};

export const fetchCreditCards = (userId) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customers/creditcards/all/' + userId)
            .then(resp => {
                dispatch(fetchCreditCardsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchCreditCardsFail(error.response.data))
            });
    };
};

export const fetchCreditCardFail = (message) => {
    return {
        type : 'FETCH_CREDIT_CARD_ID_FAIL',
        payload : message
    }
};

export const fetchCreditCardSuccess = (creditCard) => {
    return {
        type : 'FETCH_CREDIT_CARD_ID_SUCCESS',
        payload: creditCard
    }
};

export const fetchCreditCard = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customers/creditcards/' + cardNumber)
            .then(resp => {
                dispatch(fetchCreditCardSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchCreditCardFail(error.response.data))
            });
    };
};

export const deleteCreditCardSuccess = (message) => {
    return {
        type : 'DELETE_CREDIT_CARD_SUCCESS',
        payload : message
    }
};

export const deleteCreditCardFail = (message) => {
    return {
        type : 'DELETE_CREDIT_CARD_FAIL',
        payload : message
    }
};
export const deleteCreditCard = (cardNumber) => {
    return (dispatch) => {
        return Axios.delete(apiUrl + '/home/customers/creditcards/' +cardNumber)
            .then(resp => {
                dispatch(deleteCreditCardSuccess(resp.data))
            })
            .catch(error => {
                dispatch(deleteCreditCardFail(error.response.data))
            });
    };
};


// =============================================================================================================== Accounts




export const addAccountSuccess = (account) => {
    return {
        type : 'ADD_ACCOUNT_SUCCESS',
        payload : account
    }
};

export const addAccountFail = (message) => {
    return {
        type : 'ADD_ACCOUNT_FAIL',
        payload : message
    }
};

export const addAccount = (account,userId) => {
    return (dispatch) => {
        return Axios.post(apiUrl + '/home/customer/accounts/' + userId ,account)
            .then(resp => {
                dispatch(addAccountSuccess(resp.data))
            })
            .catch(error => {
                dispatch(addAccountFail(error.response.data))
            });
    };
};

export const fetchAccountsFail = (message) => {
    return {
        type : 'FETCH_ACCOUNT_FAIL',
        payload : message
    }
};

export const fetchAccountsSuccess = (account) => {
    return {
        type : 'FETCH_ACCOUNT_SUCCESS',
        payload : account
    }
};

export const fetchAccounts = (userId) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/accounts/all/' + userId)
            .then(resp => {
                dispatch(fetchAccountsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchAccountsFail(error.response.data))
            });
    };
};

export const deleteAccountSuccess = (message) => {
    return {
        type : 'DELETE_ACCOUNT_SUCCESS',
        payload : message
    }
};

export const deleteAccountFail = (message) => {
    return {
        type : 'DELETE_ACCOUNT_FAIL',
        payload : message
    }
};
export const deleteAccount = (userId,accountNumber) => {
    return (dispatch) => {
        return Axios.delete(apiUrl + '/home/customer/accounts/' + userId+'/'+accountNumber)
            .then(resp => {
                dispatch(deleteAccountSuccess(resp.data))
            })
            .catch(error => {
                dispatch(deleteAccountFail(error.response.data))
            });
    };
};

// =================================================================================================== personal Details



export const fetchPersonalDetailsFail = (message) => {
    return {
        type : 'FETCH_PERSONAL_DETAILS_FAIL',
        payload : message
    }
};

export const fetchPersonalDetailsSuccess = (details) => {
    return {
        type : 'FETCH_PERSONAL_DETAILS_SUCCESS',
        payload : details
    }
};

export const fetchPersonalDetails = (userId) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customers/' + userId)
            .then(resp => {
                dispatch(fetchPersonalDetailsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchPersonalDetailsFail(error.response.data))
            });
    };
};

export const updatePersonalDetailsSuccess = (details) => {
    return {
        type : 'UPDATE_PERSONAL_DETAILS_SUCCESS',
        payload : details
    }
};

export const updatePersonalDetailsFail = (message) => {
    return {
        type : 'UPDATE_PERSONAL_DETAILS_FAIL',
        payload : message
    }
};
export const updatePersonalDetails = (userId,details) => {
    return (dispatch) => {
        return Axios.put(apiUrl + '/home/customers/' + userId,details)
            .then(resp => {
                dispatch(updatePersonalDetailsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(updatePersonalDetailsFail(error.response.data))
            });
    };
};

// =================================================================================================== statements

export const fetchBilledStatementsFail = (message) => {
    return {
        type : 'FETCH_BILLED_STATEMENTS_FAIL',
        payload : message
    }
};

export const fetchBilledStatementsSuccess = (statements) => {
    return {
        type : 'FETCH_BILLED_STATEMENTS_SUCCESS',
        payload : statements
    }
};

export const fetchBilledStatements = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/statements/generateBill/' + cardNumber)
            .then(resp => {
                dispatch(fetchBilledStatementsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchBilledStatementsFail(error.response.data))
            });
    };
};

export const fetchStatementsFail = (message) => {
    return {
        type : 'FETCH_STATEMENTS_FAIL',
        payload : message
    }
};

export const fetchStatementsSuccess = (statements) => {
    return {
        type : 'FETCH_STATEMENTS_SUCCESS',
        payload : statements
    }
};

export const fetchStatements = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/statements/history/' + cardNumber)
            .then(resp => {
                dispatch(fetchStatementsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchStatementsFail(error.response.data))
            });
    };
};

export const fetchUnBilledStatementFail = (message) => {
    return {
        type : 'FETCH_UN_BILLED_STATEMENT_FAIL',
        payload : message
    }
};

export const fetchUnBilledStatementSuccess = (statement) => {
    return {
        type : 'FETCH_UN_BILLED_STATEMENT_SUCCESS',
        payload : statement
    }
};
export const fetchUnBilledStatements = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/statements/generateUnBilled/' + cardNumber)
            .then(resp => {
                dispatch(fetchUnBilledStatementSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchUnBilledStatementFail(error.response.data))
            });
    };
};

// =================================================================================================== payments

export const fetchPaymentsFail = (message) => {
    return {
        type : 'FETCH_PAYMENTS_FAIL',
        payload : message
    }
};

export const fetchPaymentsSuccess = (payments) => {
    return {
        type : 'FETCH_PAYMENTS_SUCCESS',
        payload : payments
    }
};

export const fetchPayments = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/payments/paymentHistory/' + cardNumber)
            .then(resp => {
                dispatch(fetchPaymentsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchPaymentsFail(error.response.data))
            });
    };
};

export const fetchPendingBillsFail = (message) => {
    return {
        type : 'FETCH_PENDING_BILLS_FAIL',
        payload : message
    }
};

export const fetchPendingBillsSuccess = (pendingBills) => {
    return {
        type : 'FETCH_PENDING_BILLS_SUCCESS',
        payload : pendingBills
    }
};

export const fetchPendingBills = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/payments/pendingBills/' + cardNumber)
            .then(resp => {
                dispatch(fetchPendingBillsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchPendingBillsFail(error.response.data))
            });
    };
};

export const doPaymentUsingUPISuccess = (payment) => {
    return {
        type : 'DO_PAYMENT_UPI_SUCCESS',
        payload : payment
    }
};

export const doPaymentUsingUPIFail = (message) => {
    return {
        type : 'DO_PAYMENT_UPI_FAIL',
        payload : message
    }
};

export const doPaymentUsingUPI = (cardNumber,payment) => {
    return (dispatch) => {
        return Axios.POST(apiUrl + '/home/customer/creditcard/payments/pay/payUsingUPI/' + cardNumber, payment)
            .then(resp => {
                dispatch(doPaymentUsingUPISuccess(resp.data))
            })
            .catch(error => {
                dispatch(doPaymentUsingUPIFail(error.response.data))
            });
    };
};

export const doPaymentUsingAccountSuccess = (payment) => {
    return {
        type : 'DO_PAYMENT_ACCOUNT_SUCCESS',
        payload : payment
    }
};

export const doPaymentUsingAccountFail = (message) => {
    return {
        type : 'DO_PAYMENT_ACCOUNT_FAIL',
        payload : message
    }
};
export const doPaymentUsingAccount = (statementId,accountNumber,payment) => {
    return (dispatch) => {
        return Axios.POST(apiUrl + '/home/customer/creditcard/payments/pendingBills/payUsingAccount/' + statementId+'/'+accountNumber, payment)
            .then(resp => {
                dispatch(doPaymentUsingAccountSuccess(resp.data))
            })
            .catch(error => {
                dispatch(doPaymentUsingAccountFail(error.response.data))
            });
    };
};




// =================================================================================================== Transactions

export const fetchTransactionsFail = (message) => {
    return {
        type : 'FETCH_TRANSACTIONS_FAIL',
        payload : message
    }
};

export const fetchTransactionsSuccess = (transactions) => {
    return {
        type : 'FETCH_TRANSACTIONS_SUCCESS',
        payload : transactions
    }
};

export const fetchTransactions = (cardNumber) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/transactions/history/' + cardNumber)
            .then(resp => {
                dispatch(fetchTransactionsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(fetchTransactionsFail(error.response.data))
            });
    };
};

export const doTransactionFail = (message) => {
    return {
        type : 'DO_TRANSACTION_FAIL',
        payload : message
    }
};

export const doTransactionSuccess = (transaction) => {
    return {
        type : 'DO_TRANSACTION_SUCCESS',
        payload : transaction
    }
};

export const doTransaction = (cardNumber,amount,description) => {
    return (dispatch) => {
        return Axios.get(apiUrl + '/home/customer/creditcard/transactions/' + cardNumber+'/'+amount+'/'+description)
            .then(resp => {
                dispatch(doPaymentUsingAccountSuccess(resp.data))
            })
            .catch(error => {
                dispatch(doPaymentUsingAccountFail(error.response.data))
            });
    };
};