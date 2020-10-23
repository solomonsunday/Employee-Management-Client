import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmployeeModal } from './AddEmployeeModal';
import { toast } from 'react-toastify'
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emps: [], addModalShow: false,
            editModalShow: false
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch("https://localhost:44305/api/employee")
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data }
                )
            })
    };

    componentDidUpdate() {
        this.refreshList();
    };


    deleteEmp(empid) {
        if (window.confirm("Are you sure you want to delete this File?")) {
            {
                fetch('https://localhost:44305/api/employee/' + empid, {
                    method: 'DELETE',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            }

        }
    };

    render() {
        const { emps, empid, empname, empdept, empdoj, empmailid, addModalShow, editModalShow } = this.state;
        let addModalClose = () =>
            this.setState({ addModalShow: false });
        let editModalClose = () =>
            this.setState({ editModalShow: false })


        return (
            <>
                <ButtonToolbar className="float-right mb-2 mt-2">
                    <Button variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee
                    </Button>
                    <AddEmployeeModal show={addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
                <Table className="mt-4 mb-5" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <td>Department</td>
                            <td>DOJ</td>
                            <td>MailID</td>
                            <td>Option</td>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td> {emp.EmployeeName}</td>
                                <td> {emp.Department}</td>
                                <td> {emp.DOJ}</td>
                                <td> {emp.MailID}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2 btn-info" onClick={() => this.setState({
                                            editModalShow: true, empid:
                                                emp.EmployeeID, empname: emp.EmployeeName, empdept: emp.Department,
                                            empdoj: emp.DOJ, empmailid: emp.MailID
                                        })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" onClick={() => this.deleteEmp(emp.EmployeeID)}
                                            variant="danger">
                                            Delete
                                        </Button>

                                        <EditEmpModal show={editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            empdept={empdept}
                                            empdoj={empdoj}
                                            empmailid={empmailid} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default Employee;
