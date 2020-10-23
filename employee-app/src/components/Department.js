import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { toast } from 'react-toastify'
import { EditDeptModal } from './EditDeptModal';



export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deps: [], addModalShow: false,
            editModalShow: false
        }
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    };

    // refreshList() {
    //     this.setState({
    //         deps: [{ "DepartmentID": 1, "DepartmentName": "IT" },
    //         { "DepartmentID": 2, "DepartmentName": "Support" }
    //         ]
    //     })
    // }

    refreshList() {
        fetch("https://localhost:44305/api/department")
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data }
                )
            })
    };


    deleteDept(depid) {
        if (window.confirm("Are you sure you want to delete this File?")) {
            {
                fetch('https://localhost:44305/api/department/' + depid, {
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
        const { deps, depid, depname, addModalShow, editModalShow } = this.state;
        let addModalClose = () =>
            this.setState({ addModalShow: false });
        let editModalClose = () =>
            this.setState({ editModalShow: false })


        return (
            <>
                <ButtonToolbar className="float-right mb-2 mt-2">
                    <Button variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Department
                    </Button>
                    <AddDepartmentModal show={addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
                <Table className="mt-4 mb-5" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> Department ID</th>
                            <th>Department Name</th>
                            <td>Option</td>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td> {dep.DepartmentID}</td>
                                <td> {dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2 btn-info" onClick={() => this.setState({
                                            editModalShow: true, depid:
                                                dep.DepartmentID, depname: dep.DepartmentName
                                        })}> Edit</Button>

                                        <Button className="mr-2" onClick={() => this.deleteDept(dep.DepartmentID)}
                                            variant="danger">
                                            Delete</Button>

                                        <EditDeptModal show={editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname} />
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                </Table>



            </>
        )
    }
};

export default Department;
