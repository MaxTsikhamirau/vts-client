import employees from '../server/employees';
import EmployeeModel from '../model/employee';

export const fetchEmployeeById = (id) => {
  return employees.get(`/${id}`).then(response => new EmployeeModel(response.data.employee));
}
