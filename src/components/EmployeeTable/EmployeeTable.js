import React from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import ActionBar from '../../containers/ActionBar/ActionBar';
import SearchControl from '../SearchControl/SearchControl';
import './EmployeeTable.css';

import { fetchEmployeesAction } from '../../reducers/employee/employeeActions';
import { setErrorAction } from '../../reducers/alert/alertActions';
import { setNavLabelAction } from '../../reducers/navigation/navigationActions';

@translate('translations')
@connect(
    store => ({
        employees: store.employees.get('employees').toJS(),
        loading: store.employees.get('loading')
    }),
    dispatch => ({
      fetchEmployees: () => dispatch(fetchEmployeesAction()),
      setErrorAction: (message) => dispatch(setErrorAction(message)),
      setNavLabel: (text) => dispatch(setNavLabelAction(text))
    })
)
class EmployeeTable extends React.Component {

    state = {
        searchText: ''
    }

    componentDidMount = () => {
      this.props.setNavLabel(this.props.t('navigation.label.employee-table'));
      this.props.fetchEmployees();
    }

    changeSearchHandler = (event) => this.setState({ searchText: event.target.value });
    cancelSearchHandler = () => this.setState({ searchText: '' });

    ActionBar = () => {
      const { t } = this.props;
      return <ActionBar
          left={
              <SearchControl
                  text={this.state.searchText}
                  changed={this.changeSearchHandler}
                  canceled={this.cancelSearchHandler} />
          }
          right={
              <Link to="/manage">
                  <Button bsStyle="primary">{t('common.btn.add-employee')}</Button>
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
      const { t } = this.props;
      return <ReactTable
          data={props.employees}
          columns={[
              this.simpleRow(t('employee-table.header.name'), 'fullName'),
              this.simpleRow(t('employee-table.header.email'), 'email'),
              this.simpleRow(t('employee-table.header.groups'), 'groupsFormatted'),
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
      />;
    }

    render() {
        const filteredEmployees = this.props.employees
            .filter(employee =>
                employee.fullName.toLowerCase().includes(this.state.searchText.toLowerCase()));
        return (
            <div className="EmployeeTable">
                <this.ActionBar />
                {
                  this.props.loading
                    ? <div style={{margin:'auto',padding: '50px',fontSize:'35px'}}>Loading...</div>
                    : <this.ReactTable employees={filteredEmployees} />
                }
            </div>);
    }
}

export default EmployeeTable;
