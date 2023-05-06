import { combineReducers } from "@reduxjs/toolkit";

const initialState={
    user: {
        'id': '',
        'email': '',
        'token': ''
    },
    productPageFilters: {
        search: '',
        sortBy: 'Default',
        category: 'ALL'
    },
    popups: {
        orderPlaced: false,
        productDeleted: '',
        productModified: '',
        productAdded: ''
    }
};
const UserReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case 'login':
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case 'logout':
            localStorage.clear();
            return {};
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    user: UserReducer
  });
    
export default AppReducer;