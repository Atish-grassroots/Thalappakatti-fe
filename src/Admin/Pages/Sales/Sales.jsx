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
import useSales from "./hook";

const Sales = () => {
  const navigate = useNavigate();
  const [{ getSales }] = useSales();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [salesData, setSalesData] = useState([]);

  const filteredData = salesData.filter((item) =>
    item.CustomerName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddData = () => {
    navigate("/addsales/0", { state: { Add: true } });
  };

  const handleView = (custId) => {
    navigate(`/addsales/${custId}`, { state: { View: true } });
  };

  const handleEdit = (custId) => {
    navigate(`/addsales/${custId}`, { state: { Edit: true } });
  };
  // Get Sales
  useEffect(() => {
    getSales(0, 10, 0, 0).then((response) => {
      setSalesData(response?.data?.message);
    });
  }, []);

  return (
    <Container fluid className="mt-3">
      <Card className="p-3">
        <Row className="CardHeader">
          <Col>Sales</Col>
        </Row>
        <hr />
        <Row className="mb-3">
          <Col xs={12} md={6} lg={4}>
            <FormControl
              type="text"
              placeholder="Search by enterprise name"
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
                <th className="text-center d-sm-none d-md-table-cell">Order ID</th>
                <th className="text-center">Enterprise Name</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Quantity
                </th>
                <th className="text-center">Unit Price</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Total Price
                </th>
                
                <th className="text-center d-sm-none d-md-table-cell">
                  Sales Date
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.OrderId}>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.OrderId}
                  </td>
                  <td className="text-center">{item.CustomerName}</td>

                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.Product}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.Quantity}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.TotalPrice}
                  </td>
                 
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.SalesDate &&
                      new Date(item.SalesDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                  </td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center ">
                      <Button
                        variant="success"
                        style={{ marginRight: "2px" }}
                        onClick={() => handleView(item.CustomerId)}
                      >
                        View
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(item.CustomerId)}
                      >
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

export default Sales;
