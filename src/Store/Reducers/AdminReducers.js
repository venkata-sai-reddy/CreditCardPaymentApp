const initialState = {
    users : [],
    user : undefined,
    isAdded:undefined,
    customers : undefined,
    creditcards : undefined
}

export default function AdminReducers(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ALL_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload
            };
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAdded:true
            };
        case 'ADD_USER_FAIL':
            return {
                ...state,
                user: action.payload,
                isAdded:false
            };
        case 'FETCH_ALL_CUSTOMERS_SUCCESS' :
            return {
                ...state,
                customers: action.payload
            };
        case 'FETCH_ALL_CREDIT_CARDS_SUCCESS' :
            return {
                ...state,
                creditcards: action.payload
            };
        default:
            return state;
    }
}