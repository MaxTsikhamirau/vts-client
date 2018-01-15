export const fetchEmployeesAction = (employees) =>
  ({ type: 'FETCH_EMPLOYEES', employees });

export const addEmployeeAction = (employee) => ({ type: 'ADD_EMPLOYEE', employee });

export const updateEmployeeAction = (employee) => ({ type: 'UPDATE_EMPLOYEE', id: employee.id, employee });

export const removeEmployeeAction = (id) => ({ type: 'REMOVE_EMPLOYEE', id });
