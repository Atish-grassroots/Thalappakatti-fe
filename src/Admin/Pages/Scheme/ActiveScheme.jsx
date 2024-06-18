import React, { useEffect, useState, useCallback } from "react";
import BreadCrumb from "./BreadCrumb";
import { Button, Form, Modal } from "react-bootstrap";
import schemeHook from "./hook";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./schemes.css"; 
const ActiveScheme = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [editedCard, setEditedCard] = useState({});
  const [offerDetails, setOfferDetails] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [{ updateOfferDetails, getOfferDetails }] = schemeHook();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await getOfferDetails("0");
      setOfferDetails(response?.data?.message);
    } catch (error) {
      toast.error("Failed to fetch offer details.");
      console.error(error.message);
    }
  }, [getOfferDetails]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCardClick = (OfferId) => {
    const clickedCard = offerDetails.find((item) => item.OfferId === OfferId);
    setSelectedCard(clickedCard);
    setEditedCard({ ...clickedCard });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard({ ...editedCard, [name]: value });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdateOfferDetails = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const dataToSend = {
      TenantId: 0,
      Title: editedCard.Title,
      Description: editedCard.Description,
      OStartDate: formatDate(editedCard.StartDate),
      OEndDate: formatDate(editedCard.EndDate),
      DiscountPercentage: editedCard.DiscountPercentage,
      MultipleProducts: editedCard.MultipleProducts,
      Products: editedCard.Products,
      States: editedCard.States,
      Active: editedCard.Active,
      UsageCount: editedCard.UsageCount,
    };

    try {
      const response = await updateOfferDetails(dataToSend, editedCard.OfferId);
      if (response.status === 200) {
        toast.success("Offer Details updated successfully");
        fetchData();
        handleCloseModal();
      } else {
        toast.error("Failed to update offer details.");
      }
    } catch (error) {
      toast.error("Error updating offer details.");
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <BreadCrumb />
      <div className="row">
        {offerDetails.map((item) => (
          <div key={item.OfferId} className="col-md-4 mb-4">
            <div
              className="card h-100 custom-card"
              onClick={() => handleCardClick(item.OfferId)}>
              <div className="card-body">
                <h5 className="card-title">{item.Title}</h5>
                <p className="card-text">Description: {item.Description}</p>
                <p className="card-text">
                  Start Date: {new Date(item.OStartDate).toLocaleDateString()}
                </p>
                <p className="card-text">
                  End Date: {new Date(item.OEndDate).toLocaleDateString()}
                </p>
                <p className="card-text">Usage Count: {item.UsageCount}</p>
                <p className="card-text">
                  Status:{" "}
                  <span className={`status-${item.Active}`}>
                    {item.Active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCard && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>Edit Scheme Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Form onSubmit={handleUpdateOfferDetails}>
              <Form.Group controlId="formTitle">
                <Form.Label className="form-label">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={editedCard.Title || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control
                  type="text"
                  name="Description"
                  value={editedCard.Description || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label className="form-label">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="StartDate"
                  value={
                    editedCard.OStartDate
                      ? new Date(editedCard.OStartDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label className="form-label">End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="EndDate"
                  value={
                    editedCard.OEndDate
                      ? new Date(editedCard.OEndDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formUsageCount">
                <Form.Label className="form-label">Usage Count</Form.Label>
                <Form.Control
                  type="number"
                  name="UsageCount"
                  value={editedCard.UsageCount || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label className="form-label">Active</Form.Label>
                <Form.Control
                  as="select"
                  name="Active"
                  value={editedCard.Active ? "true" : "false"}
                  onChange={(e) =>
                    setEditedCard({
                      ...editedCard,
                      Active: e.target.value === "true",
                    })
                  }
                  className="form-control"
                  required>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 btn-primary"
                disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="btn-secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

export default ActiveScheme;
