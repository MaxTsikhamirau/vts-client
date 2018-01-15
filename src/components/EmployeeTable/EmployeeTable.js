import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import ActionBar from '../../containers/ActionBar/ActionBar';
import SearchControl from '../SearchControl/SearchControl';
import './EmployeeTable.css';

import { setErrorAction } from '../../reducers/alertActions';

@connect(
    store => ({
        employees: store.employees.get('employees').toJS(),
        loading: store.employees.get('loading')
    }),
    dispatch => ({
        setErrorAction: (message) => dispatch(setErrorAction(message))
    })
)
class EmployeeTable extends React.Component {

    state = {
        searchText: ''
    }

    changeSearchHandler = (event) => this.setState({ searchText: event.target.value });
    cancelSearchHandler = () => this.setState({ searchText: '' });

    ActionBar = () => {
        return <ActionBar
            left={
                <SearchControl
                    text={this.state.searchText}
                    changed={this.changeSearchHandler}
                    canceled={this.cancelSearchHandler} />
            }
            right={
                <Link to="/manage">
                    <Button bsStyle="primary">Add Employee</Button>
                </Link>
            } />;
    }

    simpleRow = (header, accessor, transform = (val) => val) => (
        {
            Header: header,
            accessor,
            Cell: row => (
                <Link to={`/view/${row.original.id}`} >
                    <div style={{ cursor: 'pointer', padding: '7px' }}>
                        { transform(row.original[accessor]) }
                    </div>
                </Link>
            )
        }
    )

    ReactTable = (props) => {
        return <ReactTable
            data={props.employees}
            columns={[
                this.simpleRow('Employee Name', 'fullName'),
                this.simpleRow('Email', 'email'),
                this.simpleRow('Manager', 'manager'),
                this.simpleRow('Groups', 'groupsFormatted'),
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
        />;
    }

    render() {
        if (!sessionStorage.token) {
          return <Redirect to="/login" />;
        }
        const filteredEmployees = this.props.employees
            .filter(employee =>
                employee.fullName.toLowerCase().includes(this.state.searchText.toLowerCase()));
        return (
            <div className="EmployeeTable">
                <this.ActionBar />
                {
                  // <Button onClick={() => this.props.setErrorAction('Dummy Error!')} bsStyle="danger">
                  // Alert Button
                  // </Button>
                }
                {
                  this.props.loading ? <div style={{margin:'auto',padding: '50px',fontSize:'35px'}}>Loading...</div> : <this.ReactTable employees={filteredEmployees} />
                }
            </div>);
    }
}

export default EmployeeTable;
