import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'



export class EditDeptModal extends Component {
    constructor(props) {
        super(props)
    }


    handleSubmit(e) {
        e.preventDefault();
        // alert(e.target.DepartmentName.value)
        fetch("https://localhost:44305/api/department", {

            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: e.target.DepartmentID.value,
                DepartmentName: e.target.DepartmentName.value
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
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Department
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label> Department ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentID"
                                            required
                                            disabled
                                            defaultValue={this.props.depid}
                                            placeholder="Department ID"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label> Department Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentName"
                                            required
                                            defaultValue={this.props.depname}
                                            placeholder="Department Name"
                                        />
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
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}