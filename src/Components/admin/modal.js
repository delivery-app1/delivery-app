import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export class FormModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.closeModalFx}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Inf</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.answareOrder}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Order will bwe ready after:</Form.Label>
                                <Form.Control type="text" placeholder="done " name="done" onChange={this.props.updateTime} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>price</Form.Label>
                                <Form.Control type="text" placeholder="price" name="price" onChange={this.props.updatePrice}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                submit answare
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModalFx}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default FormModal