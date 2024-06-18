import React, { useEffect, useState } from "react";
import * as RB from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImBackward } from "react-icons/im";
import ticketManagementHook from "./hook";

const TicketManagementForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ addTicketDetails }] = ticketManagementHook();
  const [customerData, setCustomerData] = useState({
    TenantId: 1,
    TicketType: "",
    TicketSource: "",
    Subject: "",
    TicketDescription: "",
    Priority: "",
    Severity: "",
    Category: "",
    SubCategory: "",
    Owner: "",
    AssignedTo: "",
    TicketStatus: "",
    DueDate: "",
    Process: "Adani",
    Team: "Adani",
    Escalated: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTicketDetails = (e) => {
    e.preventDefault();
    const dataToSend = {
      TenantId: 0,
      TicketType: customerData.TicketType,
      TicketSource: customerData.TicketSource,
      Subject: customerData.Subject,
      TicketDescription: {},
      Updates: [customerData.Updates],
      Priority: customerData.Priority,
      Severity: customerData.Severity,
      Category: [customerData.Category],
      SubCategory: [customerData.SubCategory],
      Owner: customerData.Owner,
      AssignedTo: customerData.AssignedTo,
      TicketStatus: customerData.TicketStatus,
      DueDate: customerData.DueDate,
      Process: customerData.Process,
      Team: customerData.Team,
      Escalated: customerData.Escalated,
    };

    addTicketDetails(dataToSend)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Ticket created successfully");
          navigate(-1);
        }
      })
      .catch((err) => {
        toast.error("Error creating ticket");
      });
  };

  useEffect(() => {
    if (location?.state?.data) {
      console.log(location?.state?.data);
      setCustomerData({
        TenantId: 1,
        TicketType: location?.state?.data?.TicketType || "",
        TicketSource: location?.state?.data?.TicketSource || "",
        Subject: location?.state?.data?.Subject || "",
        TicketDescription: location?.state?.data?.TicketDescription?.text || "",
        Priority: location?.state?.data?.Priority || "",
        Severity: location?.state?.data?.Severity || "",
        Category: location?.state?.data?.Category || "",
        SubCategory: location?.state?.data?.SubCategory || "",
        Owner: location?.state?.data?.Owner || "",
        AssignedTo: location?.state?.data?.AssignedTo || "",
        TicketStatus: location?.state?.data?.TicketStatus || "",
        DueDate: location?.state?.data?.DueDate || "",
        Process: location?.state?.data?.Process || "",
        Team: location?.state?.data?.Team || "",
        Escalated: location?.state?.data?.Escalated || "",
      });
    }
  }, []);
  return (
    <>
      <RB.Container style={{ fontSize: "1rem" }}>
        <RB.Card className="p-3">
          <h2 className="CardHeader">
            <ImBackward
              className="h-4"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              onClick={() => navigate(-1)}
            />
            Ticket Form
          </h2>
          <hr />
          <RB.Form>
            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicTicketType">
                  <RB.Form.Label>Ticket Type</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="TicketType"
                    value={customerData.TicketType}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicTicketSource">
                  <RB.Form.Label>Ticket Source</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="TicketSource"
                    value={customerData.TicketSource}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicSubject">
                  <RB.Form.Label>Subject</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="Subject"
                    value={customerData.Subject}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicTicketDescription">
                  <RB.Form.Label>Updates</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="TicketDescription"
                    value={customerData.Updates}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicPriority">
                  <RB.Form.Label>Priority</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="Priority"
                    value={customerData.Priority}
                    onChange={handleChange}
                    required
                    disabled>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicSeverity">
                  <RB.Form.Label>Severity</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="Severity"
                    value={customerData.Severity}
                    onChange={handleChange}
                    required
                    disabled>
                    <option value="">Select Severity</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicCategory">
                  <RB.Form.Label>Category</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="Category"
                    value={customerData.Category}
                    onChange={handleChange}
                    required
                    disabled>
                    <option value="">Select Category</option>
                    <option value="Product">Product</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Billing">Billing</option>
                    <option value="Sales">Sales</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicSubCategory">
                  <RB.Form.Label>SubCategory</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="SubCategory"
                    value={customerData.SubCategory}
                    onChange={handleChange}
                    required
                    disabled>
                    {/* <option value="">Select SubCategory</option> */}
                    {customerData.Category === "Product" && (
                      <>
                        <option value="Package Problem">Package Problem</option>
                        <option value="Expired">Expired</option>
                        <option value="Quantity">Quantity</option>
                      </>
                    )}
                    {customerData.Category === "Logistics" && (
                      <>
                        <option value="Delayed">Delivery</option>
                        <option value="Not Traceable">Not Traceable</option>
                      </>
                    )}
                    {customerData.Category === "Billing" && (
                      <>
                        <option value="Excess">Excess</option>
                        <option value="GST">GST</option>
                      </>
                    )}
                    {customerData.Category === "Sales" && (
                      <>
                        <option value="New Order">Enquiry</option>
                        <option value="New Order">New Order</option>
                        <option value="Order Modification">
                          Order Modification
                        </option>
                      </>
                    )}
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicOwner">
                  <RB.Form.Label>Owner</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="Owner"
                    value={customerData.Owner}
                    onChange={handleChange}
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicAssignedTo">
                  <RB.Form.Label>Assigned To</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="AssignedTo"
                    value={customerData.AssignedTo}
                    onChange={handleChange}
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicTicketStatus">
                  <RB.Form.Label>Ticket Status</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="TicketStatus"
                    value={customerData.TicketStatus}
                    onChange={handleChange}
                    disabled>
                    {/* <option value="">Select Ticket Status</option> */}
                    <option value="Open">Open</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Closed">Closed</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>

              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicDueDate">
                  <RB.Form.Label>Due Date</RB.Form.Label>
                  <RB.Form.Control
                    type="date"
                    name="DueDate"
                    value={customerData.DueDate}
                    onChange={handleChange}
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicProcess">
                  <RB.Form.Label>Process</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="Process"
                    value={customerData.Process}
                    onChange={handleChange}
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicTeam">
                  <RB.Form.Label>Team</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    name="Team"
                    value={customerData.Team}
                    onChange={handleChange}
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicEscalated">
                  <RB.Form.Label>Escalated</RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    name="Escalated"
                    value={customerData.Escalated ? "true" : "false"}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        Escalated: e.target.value === "true",
                      })
                    }
                    disabled>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>
            <RB.Row className="mb-3">
              <RB.Col md={12}>
                <RB.Form.Group controlId="formBasicTicketDescription">
                  <RB.Form.Label>Description</RB.Form.Label>
                  <RB.Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    name="TicketDescription"
                    value={customerData.TicketDescription}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            {/* <RB.Row className="flex justify-content-end gap-2">
              <RB.Col xs={12} className="gy-6">
                <div className="d-flex justify-content-end gap-3">
                  <RB.Button
                    variant="primary"
                    className="px-5 px-sm-15"
                    onClick={(e) => handleAddTicketDetails(e)}>
                    Create Ticket
                  </RB.Button>
                </div>
              </RB.Col>
            </RB.Row> */}
          </RB.Form>
        </RB.Card>
      </RB.Container>
      <ToastContainer />
    </>
  );
};

export default TicketManagementForm;
