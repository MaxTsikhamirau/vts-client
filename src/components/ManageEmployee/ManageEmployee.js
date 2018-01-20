import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './ManageEmployee.css';
import Input from './Input/Input';
import EmployeeModel from '../../model/employee';

import { fetchEmployeeById } from '../../functions/employeeFunctions';
import { addEmployeeAction, updateEmployeeAction } from '../../reducers/employee/employeeActions';
import { setNavLabelAction } from '../../reducers/navigation/navigationActions';

@translate('translations')
@connect(
    (store) => ({
      employees: store.employees.get('employees').toJS(),
    }),
    (dispatch) => ({
        addEmployee: (employee) => dispatch(addEmployeeAction(employee)),
        updateEmployee: (employee) => dispatch(updateEmployeeAction(employee)),
        setNavLabel: (text) => dispatch(setNavLabelAction(text))
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

    componentDidMount = () => {
      this.props.setNavLabel(this.props.t('navigation.label.manage-employee'));
      const employeeId = this.props.match.params.id;
      this.updateEmployeeFromServer(employeeId);
      this.setState({ update: !!employeeId });
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
        fetchEmployeeById(id).then(employee => this.setState({ employee }));
      }
    }

    handleAdd = () => {
      if (this.state.employee.validate()) {
        this.props.addEmployee(this.state.employee.obj);
        this.clearEmployee();
        this.props.history.goBack();
      }
    }

    handleUpdate = () => {
      if (this.state.employee.validate()) {
        this.props.updateEmployee(this.state.employee.obj);
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
      const { t } = this.props;
      return (
          <div className="ManageEmployee">
              <div>
                  <Input name="firstName"
                      label={t('manage-employee.first-name')}
                      value={this.state.employee.firstName}
                      changed={this.handleChange}
                      validator={EmployeeModel.validateName} />
                  <Input name="lastName"
                      label={t('manage-employee.last-name')}
                      value={this.state.employee.lastName}
                      changed={this.handleChange}
                      validator={EmployeeModel.validateName} />
              </div>
              <div>
                  <Input name="email"
                      label={t('manage-employee.email')}
                      value={this.state.employee.email}
                      changed={this.handleChange}
                      validator={EmployeeModel.validateEmail} />
              </div>
              <div>
                  <FormGroup validationState={this.state.validationState}>
                      <ControlLabel>{t('manage-employee.groups')}</ControlLabel>
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
                      ? <Button bsStyle="primary" onClick={this.handleUpdate}>{t('common.btn.update')}</Button>
                      : <Button bsStyle="primary" onClick={this.handleAdd}>{t('common.btn.add')}</Button>
                  }
                  <Button bsStyle="primary" onClick={this.clearEmployee}>{t('common.btn.cancel')}</Button>
                  <Button bsStyle="primary" onClick={this.props.history.goBack}>{t('common.btn.back')}</Button>
              </div>
          </div>
      );
    }
};
