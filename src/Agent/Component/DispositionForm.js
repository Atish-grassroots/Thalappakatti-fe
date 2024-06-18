import React from 'react';
import { Card, CardHeader, CardBody, Button, Form } from 'react-bootstrap';

const DispositionForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <Card>
            <CardHeader className="fw-bold " style={{ backgroundColor: "rgb(245 245 244)" }}>Interaction Details</CardHeader>
            <CardBody style={{ height: "65vh", overflowY: "auto" }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label className="form-label">Interaction Type</label>
                        <Form.Control as="select" name="TicketType" value={formData.TicketType} onChange={handleChange}>
                            <option value="">Select Outcome</option>
                            <option value="Order">Order</option>
                            <option value="Contact Later">Contact Later</option>
                            <option value="Not Interested">Not Interested</option>
                        </Form.Control>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Subject"
                            value={formData.Subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Interaction Description</label>
                        <textarea
                            className="form-control"
                            name="TicketDescription"
                            value={formData.TicketDescription}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Interaction Status</label>
                        <Form.Control as="select" name="TicketStatus" value={formData.TicketStatus} onChange={handleChange}>
                            <option value="">Select Ticket Status</option>
                            <option value="Open">Open</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Closed">Closed</option>
                        </Form.Control>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="DueDate"
                            value={formData.DueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-center fw-bold">
                        <Button type="submit" variant="primary">Submit</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default DispositionForm;