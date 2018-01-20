import { Map } from 'immutable';

const initialState = new Map({
    nav_label: '',
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAV_LABEL': return state.set('nav_label', action.text);
        default: return state;
    }
}

export default reducer;
