import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import relayService from "../Admin/AppProviders/Axios/hook";
import { jwtDecode } from 'jwt-decode';

function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate()

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.userId?.UserName);
      setUser(decoded.userId?.Role)
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    //console.log('logout auth :: ', auth.email);
    if (!token) {
      console.error('Logout error: No token found');
      return;
    }
    const decodedToken = jwtDecode(token);
    const email = decodedToken?.userId?.Email;

    if (!email) {
      console.error('Logout error: Email is undefined');
      return;
    }
    console.log('logout auth ::', email);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          TenantId: 0,
          Email: email
        })
      });
      //console.log(response);
      if (!response.ok) {
        throw new Error('Logout failed');
      } else {
        setAuth({
          isAuthenticated: false,
          role: '',
          userDetails: '',
          email: '',
          checkstatus: '0',
        });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate("/");
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const toggleSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };
  const [search, setSearch] = useState('');

  const getCustomerDetails = async () => {
    console.log("response");
    try {
      // Make a GET request to retrieve Customer Details
      const response = await relayService({
        url: `Customer/fetch`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { TenantId: 0, Phone: "9731545162" },
      });
      if (response) {
        console.log(response, "response");
        return response;

      }
    } catch (err) {
      // Show error message if request fails
    }
  };


  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="../assets/img/logo-thalappakatti.gif" alt="" />
          {/* {/ <span className="d-none d-lg-block">Adani Cement</span> /} */}
        </a>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} />
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="/">
              <i className="bi bi-search" />
            </a>
          </li>
     
     
          <img src="gr3.png" alt="" height="40" width="120" />
          &nbsp;&nbsp;
   


          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="/" data-bs-toggle="dropdown">
              <i className="bi bi-bell" />
              <span className="badge bg-primary badge-number">2</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 2 new notifications
                <Link to="">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {/* <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>New Lead Assigned</h4>
                  <p>A new lead has been assigned to you. Please follow up.</p>
                  <p>2024-05-20</p>
                </div>
              </li> */}
              {/* <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger" />
                <div>
                  <h4>Monthly Sales Report</h4>
                  <p>Your monthly sales report is ready. Check the reports section.</p>
                  <p>2024-05-21</p>
                </div>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success" />
                <div>
                  <h4>Target Achievement</h4>
                  <p>Congratulations! You have achieved 90% of your sales target.</p>
                  <p>2024-05-21</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary" />
                <div>
                  <h4>New Product Launch</h4>
                  <p>A new product will be launched next week. Prepare your pitch.</p>
                  <p>2024-05-20</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <Link to="">Show all notifications</Link>
              </li>
            </ul>

          </li>

          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="/" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text" />
              <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have 3 new messages
                <Link to="">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="/">
                  <img
                    src="assets/img/messages-1.jpg"
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <div>
                    <h4>John Smith</h4>
                    <p>Can we reschedule our meeting to next Monday?</p>
                    <p>1 hr. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="/">
                  <img
                    src="assets/img/messages-2.jpg"
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <div>
                    <h4>Jane Doe</h4>
                    <p>Received the contract. I'll review it by tomorrow.</p>
                    <p>3 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="message-item">
                <a href="/">
                  <img
                    src="assets/img/messages-3.jpg"
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <div>
                    <h4>Michael Brown</h4>
                    <p>Looking forward to our product demo this Friday!</p>
                    <p>5 hrs. ago</p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <Link to="">Show all messages</Link>
              </li>
            </ul>


          </li>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="/"
              data-bs-toggle="dropdown"
            >
              <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
               <span className="d-none d-md-block dropdown-toggle ps-2">
                {userName}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{userName}</h6>
                <span>{user === '1' ? 'Admin' : user === '2' ? 'Agent' : ''}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item d-flex align-items-center" to="/user-profile">
                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/"
                >
                  <i className="bi bi-gear" />
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/"
                >
                  <i className="bi bi-question-circle" />
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" onClick={handleLogout} style={{ cursor: "pointer" }} >
                  <i className="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </header>

  );
}

export default Header;

