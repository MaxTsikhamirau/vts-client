import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';

import './ManageEmployee.css';
import Input from './Input/Input';
import EmployeeModel from '../../model/employee';

import { get } from '../../functions/server';

import { fetchEmployees, addEmployee, updateEmployee } from '../../functions/employeeFunctions';
import { addEmployeeAction, updateEmployeeAction, fetchEmployeesAction } from '../../reducers/employeeActions';

@connect(
    (store) => ({
      employees: store.employees.get('employees').toJS(),
    }),
    (dispatch) => ({
        addEmployee: (employee) => dispatch(addEmployeeAction(employee)),
        updateEmployee: (employee) => dispatch(updateEmployeeAction(employee)),
        fetchEmployees: () => dispatch(fetchEmployees()),
    })
)
export default class ManageEmployee extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        groups: PropTypes.array
    }

    static defaultProps = {
        groups: []
    }

    state = {
        employee: new EmployeeModel(),
        update: false
    }

    transformGroups = (groups) => groups.map(g => ({ value: g, label: g }));

    getGroupOptions = () => this.transformGroups(this.state.employee.groups);

    handleGroupChange = (event) =>
        this.setState({ employee:
            new EmployeeModel(
            {
                ...this.state.employee.obj,
                groups: event.map(group => group.value )
            })
        });

    updateEmployeeFromServer = (id) => {
        if (id) {
            get('employees/' + id, null, (employee) => {
                this.setState({ employee: new EmployeeModel(employee && employee.employee) });
            });
        }
    }

    componentDidMount = () => {
        const employeeId = this.props.match.params.id;
        this.updateEmployeeFromServer(employeeId);
        this.setState({ update: !!employeeId });
    }

    handleAdd = () => {
        if (this.state.employee.validate()) {
            addEmployee(this.state.employee).then(this.props.fetchEmployees);
            this.props.addEmployee(this.state.employee);
            this.clearEmployee();
            this.props.history.goBack();
        }
    }

    handleUpdate = () => {
        if (this.state.employee.validate()) {
            updateEmployee(this.state.employee).then(this.props.fetchEmployees);
            this.props.updateEmployee(this.state.employee);
            this.props.history.goBack();
        }
    }

    clearEmployee = () => {
        this.setState({ employee: new EmployeeModel() });
    }

    handleChange = (event) => {
        const employee = new EmployeeModel(this.state.employee);
        employee.setProp(event.target.name, event.target.value);
        this.setState({ employee });
    }

    getUniqEmployeeGroups = () =>
        _.uniq(this.props.employees.reduce((groups, employee) => groups.concat(employee.groups), []));

    render() {
        return (
            <div>
            <div className="ManageEmployee">
                <div>
                    <Input name="firstName"
                        label="First Name"
                        value={this.state.employee.firstName}
                        changed={this.handleChange}
                        validator={EmployeeModel.validateName} />
                    <Input name="lastName"
                        label="Last Name"
                        value={this.state.employee.lastName}
                        changed={this.handleChange}
                        validator={EmployeeModel.validateName} />
                </div>
                <div>
                    <Input name="email"
                        label="Email"
                        value={this.state.employee.email}
                        changed={this.handleChange}
                        validator={EmployeeModel.validateEmail} />
                </div>
                <div>
                    <FormGroup validationState={this.state.validationState}>
                        <ControlLabel>Groups</ControlLabel>
                        <Select.Creatable
                            multi
                            onChange={this.handleGroupChange}
                            options={this.transformGroups(this.getUniqEmployeeGroups())}
                            value={this.getGroupOptions()}
                        />
                    </FormGroup>
                </div>
                <div className="ManageEmployee-buttons">
                    { this.state.update
                        ? <Button bsStyle="primary" onClick={this.handleUpdate}>Update</Button>
                        : <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
                    }
                    <Button bsStyle="primary" onClick={this.clearEmployee}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.props.history.goBack}>Back</Button>
                </div>
            </div>
            </div>
        );
    }
};
