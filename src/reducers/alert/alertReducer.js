const initialState = {
    type: 'warning',
    message: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALERT': return action.alert;
        default: return state;
    }
}

export default reducer;