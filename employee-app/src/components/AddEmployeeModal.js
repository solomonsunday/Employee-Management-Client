import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'



export class AddEmployeeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            deps: [],
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     fetch('https://localhost:44305/api/department')
    //         .then(response => response.json()
    //             .then(data => {
    //                 this.setState({ deps: data });
    //             }));
    // }


    handleSubmit(e) {
        e.preventDefault();
        // alert(e.target.DepartmentName.value)
        fetch("https://localhost:44305/api/employee", {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: null,
                EmployeeName: e.target.EmployeeName.value,
                Department: e.target.Department.value,
                MailID: e.target.MailID.value,
                DOJ: e.target.DOJ.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                toast.success(result)
            },
                (error) => {
                    toast.error("Failed to Add")
                }
            )
        console.log("data")
        // this.setState(this.addModalShow = false)
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employee
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            placeholder="Employee Name"
                                        />
                                        {/* <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.DepartmentID} >
                                                    {dep.DepartmentName}
                                                </option>)}

                                        </Form.Control> */}
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Department"
                                            placeholder="Department"
                                        />
                                        <Form.Label>MailID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="MailID"
                                            placeholder="MailID"
                                        />
                                        <Form.Label>DOJ</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            placeholder="DOJ"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Add Employee</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}



