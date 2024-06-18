import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Fix the import for jwt-decode
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { tenantName } = useParams();
  console.log("tenantName", tenantName);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const role =
        decodedToken.userId.Role === "1"
          ? "Admin"
          : decodedToken.userId.Role === "2"
            ? "Agent" : "User";
      setAuth({
        isAuthenticated: true,
        role: role,
        email: decodedToken.Email,
        userDetails: decodedToken,
      });
      if (role === "Admin") {
        navigate(`/admin`);
      } else if (role === "Agent") {
        navigate(`/agent`);
      }
    }
  }, [navigate, setAuth]);



  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Users/refreshToken`,
        {
          refreshToken: refreshToken,
        }
      );

      if (response.data.token) {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("refreshToken", response.data.refreshToken);
      } else {
        throw new Error("Failed to refresh access token.");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error.message);
      navigate("/login");
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Users/login`,
        {
          TenantId: 0,
          Email: email,
          Password: password,
        }
      );
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      setOtpSent(true);
      setDisabled(false);
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Users/validateOtp`,
        {
          TenantId: 0,
          Email: email,
          Otp: otp,
        }
      );
      console.log("responseotp", response);

      if (response.data.status === "Success") {
        localStorage.setItem("token", response.data.token);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage.");
        }

        const decodedToken = jwtDecode(response.data.token);
        const userRole = decodedToken.userId.Role;
        const role =
          userRole === "1" ? "Admin" :
            userRole === "2" ? "Agent" : "User";

        setAuth({
          isAuthenticated: true,
          role: role,
          userDetails: decodedToken,
        });

        setTimeout(() => {
          navigate(`/${role.toLowerCase()}`);
        }, 2000);
      } else {
        throw new Error("OTP verification failed.");
      }
    } catch (error) {
      toast.error("OTP verification failed: " + error.message);
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            margin: 0;
          }
          .gradient-form {
            background: #e4eeee;
            padding: 2rem;
          }
          .custom-styled-button {
            background: linear-gradient(
              to right,
              #ee7724,
              #d8363a,
              #dd3675,
              #b44593
            );
            color: white;
            border: none;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            padding: 10px 10px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 10px;
            width: 50px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          
          html, body, .scrollable-container {
            overflow-y: auto;
          }
          @media (max-width: 768px) {
            .scrollable-container {
              height: calc(100vh - 150px);
            }
            .gradient-form {
              padding: 1rem;
            }
            .img-fluid {
              height: auto;
            }
          }
        `}
      </style>
      <Container fluid className="scrollable-container">
        <Row className="h-100">
          <Col md={6}>
            <img
              src="../assets/img/thalappakatti1.jpg"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "100vh" }}
              alt="sideImage"
            />
          </Col>

          <Col md={6} className="gradient-form">
            <div className="d-flex flex-column h-100 justify-content-center">
              <div className="text-center">
                <img
                  src="../assets/img/logo-thalappakatti.gif"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 pb-1 fw-bold">Login</h4>
              </div>
              {disabled && (
                <>
                  <Form.Group className="mb-4">
                    <Col sm={8} className="mx-auto">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Col sm={8} className="mx-auto">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="text-center">
                    <Button
                      className="mb-4 w-50 custom-styled-button mt-3"
                      onClick={handleLoginSubmit}>
                      Request OTP
                    </Button>
                  </Form.Group>
                </>
              )}
              {otpSent && (
                <>
                  <Form.Group className="mb-2">
                    <Col sm={8} className="mx-auto">
                      <Form.Control
                        type="password"
                        placeholder="OTP"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="text-center">
                    <Button
                      className="mb-4 w-50 custom-styled-button mt-3"
                      onClick={handleOtpSubmit}>
                      Sign in
                    </Button>
                  </Form.Group>
                </>
              )}
              <div className="text-center">
                <a className="mt-1 mb-1 pb-1 text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
