import React, { useContext, useEffect, useState } from "react";
import { ImBackward } from "react-icons/im";
import { Card, Form, Row, Col, Button, FormControl } from "react-bootstrap";
import Select from "react-select";
import useSales from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import customerHook from "../CustomerManagement/hook";
// import { ToastContext } from "../../AppProviders/Component/Toast";

const AddSales = () => {
  const [{ getCustomerDetails }] = customerHook();
  const [{ addSales, getSales, updateSales }] = useSales();
  const [customerDetails, setCustomersDetails] = useState([]);
  const navigate = useNavigate();
  const { custId } = useParams();
  const location = useLocation();
  // const showToast = useContext(ToastContext);
  const [formData, setFormData] = useState({
    CustomerName: "",
    ProductName: "",
    Quantity: "",
    UnitPrice: "",
    orderId: "",
    date: new Date().toISOString().substr(0, 10),
    TotalPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addSales(formData)
      .then((res) => {
        if (res) {
          navigate(-1);
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  const handleEnterpriceChange = (selectedOption) => {
    // Update formData with the selected option's value
    setFormData({
      ...formData,

      CustomerName: selectedOption.label,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCustomerDetails();
        setCustomersDetails(
          response?.data?.message.map((customer) => ({
            ...customer,
            label: customer.CustomerName, 
          }))
        );
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getSales(0, 10, 0, 0, custId).then((response) => {
      if (response?.data?.message && response.data.message.length > 0) {
        const firstSalesData = response.data.message[0];
        setFormData({
          CustomerName: firstSalesData.CustomerName || "",
          ProductName: firstSalesData.Product || "",
          Quantity: firstSalesData.Quantity || "",
          UnitPrice: firstSalesData.UnitPrice || "",
          orderId: firstSalesData.OrderId || "",
          date: firstSalesData.SalesDate?.split("T")[0] || "",

          TotalPrice: firstSalesData.TotalPrice || "",
        });
      }
    });
  }, [location?.state?.Edit, location?.state?.View]);
  const handleUpdate = () => {
    const dataToSend = {
      TenantId: 0,
      CustomerName: formData.CustomerName,
      Product: formData.ProductName,
      Quantity: formData.Quantity,
      UnitPrice: formData.UnitPrice,
      TotalPrice: formData.TotalPrice,
      OrderId: formData.orderId,
      SalesDate: formData.date,
    };
    updateSales(custId, dataToSend)
      .then((res) => {
        if (res) {
          navigate(-1);
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <Card className="Card">
      <Card.Body>
        <h2 className="CardHeader">
          <ImBackward
            className="h-4"
            style={{ marginRight: "10px", marginBottom: "5px" }}
            onClick={() => window.history.back()}
          />
          {location?.state?.View
            ? "View Sale Details"
            : location?.state?.Edit
            ? "Update Sale Report"
            : "Add Sale Details"}
        </h2>

        <hr />
        <Form className="Form mt-3">
          <Row className="Row">
            <Col sm={6} md={6}>
              <Form.Group controlId="customerName">
                <Form.Label>
                  Enterprise Name <span className="text-danger">*</span>
                </Form.Label>
                <Select
                  options={customerDetails}
                  value={customerDetails.find(
                    (customer) =>
                      customer.CustomerName === formData.CustomerName
                  )}
                  name="CustomerName"
                  onChange={handleEnterpriceChange}
                  isSearchable
                  placeholder="Search enterprise name"
                  isDisabled={location?.state?.View} // Corrected isDisabled prop here
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={6}>
              <Form.Group controlId="productName">
                <Form.Label>
                  Product Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={formData.ProductName}
                  onChange={handleChange}
                  disabled={location?.state?.View} // Corrected disabled prop here
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="Row">
            <Col sm={6} md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>
                  Quantity <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleChange}
                  disabled={location?.state?.View} // Corrected disabled prop here
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={6}>
              <Form.Group controlId="unitPrice">
                <Form.Label>
                  Unit Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="UnitPrice"
                  value={formData.UnitPrice}
                  onChange={handleChange}
                  disabled={location?.state?.View} // Corrected disabled prop here
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="Row">
            <Col sm={6} md={6}>
              <Form.Group controlId="totalPrice">
                <Form.Label>
                  Total Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="TotalPrice"
                  value={formData.TotalPrice}
                  onChange={handleChange}
                  disabled={location?.state?.View} // Corrected disabled prop here
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={6}>
              <Form.Group controlId="orderId">
                <Form.Label>
                  Order ID <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  disabled={location?.state?.View} // Corrected disabled prop here
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6}>
              <Form.Label>
                Date <span className="text-danger">*</span>
              </Form.Label>
              <FormControl
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                label="Date"
                controlId="date"
                disabled={location?.state?.View} // Corrected disabled prop here
              />
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
                <Button variant="primary" type="button" onClick={handleUpdate}>
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddSales;
