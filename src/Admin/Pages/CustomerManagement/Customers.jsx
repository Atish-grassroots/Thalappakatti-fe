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
import customerHook from "./hook";
const [{ getCustomerDetails }] = customerHook();

const Customers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customerDetails, setCustomersDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage items per page

  // Filtered data based on search query
  const filteredData = customerDetails?.filter((item) =>
    item?.CustomerName?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle adding new data
  const handleAddData = () => {
    navigate("/customers/customersform/null");
  };
  // Function to handle viewing a user
  const handleView = (CustomerId) => {
    navigate(`/customers/customersform/${CustomerId}`, {
      state: { view: true },
    });
  };

  // Function to handle editing a user
  const handleEdit = (CustomerId) => {
    console.log(CustomerId);
    navigate(`/customers/customersform/${CustomerId}`, {
      state: { edit: true },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCustomerDetails("0");
      setCustomersDetails(response?.data?.message);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container fluid className="mt-3">
      <Card className="p-3">
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
            className="d-flex justify-content-md-end mt-3 mt-md-0">
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
                <th className="text-center">CustomerName</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Type
                </th>
                <th className="text-center d-sm-none d-md-table-cell">City</th>
                <th className="text-center d-sm-none d-md-table-cell">State</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Active
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={item.CustomerId}>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.CustomerId}
                  </td>
                  <td className="text-center">{item.CustomerName}</td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.CustomerType}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.City}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.State}
                  </td>{" "}
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.Active ? "Yes" : "No"}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center justify-content-md-end">
                      <Button
                        variant="success"
                        style={{ marginRight: "2px" }}
                        onClick={() => handleView(item.CustomerId)}>
                        View
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(item.CustomerId)}>
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Row className="mt-3">
          <Col xs={12} md={2}>
            <FormControl
              as="select"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
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
            className="d-flex justify-content-md-end mt-3 mt-md-0">
            <Pagination className="justify-content-center justify-content-md-end">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => i + 1
              ).map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}>
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

export default Customers;
