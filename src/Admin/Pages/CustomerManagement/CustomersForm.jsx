import React, { useEffect, useState } from "react";

import * as RB from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImBackward } from "react-icons/im";
import customerHook from "./hook";

const CustomersForm = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({
    name: "",
    CustomerId: "",
    CustomerType: "",
    TenantId: 0,
    gender: "Male",
    email: "",
    address: "",
    phone: "",
    pincode: "",
    alternatePhone: "",
    organization: "",
    city: "",
    state: "",
    facebook: "",
    instagram: "",
    telegram: "",
  });

  const [
    { addCustomerDetails, updateCustomerDetails, getCustomerDetailsByID },
  ] = customerHook();
  const location = useLocation();

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Validation: Allow only numbers
    if (/^\d*$/.test(input) || input === "") {
      setPhone(input);
    }
  };

  const handleAlternatePhoneChange = (e) => {
    const input = e.target.value;
    // Validation: Allow only numbers
    if (/^\d*$/.test(input) || input === "") {
      setAlternatePhone(input);
    }
  };

  const handleAddCustomerDetails = (e) => {
    e.preventDefault();
    const dataToSend = {
      TenantId: 0,
      CustomerName: customerData.name,
      CustomerType: customerData.CustomerType,
      Email: customerData.email,
      Phone: phone,
      Gender: "Male",
      AlternatePhone: alternatePhone,
      Address: customerData.address,
      Pincode: customerData.pincode,
      City: customerData.city,
      State: customerData.state,
      Country: "India",
      Organization: customerData.name,
      Fbhandle: customerData.facebook,
      InstagramHandle: customerData.instagram,
      TelegramHandle: customerData.telegram,
    };

    addCustomerDetails(dataToSend)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Customer data added successfully");
          navigate(-1);
        }
      })
      .catch((err) => {
        toast.error("Error adding customer data");
      });
  };

  const handleUpdateCustomerDetails = (e) => {
    const dataToSend = {
      TenantId: 0,
      CustomerId: id,
      CustomerName: customerData.name,
      CustomerType: customerData.CustomerType,
      Email: customerData.email,
      Phone: phone,
      Gender: customerData.gender,
      AlternatePhone: alternatePhone,
      Address: customerData.address,
      Pincode: customerData.pincode,
      City: customerData.city,
      State: customerData.state,
      Country: "India",
      Organization: customerData.organization,
      Fbhandle: customerData.facebook,
      InstagramHandle: customerData.instagram,
      TelegramHandle: customerData.telegram,
    };

    e.preventDefault();

    updateCustomerDetails(dataToSend, id)
      .then((response) => {
        toast.success("Customer data updated successfully");
        if (response) {
          navigate(-1);
        }
      })
      .catch((error) => {
        toast.error("Error Updating customer data");
      });
  };

  // Get Sales
  useEffect(() => {
    getCustomerDetailsByID(id).then((response) => {
      if (response?.data?.message && response?.data?.message?.length > 0) {
        const responseData = response?.data?.message[0];
        setCustomerData({
          name: responseData?.CustomerName || "",
          CustomerId: responseData?.CustomerId || "",
          CustomerType: responseData?.CustomerType || "",
          gender: responseData?.Gender || "",
          email: responseData?.Email || "",
          address: responseData?.Address || "",
          pincode: responseData?.PINCODE || "",
          organization: responseData?.Organization || "",
          city: responseData?.City || "",
          state: responseData?.State || "",
          facebook: responseData?.FbHandle || "",
          instagram: responseData?.Instagramhandle || "",
          telegram: responseData?.Telegramhandle || "",
        });
        setPhone(responseData?.Phone || "");
        setAlternatePhone(responseData?.AlternatePhone || "");
      }
    });
  }, [location?.state?.edit || location?.state?.view]);

  return (
    <>
      <RB.Container style={{ fontSize: "1rem" }}>
        <RB.Card className="p-4">
          <h2 className="CardHeader">
            <ImBackward
              className="h-4"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              onClick={() => window.history.back()}
            />
            Customers Details
          </h2>
          <hr />
          <RB.Form>
            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicName">
                  <RB.Form.Label>
                    Enterprise Name <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.name}
                    name="name"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        name: e.target.value,
                      })
                    }
                    required
                    readOnly={location?.state?.view}
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicCustomerId">
                  <RB.Form.Label>
                    Type <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    as="select"
                    value={customerData.CustomerType}
                    readOnly={location?.state?.view}
                    name="CustomerType"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        CustomerType: e.target.value,
                      })
                    }
                    required>
                    <option value="">Select Type</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Retailer">Retailer</option>
                  </RB.Form.Control>
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicPhone">
                  <RB.Form.Label>
                    Phone number <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="tel"
                    readOnly={location?.state?.view}
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group
                  className="mb-3"
                  controlId="formBasicAlternatePhone">
                  <RB.Form.Label>Alternate Phone number </RB.Form.Label>
                  <RB.Form.Control
                    type="tel"
                    readOnly={location?.state?.view}
                    value={alternatePhone}
                    onChange={handleAlternatePhoneChange}
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>
            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group controlId="formBasicEmail">
                  <RB.Form.Label>
                    E-mail <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="email"
                    required
                    value={customerData.email}
                    readOnly={location?.state?.view}
                    name="email"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicAddress">
                  <RB.Form.Label>
                    Business Address <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.address}
                    readOnly={location?.state?.view}
                    name="address"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        address: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicCity">
                  <RB.Form.Label>
                    City <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.city}
                    readOnly={location?.state?.view}
                    name="city"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        city: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicState">
                  <RB.Form.Label>
                    State <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.state}
                    readOnly={location?.state?.view}
                    name="state"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        state: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicPincode">
                  <RB.Form.Label>
                    PINCODE <span className="text-danger">*</span>
                  </RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.pincode}
                    readOnly={location?.state?.view}
                    name="pincode"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        pincode: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicInstagram">
                  <RB.Form.Label>Instagram handle</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.instagram}
                    readOnly={location?.state?.view}
                    name="instagram"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        instagram: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Row className="mb-3">
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicFacebook">
                  <RB.Form.Label>Facebook handle</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.facebook}
                    readOnly={location?.state?.view}
                    name="facebook"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        facebook: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
              <RB.Col md={6}>
                <RB.Form.Group className="mb-3" controlId="formBasicTelegram">
                  <RB.Form.Label>Telegram handle</RB.Form.Label>
                  <RB.Form.Control
                    type="text"
                    value={customerData.telegram}
                    readOnly={location?.state?.view}
                    name="telegram"
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        telegram: e.target.value,
                      })
                    }
                  />
                </RB.Form.Group>
              </RB.Col>
            </RB.Row>

            <RB.Col xs={12} className="gy-6">
              <div className="d-flex justify-content-end gap-3">
                <RB.Button
                  variant="danger"
                  className="px-5"
                  onClick={() => navigate(-1)}>
                  Cancel
                </RB.Button>
                {location?.state?.edit ? (
                  <RB.Button
                    variant="primary"
                    className="px-5 px-sm-15"
                    onClick={(e) => handleUpdateCustomerDetails(e)}>
                    Update
                  </RB.Button>
                ) : (
                  <RB.Button
                    variant="primary"
                    className="px-5 px-sm-15"
                    onClick={(e) => handleAddCustomerDetails(e)}
                    disabled={location?.state?.view}>
                    Add
                  </RB.Button>
                )}
              </div>
            </RB.Col>
          </RB.Form>
        </RB.Card>
      </RB.Container>
      <ToastContainer />
    </>
  );
};

export default CustomersForm;
