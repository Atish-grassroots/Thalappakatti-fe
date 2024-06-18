import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { ImBackward } from 'react-icons/im'
import DatePicker from '../Common/DatePicker'
import ReactSelect from '../Common/ReactSelect'

const EditAssign = () => {
  return (
    <div>
    <Card className="Card">
      {/* Breadcrumb */}
   
      <Card.Body>
        <h2 className="CardHeader">
          <ImBackward
            className="h-4"
            style={{ marginRight: "10px", marginBottom: "5px" }}
            onClick={() => window.history.back()}
          />
          Assign Campaign
        </h2>
        <hr />
        <Form className="Form mt-3">
          <Row className="Row">
            <Col xs={12} xl={12}>
              <Row className="g-3 mb-6">
       
               
                {/* Default Task View */}
                <Col sm={6} md={4}>
                  <Form.Group controlId="defaultTaskView">
                    <Form.Label>Campaign Type</Form.Label>
                    <Form.Select>
                      <option value="technical">Technical</option>
                      <option value="external">External</option>
                      <option value="organizational">Organizational</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                {/* Start Date */}
                <Col sm={6} md={4}>
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker label="Start Date" controlId="startDate" />
                </Col>
                {/* End Date */}
                <Col sm={6} md={4}>
                  <Form.Label>End Date</Form.Label>
                  <DatePicker label="End Date" controlId="endDate" />
                </Col>
            
                {/* Multiple Products */}
                <Col sm={6} md={4}>
                  <Form.Group controlId="multipleProducts">
                    <Form.Check type="switch" label="Multiple Products" />
                  </Form.Group>
                </Col>
               
                {/* Buttons */}
                <Col xs={12} className="gy-6">
                  <div className="d-flex justify-content-end gap-3">
                    <Button variant="phoenix-primary" className="px-5">
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="px-5 px-sm-15"
                      type="submit"
                    >
                      Assign Campaign
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  </div>
  )
}

export default EditAssign