import React, { useEffect, useState } from "react";
import { ImBackward } from "react-icons/im";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import useUser from "./hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const [{ addUser, uploadFiles, getUserById }] = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    UserName: "",
    Email: "",
    Password: "",
    Role: "",
    SipPhone: "",
    Phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Get user
  useEffect(() => {
    getUserById(0, 10, 0, 0, userId)
      .then((response) => {
        if (response?.data?.message && response.data.message.length > 0) {
          const firstSalesData = response.data.message[0];
          setFormData({
            UserName: firstSalesData.UserName || "",
            Email: firstSalesData.Email || "",
            Password: firstSalesData.Password || "",
            Role: firstSalesData.Role || "",
            SipPhone: firstSalesData.SipPhone || "",
            Phone: firstSalesData.Phone || "",
            // other properties
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [location?.state?.View]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const dataToSend = {
        TenantId: 0,
        BucketName: "grtickets",
        ModuleName: "UserManagement",
        FileName: selectedFile.name,
        FilePath: selectedFile.name,
      };
      const response = await uploadFiles(dataToSend);
      if (response && response.status === "Success") {
        setSelectedFile({
          image: response.data.message.FullFileName,
        });
      } else {
        console.error("Error uploading file:", response.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleFileUpload();
    addUser(formData, selectedFile)
      .then((res) => {
        if (res) {
          navigate(-1);
        }
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
  };
  const imageUrl = 'https://picsum.photos/200';
  return (
    <Card className="Card">
      <Card.Body>
        {location?.state?.Add && (
          <h2 className="CardHeader">
            <ImBackward
              className="h-4"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              onClick={() => window.history.back()}
            />
            Add User
          </h2>
        )}
        {location?.state?.View && (
          <h2 className="CardHeader">
            <ImBackward
              className="h-4"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              onClick={() => window.history.back()}
            />
            View User
          </h2>
        )}
        <hr />
        <Form className="Form mt-3">
          <Row className="Row">
            <Col className="Col">
              <Form.Group controlId="formUserName" className="FormGroup">
                <Form.Label className="FormLabel">User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  className="FormControl"
                  disabled={location?.state?.View}
                />
              </Form.Group>
            </Col>
            <Col className="Col">
              <Form.Group controlId="formEmail" className="FormGroup">
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="FormControl"
                  disabled={location?.state?.View}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="Row">
            {location?.state?.View !== true && (
              <Col className="Col">
                <Form.Group controlId="formPassword" className="FormGroup">
                  <Form.Label className="FormLabel">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="FormControl"
                    disabled={location?.state?.View}
                  />
                </Form.Group>
              </Col>
            )}
            <Col className="Col">
              <Form.Group controlId="formRole" className="FormGroup">
                <Form.Label className="FormLabel">Role</Form.Label>
                <Form.Select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  className="FormControl"
                  disabled={location?.state?.View === true}
                >
                  <option value="1">Admin</option>
                  <option value="2">Agent</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="Row">
            <Col className="Col">
              <Form.Group controlId="formSipPhone" className="FormGroup">
                <Form.Label className="FormLabel">SIP Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="SipPhone"
                  value={formData.SipPhone}
                  onChange={handleChange}
                  className="FormControl"
                  disabled={location?.state?.View}
                />
              </Form.Group>
            </Col>
            <Col className="Col">
              <Form.Group controlId="formPhone" className="FormGroup">
                <Form.Label className="FormLabel">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="Phone"
                  disabled={location?.state?.View}
                  value={formData.Phone}
                  onChange={handleChange}
                  className="FormControl"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="Row">
           <Col className="Col">
              <Form.Group controlId="formAvatar" className="FormGroup">
                <Form.Label className="FormLabel">Avatar</Form.Label>
                {location?.state?.Add  &&<Form.Control
                  type="file"
                  className="FormControl"
                  onChange={handleFileChange}
                  disabled={location?.state?.View}
                />}
                  <img className="ms-2" src={imageUrl} alt="Dummy" />
              </Form.Group>
            </Col>
          
          </Row>
          {location?.state?.View !== true && (
            <div className="d-flex justify-content-end mt-3 gap-3">
              <Button
                variant="primary"
                type="button"
                className="CancelButton"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="button"
                className="SubmitButton"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          )}
          {location?.state?.View && (
            <Col className="d-flex justify-content-end">
              <Button
                variant="primary"
                type="button"
                onClick={() => window.history.back()}
              >
                Close
              </Button>
            </Col>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
