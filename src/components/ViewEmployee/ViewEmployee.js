import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, FormGroup, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import './ViewEmployee.css';

import EmployeeModel from '../../model/employee';

import { get } from '../../functions/server';

import { fetchEmployees, removeEmployee } from '../../functions/employeeFunctions';
import { removeEmployeeAction, fetchEmployeesAction } from '../../reducers/employeeActions';

const DisplayRow = ({ label, children }) => (
    <FormGroup>
        <Col sm={4} >
            <span style={{ fontWeight: 'bold' }}>
                {label}
            </span>
        </Col>
        <Col sm={8}>{children}</Col>
    </FormGroup>
);

@connect(
  null,
  dispatch => ({
    removeEmployee: (id) => dispatch(removeEmployeeAction(id)),
    fetchEmployees: () => dispatch(fetchEmployees())
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
            get('employees/' + id, null, (employee) => {
                this.setState({ employee: new EmployeeModel(employee && employee.employee) });
            });
        }
    }

    componentDidMount = () => {
        const employeeId = this.props.match.params.id;
        this.updateEmployeeFromServer(employeeId);
    }

    handleRemove = () => {
        this.props.history.goBack();
        const id = this.props.match.params.id;
        removeEmployee(id).then(this.props.fetchEmployees);
        this.props.removeEmployee(id);
    }

    render() {
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
                        <Panel header="Balance">
                            <DisplayRow label="Working since">
                                {employee.startDateFormatted}
                            </DisplayRow>
                            <DisplayRow label="Days per year">
                                {20}
                            </DisplayRow>
                            <div className="gigantic">{employee.balanceFormatted}</div>
                        </Panel>
                    </div>
                </div>
                <div className="ViewEmployee-buttons">
                    <Link to={`/manage/${this.props.match.params.id}`}><Button bsStyle="primary" >Edit</Button></Link>
                    <Button bsStyle="primary" onClick={this.handleRemove}>Remove</Button>
                    <Button bsStyle="primary" onClick={this.props.history.goBack}>Back</Button>
                </div>
            </div>
        );
    }
};

export default ViewEmployee;
