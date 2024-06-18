import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
import { Row, Col, Card } from "react-bootstrap";
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'

const DynamicLogin = () => {

  let { tenantName } = useParams();
  const navigate = useNavigate();
  console.log(tenantName, "Dynamic Login tenantName");
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_BASE_URL}/TenantMaster/getTenants?TenantName=${tenantName}`)
  //     .then((response) => {
  //       // console.log(response, "response");
  //       console.log(response?.data?.message[0]?.TenantName, "response");
  //       if (response?.data?.message[0]?.TenantName === tenantName) {

  //         navigate(`/login`);
  //         // toast.error("Login. Check for the credentials.");
  //       } else {
  //         toast.error("Login failed. Check for the credentials.");
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //     });

  // }, [])


  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F0F2F5" }}>
      <Row className="w-100 justify-content-center">
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center"
        >
          <img
            src="./login.svg"
            alt="Sign In Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center p-3"
        >
          <Card
            style={{
              width: "400px",
              padding: "5px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Card.Body>
              <Card.Title className="text-center mb-1" style={{ color: 'red' }}>
                {tenantName} - Tenant Name not available. Contact Admin.
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DynamicLogin;
