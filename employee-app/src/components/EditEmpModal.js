import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';


export class EditEmpModal extends Component {
    constructor(props) {
        super(props)
    }


    handleSubmit(e) {
        e.preventDefault();
        fetch('https://localhost:44305/api/employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: e.target.EmployeeID.value,
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
    }
    render() {
        const { empid, empname, empdept, empdoj, empmailid, onHide } = this.props;
        return (
            <Modal  {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Employee
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeID"
                                            required
                                            readonly
                                            defaultValue={empid}
                                            placeholder="EmployeeID" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            required
                                            defaultValue={empname}
                                            placeholder="EmployeeName" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Department"
                                            required
                                            defaultValue={empdept}
                                            placeholder="Department" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>MailID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="MailID"
                                            required
                                            defaultValue={empmailid}
                                            placeholder="MailID" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>DOJ</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="DOJ"
                                            required
                                            defaultValue={empdoj}
                                            placeholder="DOJ" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Update Department</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}