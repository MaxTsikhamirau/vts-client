import { Map, List } from 'immutable';

const initialState = new Map({
  employees: new List(),
  loading: false,
  error: ''
});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_EMPLOYEES_PENDING':
      return state.set('loading', true);
    case 'FETCH_EMPLOYEES_FULFILLED':
      return state.set('loading', false)
                  .set('error', '')
                  .set('employees', new List(action.payload));
    case 'FETCH_EMPLOYEES_REJECTED':
      return state.set('loading', false)
                  .set('error', action.error)
                  .set('employees', new List());

    case 'ADD_EMPLOYEE':
      return state.set('employees', state.get('employees').push(action.employee));

    case 'UPDATE_EMPLOYEE': {
        const employees = state.get('employees');
        const employeeIndex = employees.findIndex(e => e.id === action.id);
        return state.set('employees', state.get('employees').set(employeeIndex, action.employee));
    }

    case 'REMOVE_EMPLOYEE':
      return state.set('employees', state.get('employees').filter(e => e.id !== action.id));

    default: return state;
  }
}

export default reducer;
