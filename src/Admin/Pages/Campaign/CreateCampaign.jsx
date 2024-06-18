import React, { useEffect, useState } from "react";
import { Card, Container, Form, Button, Col, Row } from "react-bootstrap";
import DatePicker from "../Common/DatePicker";
import ReactSelect from "../Common/ReactSelect";
import { ImBackward } from "react-icons/im";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useCampaign from "./hook";

const CreateCampaign = () => {
  const [{ addCampaign }] = useCampaign();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    CampaignType: "",
    StartDate: null,
    EndDate: null,
    DiscountPercentage: "",
    MultipleProducts: false,
    Products: [],
    MinimumTurnOver: 0,
    Active: true,
  });

  const productsOptions = [
    {
      value: "Ordinary Portland Cement (OPC)",
      label: "Ordinary Portland Cement (OPC)",
    },
    {
      value: "Ready Mixed Concrete (RMC)",
      label: "Ready Mixed Concrete (RMC)",
    },
    { value: "Blended cements", label: "Blended cements" },
    { value: "ACC ECOMaxX PLUS", label: "ACC ECOMaxX PLUS" },
    { value: "ACC ECOMaxX PRO", label: "ACC ECOMaxX PRO" },
    { value: "ACC ECOMaxX ZERO", label: "ACC ECOMaxX ZERO" },
  ];

  const campaignTypeOptions = [
    { value: "Seasonal/Holiday", label: "Seasonal/Holiday" },
    { value: "Sales Promotion", label: "Sales Promotion" },
    { value: "Content Marketing", label: "Content Marketing" },
    { value: "Social Media", label: "Social Media" },
    { value: "Cause-Related Marketing", label: "Cause-Related Marketing" },
    { value: "Product Launch", label: "Product Launch" },
    { value: "Customer Loyalty", label: "Customer Loyalty" },
  ];

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

  const handleSubmit = () => {
    console.log(formData, "FormData");
    const dateParts = new Date(formData.StartDate)
      .toLocaleDateString()
      .split("/");
    const reversedStartDateFormat = `${dateParts[2]}-${dateParts[1].padStart(
      2,
      "0"
    )}-${dateParts[0].padStart(2, "0")}`;
    const dateEndParts = new Date(formData.EndDate)
      .toLocaleDateString()
      .split("/");
    const reversedEndDateFormat = `${
      dateEndParts[2]
    }-${dateEndParts[1].padStart(2, "0")}-${dateEndParts[0].padStart(2, "0")}`;
    const dataToSend = {
      TenantId: 0,
      Title: formData.Title,
      Description: formData.Description,
      CampaignType: formData.CampaignType,
      StartDate: reversedStartDateFormat,
      EndDate: reversedEndDateFormat,
      DiscountPercentage: formData.DiscountPercentage,
      MultipleProducts: formData.MultipleProducts,
      Products: formData.Products,
      Applicability: {
        MinimumTurnOver: formData.MinimumTurnOver,
      },
      Active: formData.Active,
    };
    addCampaign(dataToSend)
      .then((response) => {
        if (response?.data?.status === "Success") {
          // navigate(-1);
        }
      })
      .catch((err) => {
        toast.error("Error adding Campaign");
      });
  };

  useEffect(() => {
    if (location?.state?.view) {
      setFormData({
        Title: location?.state?.data?.Title,
        Description: location?.state?.data?.Description,
        CampaignType: location?.state?.data?.CampaignType,
        StartDate: new Date(
          location?.state?.data?.StartDate
        ).toLocaleDateString(),
        EndDate: new Date(location?.state?.data?.EndDate).toLocaleDateString(),
        DiscountPercentage: location?.state?.data?.DiscountPercentage,
        MultipleProducts: location?.state?.data?.MultipleProducts,
        Products: [location?.state?.data?.Products],
        MinimumTurnOver: location?.state?.data?.Applicability?.MinmumTurnOver,
        Active: location?.state?.data?.Active,
      });
    }
  }, [location?.state?.view, location?.state?.data]);

  return (
    <div>
      <Container>
        <Card className="Card">
          <Card.Body>
            <h2 className="CardHeader">
              <ImBackward
                className="h-4"
                style={{ marginRight: "10px", marginBottom: "5px" }}
                onClick={() => window.history.back()}
              />
              Create Campaign
            </h2>
            <hr />
            <Form className="Form mt-3">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="Title">
                    <Form.Label>Campaign Name</Form.Label>
                    <Form.Control
                      name="Title"
                      value={formData.Title}
                      onChange={handleInputChange}
                      disabled={location?.state?.view}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="CampaignType">
                    <Form.Label>Campaign Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.CampaignType} // Change defaultValue to value
                      name="CampaignType"
                      onChange={handleInputChange}
                      className="FormControl"
                      disabled={location?.state?.view}>
                      {campaignTypeOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      name="Description"
                      value={formData.Description}
                      onChange={handleInputChange}
                      disabled={location?.state?.view}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="StartDate">
                    <Form.Label>Start Date</Form.Label>
                    {location?.state?.view ? (
                      <Form.Control
                        name="Title"
                        value={formData.StartDate}
                        disabled
                      />
                    ) : (
                      <DatePicker
                        label="Start Date"
                        selected={formData.StartDate}
                        onChange={(date) =>
                          setFormData({ ...formData, StartDate: date })
                        }
                        disabled={location?.state?.view}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="EndDate">
                    <Form.Label>End Date</Form.Label>
                    {location?.state?.view ? (
                      <Form.Control
                        name="Title"
                        value={formData.EndDate}
                        disabled
                      />
                    ) : (
                      <DatePicker
                        label="End Date"
                        selected={formData.EndDate}
                        onChange={(date) =>
                          setFormData({ ...formData, EndDate: date })
                        }
                        disabled={location?.state?.view}
                      />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="discountPercentage">
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Discount Percentage (%)"
                      name="DiscountPercentage"
                      value={formData.DiscountPercentage}
                      onChange={handleInputChange}
                      disabled={location?.state?.view}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="MultipleProducts">
                    <Form.Label>Multiple Products</Form.Label>
                    <Form.Select
                      name="MultipleProducts"
                      value={formData.MultipleProducts}
                      onChange={handleInputChange}
                      disabled={location?.state?.view}>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="Products">
                    <Form.Label>Products</Form.Label>
                    {location?.state?.view ? (
                      <Form.Control
                        name="Title"
                        value={formData.Products}
                        disabled={location?.state?.view}
                      />
                    ) : (
                      <ReactSelect
                        disabled={location?.state?.view}
                        isMulti
                        placeholder="Products"
                        value={productsOptions.filter((option) =>
                          formData.Products.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                          setFormData({
                            ...formData,
                            Products: selectedOptions.map(
                              (option) => option.value
                            ),
                          })
                        }
                        options={productsOptions}
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="MinimumTurnOver">
                    <Form.Label>Minimum Turn Over</Form.Label>
                    <Form.Control
                      type="number"
                      name="MinimumTurnOver"
                      value={formData.MinimumTurnOver}
                      onChange={handleInputChange}
                      disabled={location?.state?.view}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="Status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={formData.Active}
                      name="Active"
                      onChange={handleInputChange}
                      disabled={location?.state?.view}>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12} className="d-flex justify-content-end gap-3">
                  <Button
                    variant="danger"
                    className="px-5"
                    onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="px-5 px-sm-15"
                    type="button"
                    onClick={handleSubmit}
                    disabled={location?.state?.view}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CreateCampaign;
