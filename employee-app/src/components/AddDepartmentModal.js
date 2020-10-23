import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'



export class AddDepartmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        // alert(e.target.DepartmentName.value)
        fetch("https://localhost:44305/api/department", {

            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: null,
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
                        Add Department
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label> Department Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="DepartmentName"
                                            placeholder="Department Name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">Add Department</Button>
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


