import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { toast } from 'react-toastify'


export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false }
    }
    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

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
    }



    render() {
        const { deps, addModalShow } = this.state;
        let addModalClose = () =>
            this.setState({ addModalShow: false });


        return (
            <>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> Department ID</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td> {dep.DepartmentID}</td>
                                <td> {dep.DepartmentName}</td>

                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button varient="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Department
                    </Button>
                    <AddDepartmentModal show={addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>

            </>
        )
    }
}

export default Department;
