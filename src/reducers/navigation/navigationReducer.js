import { Map } from 'immutable';

const initialState = new Map({
    nav_label: '',
    sidebarVisible: false
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAV_LABEL': return state.set('nav_label', action.text);
        case 'SHOW_SIDEBAR': return state.set('sidebarVisible', true);
        case 'HIDE_SIDEBAR': return state.set('sidebarVisible', false);
        default: return state;
    }
}

export default reducer;
