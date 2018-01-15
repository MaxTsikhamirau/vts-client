import { get, post, put, remove } from './server';
import EmployeeModel from '../model/employee';

export const fetchEmployees = () => {
  return ({
    type: 'FETCH_EMPLOYEES',
    payload: () => get('employees', null, employees =>
      (employees && employees.employees || []).map(e => new EmployeeModel(e)))
  })
}

export const addEmployee = (employee) =>
  post('employees', null, employee.obj, response => response && response.status);
export const updateEmployee = (employee) =>
  put(`employees/${employee.id}`, null, employee.obj, response => response && response.status);
export const removeEmployee = (id) =>
  remove(`employees/${id}`, null, response => response && response.status);
