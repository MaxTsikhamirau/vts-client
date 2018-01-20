import { Map, List } from 'immutable';

const initialState = new Map({
  employees: new List(),
  loading: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_EMPLOYEES_PENDING':
      return state.set('loading', true);
    case 'FETCH_EMPLOYEES_FULFILLED':
      return state.set('loading', false)
                  .set('employees', new List(action.payload));
    case 'FETCH_EMPLOYEES_REJECTED':
      return state.set('loading', false);

    case 'ADD_EMPLOYEE_PENDING':
      return state.set('loading', true);
    case 'ADD_EMPLOYEE_FULFILLED':
      return state.set('loading', false)
                  .set('employees', state.get('employees').push(action.payload));
    case 'ADD_EMPLOYEE_REJECTED':
      return state.set('loading', false);

    case 'ADD_EMPLOYEE':
      return state.set('employees', state.get('employees').push(action.employee));

    case 'UPDATE_EMPLOYEE_PENDING':
      return state.set('loading', true);
    case 'UPDATE_EMPLOYEE_FULFILLED':
      const employees = state.get('employees');
      const employeeIndex = employees.findIndex(e => e.id === action.id);
      if (employeeIndex !== -1) {
        return state.set('loading', false)
                    .set('employees', state.get('employees').set(employeeIndex, action.employee));
      }
      return state.set('loading', false);
    case 'UPDATE_EMPLOYEE_REJECTED':
      return state.set('loading', false);

    case 'UPDATE_EMPLOYEE': {
        const employees = state.get('employees');
        const employeeIndex = employees.findIndex(e => e.id === action.id);
        return state.set('employees', state.get('employees').set(employeeIndex, action.employee));
    }

    case 'DELETE_EMPLOYEE_PENDING':
      return state.set('loading', true);
    case 'DELETE_EMPLOYEE_FULFILLED':
      return state.set('loading', false)
                  .set('employees', state.get('employees').filter(e => e.id !== action.id));
    case 'DELETE_EMPLOYEE_REJECTED':
      return state.set('loading', false);

    case 'REMOVE_EMPLOYEE':
      return state.set('employees', state.get('employees').filter(e => e.id !== action.id));

    default: return state;
  }
}

export default reducer;
