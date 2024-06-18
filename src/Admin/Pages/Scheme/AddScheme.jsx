import React, { useState } from "react";
import Button from "../Common/Button";
import DatePicker from "../Common/DatePicker";
import ReactSelect from "../Common/ReactSelect";
import {
  Card,
  Col,
  FloatingLabel,
  Form,
  Row,
  ToastContainer,
} from "react-bootstrap";
import BreadCrumb from "./BreadCrumb";
import states from "./states.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import schemeHook from "./hook";

const AddScheme = () => {
  const navigate = useNavigate();
  const [{ addOfferDetails }] = schemeHook();

  // Separate state hooks for start date and end date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [schemes, setSchemes] = useState({
    TenantId: 0,
    Title: "",
    Description: "",
    DiscountPercentage: 0,
    MultipleProducts: false,
    Products: [],
    States: [],
    UsageCount: 0,
    Status: true,
    MinimumTurnOver: 0,
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

  const handleAddSchemeDetails = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!schemes.Title || !schemes.Description || !startDate || !endDate) {
      toast.error("Please fill out all required fields");
      return;
    }

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const dataToSend = {
      TenantId: 0,
      Title: schemes.Title,
      Description: schemes.Description,
      OStartDate: formattedStartDate,
      OEndDate: formattedEndDate,
      DiscountPercentage: parseInt(schemes.DiscountPercentage, 10),
      MultipleProducts: schemes.MultipleProducts,
      Products: schemes.Products,
      Applicability: {
        MinimumTurnOver: parseFloat(schemes.MinimumTurnOver),
        States: schemes.States,
      },
      UsageCount: parseInt(schemes.UsageCount, 10),
      Active: schemes.Status === true,
    };

    console.log("Data to send:", dataToSend); // Check the data to send

    addOfferDetails(dataToSend)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Scheme added successfully");
          navigate("/scheme/viewscheme");
        }
      })
      .catch((err) => {
        toast.error("Error adding Scheme");
      });
  };

  
  return (
    <>
      <BreadCrumb />
      <Card className="p-4">
        <div>
          <h2 className="mb-4">Scheme / Offer Details</h2>
          <Form onSubmit={handleAddSchemeDetails}>
            <Row>
              <Col xs={12} xl={12}>
                <Row className="g-3 mb-6">
                  <Col sm={6} md={8}>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Scheme title">
                      <Form.Control
                        type="text"
                        placeholder="Scheme title"
                        value={schemes.Title}
                        onChange={(e) =>
                          setSchemes({ ...schemes, Title: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={6} md={4}>
                    <FloatingLabel
                      controlId="floatingSelectTask"
                      label="Multiple Products">
                      <Form.Select
                        value={schemes.MultipleProducts.toString()}
                        onChange={(e) =>
                          setSchemes({
                            ...schemes,
                            MultipleProducts: e.target.value === "true",
                          })
                        }>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col sm={6} md={4}>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Minimum Turnover">
                      <Form.Control
                        type="number"
                        placeholder="Minimum Turnover"
                        value={schemes.MinimumTurnOver}
                        onChange={(e) =>
                          setSchemes({
                            ...schemes,
                            MinimumTurnOver: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={6} md={4}>
                    <DatePicker
                      render={(_, ref) => {
                        return (
                          <Form.Floating>
                            <Form.Control
                              type="date"
                              placeholder="Start Date"
                              ref={ref}
                              id="startDate"
                              value={new Date(startDate) || ""}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                            <label htmlFor="startDate" className="ps-6">
                              Start Date
                            </label>
                          </Form.Floating>
                        );
                      }}
                    />
                  </Col>
                  <Col sm={6} md={4}>
                    <DatePicker
                      render={(_, ref) => {
                        return (
                          <Form.Floating>
                            <Form.Control
                              type="date"
                              placeholder="End Date"
                              ref={ref}
                              id="endDate"
                              value={new Date(endDate) || ""}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                            <label htmlFor="endDate" className="ps-6">
                              End Date
                            </label>
                          </Form.Floating>
                        );
                      }}
                    />
                  </Col>

                  <Col md={4} className="gy-6">
                    <FloatingLabel
                      controlId="floatingSelectClient"
                      label="Discount Percentage">
                      <Form.Select
                        value={schemes.DiscountPercentage.toString()}
                        onChange={(e) =>
                          setSchemes({
                            ...schemes,
                            DiscountPercentage: e.target.value,
                          })
                        }>
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="gy-6">
                    <FloatingLabel
                      controlId="floatingInputBudget"
                      label="Usage Count">
                      <Form.Control
                        type="number"
                        placeholder="Usage Count"
                        value={schemes.UsageCount}
                        onChange={(e) =>
                          setSchemes({ ...schemes, UsageCount: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={4} className="gy-6">
                    <FloatingLabel
                      controlId="floatingSelectTask"
                      label="Active">
                      <Form.Select
                        value={schemes.Status.toString()}
                        onChange={(e) =>
                          setSchemes({
                            ...schemes,
                            Status: e.target.value === "true",
                          })
                        }>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} className="gy-6">
                    <FloatingLabel
                      controlId="floatingSchemeOverview"
                      label="Description">
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                        value={schemes.Description}
                        onChange={(e) =>
                          setSchemes({
                            ...schemes,
                            Description: e.target.value,
                          })
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={6} className="gy-6">
                    <ReactSelect
                      isMulti
                      placeholder="States"
                      options={states?.states?.map((state) => ({
                        label: state,
                        value: state,
                      }))}
                      value={schemes.States.map((state) => ({
                        label: state,
                        value: state,
                      }))}
                      onChange={(selectedOptions) =>
                        setSchemes({
                          ...schemes,
                          States: selectedOptions.map((option) => option.value),
                        })
                      }
                      classNames={{
                        control: () => "py-3",
                        valueContainer: () => "lh-1",
                      }}
                    />
                  </Col>
                  <Col xs={6} className="gy-6">
                    <ReactSelect
                      isMulti
                      placeholder="Products"
                      value={schemes.Products.map((product) => ({
                        label: product,
                        value: product,
                      }))}
                      onChange={(selectedOptions) =>
                        setSchemes({
                          ...schemes,
                          Products: selectedOptions.map(
                            (option) => option.value
                          ),
                        })
                      }
                      options={productsOptions}
                      classNames={{
                        control: () => "py-3",
                        valueContainer: () => "lh-1",
                      }}
                    />
                  </Col>
                  <Col xs={12} className="gy-6">
                    <div className="d-flex justify-content-end gap-3">
                      <Button
                        variant="danger"
                        className="px-5"
                        onClick={() => navigate(-1)}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        className="px-5 px-sm-15"
                        type="submit">
                        Create Scheme
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default AddScheme;
