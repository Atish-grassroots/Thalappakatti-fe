import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, FormControl } from "react-bootstrap";
import { ImBackward } from "react-icons/im";
import useLoyalty from "./hook";
import customerHook from "../CustomerManagement/hook";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";

const LoyaltyForm = () => {
  const [{ addLoyalty, getLoyaltyById }] = useLoyalty();
  const { cId } = useParams();
  const location = useLocation();
  const [{ getCustomerDetails }] = customerHook();
  const [customerDetails, setCustomersDetails] = useState([]);

  const loyaltyTypes = [
    { id: 1, name: "Gold" },
    { id: 2, name: "Silver" },
    { id: 3, name: "Bronze" },
  ];

  const [formData, setFormData] = useState({
    TenantId: 0,
    TenantName: "gr",
    CustomerId: "",
    CustomerName: "",
    LoyaltyType: "",
    LoyaltyStartDate: new Date().toISOString().substr(0, 10),
    Points: "",

  });

  const handleChange = (e, selectedOption) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEnterpriceChange = (selectedOption) => {
    // Update formData with the selected option's value
    setFormData({
      ...formData,
      CustomerId: selectedOption.value,
      CustomerName: selectedOption.label,
    });
  };

  useEffect(() => {
    const selectedCustomer = customerDetails.find(
      (customer) => customer.CustomerId === formData.CustomerId
    );
    setFormData({
      ...formData,
      CustomerName: selectedCustomer ? selectedCustomer.CustomerName : "",
    });
  }, [formData.CustomerId]);

  // Get Sales
  useEffect(() => {
    getLoyaltyById(0, 10, 0, 0, cId)
      .then((response) => {
        if (response?.data?.message && response.data.message.length > 0) {
          const firstSalesData = response.data.message[0];
          setFormData({
            TenantName: firstSalesData.TenantName,
            CustomerId: firstSalesData.CustomerId,
            CustomerName: firstSalesData.CustomerName,
            LoyaltyType: firstSalesData.LoyaltyType,
            LoyaltyStartDate:
              firstSalesData.LoyaltyStartDate?.split("T")[0] || "",
            Points: firstSalesData.Points,
      
          });
        }
      })
      .catch((error) => {
        // Handle error, maybe set some state indicating error
        console.error("Error fetching user data:", error);
      });
  }, [location?.state?.View ,location?.state?.Edit]);

  const handleSubmit = async () => {
    console.log(formData);
    addLoyalty(formData)
      .then((res) => {
        if (res) {
          window.history.back();
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerDetails();
        setCustomersDetails(
          response?.data?.message.map((customer) => ({
            ...customer,
            label: customer.CustomerName, // Add label property for Select
            value: customer.CustomerId, // Add value property for Select
          }))
        );
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="p-4">
      <h2 className="CardHeader">
        <ImBackward
          className="h-4"
          style={{ marginRight: "10px", marginBottom: "5px" }}
          onClick={() => window.history.back()}
        />
        {location?.state?.View
          ? "View Loyalty Details"
          : location?.state?.Edit
          ? "Update Loyalty Details"
          : "Add Loyalty Details"}
      </h2>
      <hr />
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Enterprise Name</Form.Label>
            <Select
              options={customerDetails}
              value={customerDetails.find(
                (customer) => customer.CustomerId === formData.CustomerId
              )}
              name="CustomerId"
              onChange={handleEnterpriceChange}
              isSearchable
              placeholder="Search enterprise name"
              isDisabled={location?.state?.View||location?.state?.Edit} // Corrected isDisabled prop here
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formLoyaltyType"
            className="FormGroup"
          >
            <Form.Label className="FormLabel">Loyalty Type</Form.Label>
            <Form.Select
              name="LoyaltyType"
              value={formData.LoyaltyType}
              onChange={handleChange}
              className="FormControl"
              disabled={location?.state?.View||location?.state?.Edit} // Corrected disabled prop here
            >
              {loyaltyTypes.map((loyalty) => (
                <option key={loyalty.id} value={loyalty.name}>
                  {loyalty.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="date" className="FormGroup">
            <Form.Label className="FormLabel">Start Date</Form.Label>
            <FormControl
              type="date"
              name="LoyaltyStartDate"
              value={formData.LoyaltyStartDate}
              onChange={handleChange}
              label=" Date"
              disabled={location?.state?.View||location?.state?.Edit} // Corrected disabled prop here
            />
          </Form.Group>
          <Col sm={6} md={6}>
            <Form.Group as={Col} controlId="points" className="FormGroup">
              <Form.Label className="FormLabel">Points</Form.Label>
              <Form.Control
                type="number"
                name="Points"
                value={formData.Points}
                onChange={handleChange}
                disabled={location?.state?.View} // Corrected disabled prop here
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end gap-2">
            {(location?.state?.Add || location?.state?.Edit) && (
              <Button
                variant="primary"
                type="button"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
            )}
            {location?.state?.View && (
              <Button
                variant="primary"
                type="button"
                onClick={() => window.history.back()}
              >
                Close
              </Button>
            )}
            {location?.state?.Add && (
              <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            )}
            {location?.state?.Edit && (
              <Button variant="primary" type="button">
                Update
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LoyaltyForm;
