import React, { useEffect, useState } from "react";
import {
  Table,
  FormControl,
  Pagination,
  Card,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import useUser from "./hook";

const Users = () => {
  const [{ getUser }] = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage items per page

  // Filtered data based on search query
  const filteredData = userData.filter((item) =>
    item.UserName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle adding new data
  const handleAddData = () => {
    navigate("/user/userform/null", { state: { Add: true } });
  };
  // Function to handle viewing a user
  const handleView = (userId) => {
    navigate(`/user/userform/${userId}`, { state: { View: true } });
  };


  const handleActivate = (userId) => {
    fetch(`http://localhost:42400/Users/updateUserActiveStatus?TenantId=0&UserId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Active: true })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User activated:', data);
      // Update userData state
      setUserData(userData.map(user => 
        user.UserId === userId ? { ...user, Active: true } : user
      ));
    })
    .catch(error => console.error('Error activating user:', error));
  };
  
  const handleDeactivate = (userId) => {
    fetch(`http://localhost:42400/Users/updateUserActiveStatus?TenantId=0&UserId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Active: false })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User deactivated:', data);
      // Update userData state
      setUserData(userData.map(user => 
        user.UserId === userId ? { ...user, Active: false } : user
      ));
    })
    .catch(error => console.error('Error deactivating user:', error));
  };

  // Function to handle editing a user
  // const handleEdit = (userId) => {
  //   navigate(`/user/UserForm`);
  // };
  // Get Sales
  useEffect(() => {
    getUser(0, 10, 0, 0).then((response) => {
      setUserData(response?.data?.message);
    });
  }, []);
  return (
    <Container fluid className="mt-3">
      <Card className="p-3">
      <Row className="CardHeader">
          <h2 className="CardHeader">Users</h2>
        </Row>
        <hr/>
        <Row className="mb-3">
          <Col xs={12} md={6} lg={4}>
            <FormControl
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col
            xs={12}
            md={6}
            lg={8}
            className="d-flex justify-content-md-end mt-3 mt-md-0"
          >
            <Button variant="primary" onClick={handleAddData}>
              Add
            </Button>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center d-sm-none d-md-table-cell">Sl.No</th>
                <th className="text-center">Name</th>
                <th className="text-center d-sm-none d-md-table-cell">Email</th>
                <th className="text-center d-sm-none d-md-table-cell">Phone</th>
                <th className="text-center d-sm-none d-md-table-cell">Role</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Active
                </th>

                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.UserId}>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.UserId}
                  </td>
                  <td className="text-center">{item.UserName}</td>
                  <td className="text-center">{item.Email}</td>
                  <td className="text-center">{item.Phone}</td>
                  <td className="text-center">
                    {item.Role && item.Role === "1" ? (
                      <span style={{ color: "red" }}>Admin</span>
                    ) : item.Role && item.Role === "2" ? (
                      <span style={{ color: "blue" }}>Agent</span>
                    ) : (
                      <span style={{ color: "green" }}>{item.Role}</span>
                    )}
                  </td>

                  <td className="text-center bold d-sm-none d-md-table-cell">
                    {item.Active ? (
                      <>
                        {/* <span className="text-success">Yes</span> */}
                        <Button variant="danger" size="sm" onClick={() => handleDeactivate(item.UserId)} style={{ marginLeft: "5px" }}>
                          Deactivate
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* <span className="text-danger">No</span> */}
                        <Button variant="success" size="sm" onClick={() => handleActivate(item.UserId)} style={{ marginLeft: "5px" }}>
                          Activate
                        </Button>
                      </>
                    )}
                  </td>

                  {/* Action column */}
                  <td className="text-center">
                    <div className="d-flex justify-content-center ">
                      <Button
                        variant="success"
                        style={{ marginRight: "2px" }}
                        onClick={() => handleView(item.UserId)}
                      >
                        View
                      </Button>
                      {/* <Button
                        variant="primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination and Entries per page */}
        <Row className="mt-3">
          <Col xs={12} md={2}>
            <FormControl
              as="select"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            >
              {[5, 10, 15, 20].map((perPage) => (
                <option key={perPage} value={perPage}>
                  {perPage} per page
                </option>
              ))}
            </FormControl>
          </Col>
          <Col
            xs={12}
            md={10}
            className="d-flex justify-content-md-end mt-3 mt-md-0"
          >
            <Pagination className="justify-content-center justify-content-md-end">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => i + 1
              ).map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Users;
