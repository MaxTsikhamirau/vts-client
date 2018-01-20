import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './ViewEmployee.css';
import DisplayRow from './DisplayRow';
import EmployeeBalance from './EmployeeBalance';

import EmployeeModel from '../../model/employee';

import { fetchEmployeeById } from '../../functions/employeeFunctions';
import { deleteEmployeeAction } from '../../reducers/employee/employeeActions';
import { setNavLabelAction } from '../../reducers/navigation/navigationActions';

@translate('translations')
@connect(
  state => ({
    employees: state.employees.get('employees').toJS()
  }),
  dispatch => ({
    deleteEmployee: (id) => dispatch(deleteEmployeeAction(id)),
    setNavLabel: (text) => dispatch(setNavLabelAction(text))
  }))
class ViewEmployee extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    state = {
        employee: new EmployeeModel()
    }

    updateEmployeeFromServer = (id) => {
      if (id) {
        fetchEmployeeById(id).then(employee => this.setState({ employee }));
      }
    }

    componentDidMount = () => {
      this.props.setNavLabel(this.props.t('navigation.label.view-employee'));
      const employeeId = this.props.match.params.id;
      this.updateEmployeeFromServer(employeeId);
    }

    handleRemove = () => {
        this.props.history.goBack();
        const id = this.props.match.params.id;
        this.props.deleteEmployee(id);
    }

    render() {
        const { t } = this.props;
        const { employee } = this.state;
        return (
            <div>
                <div className="ViewEmployee">
                  <div className="ViewEmployee-generalInfo" >
                      <DisplayRow label="Name">{employee.fullName}</DisplayRow>
                      <DisplayRow label="Email">{employee.email}</DisplayRow>
                      <DisplayRow label="Manager">{employee.manager}</DisplayRow>
                      <DisplayRow label="Groups">{employee.groupsFormatted}</DisplayRow>
                  </div>
                  <div className="ViewEmployee-placeholder"></div>
                  <div className="ViewEmployee-vacationInfo">
                    <EmployeeBalance employee={employee} />
                  </div>
                </div>
                <div className="ViewEmployee-buttons">
                    <Link to={`/manage/${this.props.match.params.id}`}><Button bsStyle="primary" >{t('common.btn.edit')}</Button></Link>
                    <Button bsStyle="primary" onClick={this.handleRemove}>{t('common.btn.remove')}</Button>
                    <Button bsStyle="primary" onClick={this.props.history.goBack}>{t('common.btn.back')}</Button>
                </div>
            </div>
        );
    }
};

export default ViewEmployee;
