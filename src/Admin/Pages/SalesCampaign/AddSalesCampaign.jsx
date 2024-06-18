import React, { useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import Button from "../Common/Button";
import DatePicker from "../Common/DatePicker";
import { ImBackward } from "react-icons/im";
import customerHook from "../CustomerManagement/hook";
import useCampaign from "../Campaign/hook";
import { Navigate } from "react-router-dom";
import useSalesCamapaign from "./hook";

const AddSalesCampaign = () => {
  const [{ getCustomerDetails }] = customerHook();
  const [{ getCampaignData }] = useCampaign();
  const [{ AddSalesCampaign }] = useSalesCamapaign();
  const [customerDetails, setCustomersDetails] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState([]);

  const [formData, setFormData] = useState({
    TenantId: 0,
    TenantName: "gr",
    CustomerId: "",
    CustomerName: "",
    CampaignId: "",
    CampaignName: "",
    TargetSalesDate: new Date(),
    Active: true,
    Attempts: 1,
    Result: "OPEN",
    Notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, handle separately
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      // For other input types, set the value directly
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerDetails();
        setCustomersDetails(response?.data?.message);
        getCampaignData(0, 10, 0, 0).then((responseCampaign) => {
          setCampaignDetails(responseCampaign?.data?.message);
        });
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selectedCustomer = customerDetails.find(
      (customer) => customer.CustomerId === formData.CustomerId
    );
    setFormData({
      ...formData,
      CustomerName: selectedCustomer ? selectedCustomer.CustomerName : "",
    });
  }, [formData.CustomerId]);

  useEffect(() => {
    const selectedCampaign = campaignDetails.find(
      (item) => item.CampaignId.toString() === formData.CampaignId
    );
    setFormData({
      ...formData,
      CampaignName: selectedCampaign ? selectedCampaign.Title : "",
    });
  }, [formData.CampaignId]);

  const handleSubmit = () => {
    const dataToSend = {
    ...formData,
    TargetSalesDate: new Date(formData.TargetSalesDate[0]).toLocaleDateString(),
    };
    AddSalesCampaign(dataToSend)
      .then((res) => {
        if (res) {
          Navigate(-1);
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <div>
      <Card className="Card">
        <Card.Body>
          <h2 className="CardHeader">
            <ImBackward
              className="h-4"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              onClick={() => window.history.back()}
            />
            Create Sales Campaign
          </h2>
          <hr />
          <Form className="Form mt-3">
            <div className="row">
              <div className="col-md-6">
                <Form.Group as={Col} controlId="formRole" className="FormGroup">
                  <Form.Label className="FormLabel">Customer Name</Form.Label>
                  <Form.Select
                    name="CustomerId"
                    value={formData.CustomerId}
                    onChange={handleInputChange}
                    className="FormControl"
                  >
                    {customerDetails.map((customer) => (
                      <option
                        key={customer.CustomerId}
                        value={customer.CustomerId}
                      >
                        {customer.CustomerName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group as={Col} controlId="formRole" className="FormGroup">
                  <Form.Label className="FormLabel">Campaign Type</Form.Label>
                  <Form.Select
                    name="CampaignId"
                    value={formData.CampaignId}
                    onChange={handleInputChange}
                    className="FormControl"
                  >
                    {campaignDetails.map((item) => (
                      <option key={item.CampaignId} value={item.CampaignId}>
                        {item.Title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="TargetSalesDate">
                  <Form.Label>Target Sales Date</Form.Label>
                  <DatePicker
                    selected={formData.TargetSalesDate}
                    onChange={(date) =>
                      setFormData({ ...formData, TargetSalesDate: date })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="Active">
                  <Form.Label>Active</Form.Label>
                  <Form.Select
                    name="Active"
                    value={formData.Active}
                    onChange={handleInputChange}
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="Attempts">
                  <Form.Label>Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of attempts"
                    name="Attempts"
                    value={formData.Attempts}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="Result">
                  <Form.Label>Result</Form.Label>
                  <Form.Select
                    name="Result"
                    value={formData.Result}
                    onChange={handleInputChange}
                  >
                    <option value="OPEN">Open</option>
                    <option value="CLOSE">Close</option>
                    <option value="IN_PROGRESS">In Progress</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Form.Group controlId="Notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter notes"
                    name="Notes"
                    value={formData.Notes}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-end gap-3">
                <Button
                  variant="primary"
                  className="px-5"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="px-5 px-sm-15"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddSalesCampaign;
