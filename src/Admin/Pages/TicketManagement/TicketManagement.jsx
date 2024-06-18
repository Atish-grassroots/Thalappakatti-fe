import React, { useEffect, useState, useMemo } from "react";
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
import ticketManagementHook from "./hook";

const TicketManagement = () => {
  const navigate = useNavigate();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [{ getTicketDetails }] = ticketManagementHook();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getTicketDetails("0");
      setTicketDetails(response?.data?.message);
      setData(response?.data?.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item?.TicketType?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }, [data, search]);

  const counts = useMemo(() => {
    return {
      open: ticketDetails.filter((item) => item?.TicketStatus === "Open")
        .length,
      closed: ticketDetails.filter((item) => item.TicketStatus === "Closed")
        .length,
      inProgress: ticketDetails.filter(
        (item) => item.TicketStatus === "In-Progress"
      ).length,
    };
  }, [ticketDetails]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddData = () =>
    navigate("/ticketmanagement/ticketmanagementform");

  const handleView = (TicketId) =>
    // navigate(`/ticketmanagement/viewtickets`, {
    navigate(`/ticketmanagement/ticketmanagementform`, {
      state: { data: TicketId, view: true },
    });

  const handleEdit = (TicketId) =>
    navigate(`/ticketmanagement/ticketmanagementform`, {
      state: { edit: true },
    });

  const filterByStatus = (status) => {
    if (status === "All") {
      setData(ticketDetails);
    } else {
      setData(ticketDetails.filter((item) => item?.TicketStatus === status));
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
            {/* <Button variant="primary" 
            // onClick={handleAddData}
            >
              Add
            </Button> */}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="auto">
            <span
              className="badge bg-primary mb-0"
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => filterByStatus("All")}>
              <i className="bi bi-star me-1"></i> All - {ticketDetails.length}
            </span>
          </Col>
          <Col xs="auto">
            <span
              className="badge bg-danger mb-0"
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => filterByStatus("Open")}>
              <i className="bi bi-exclamation-octagon me-1"></i> Open -{" "}
              {counts.open}
            </span>
          </Col>
          <Col xs="auto">
            <span
              className="badge bg-success mb-0"
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => filterByStatus("Closed")}>
              <i className="bi bi-check-circle me-1"></i> Closed -{" "}
              {counts.closed}
            </span>
          </Col>
          <Col xs="auto">
            <span
              className="badge bg-warning text-dark mb-0"
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => filterByStatus("In-Progress")}>
              <i className="bi bi-exclamation-triangle me-1"></i> In-Progress -{" "}
              {counts.inProgress}
            </span>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center d-sm-none d-md-table-cell">
                  Ticket ID
                </th>
                <th className="text-center">Ticket Type</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Priority
                </th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Subject
                </th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Status
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.TicketId}>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.TicketId}
                  </td>
                  <td className="text-center">{item.TicketType}</td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.Priority}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.Subject}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.TicketStatus === "Closed" && (
                      <span className="text-success font-weight-bold">
                        Closed
                      </span>
                    )}
                    {item.TicketStatus === "In-Progress" && (
                      <span className="text-warning font-weight-bold">
                        In-Progress
                      </span>
                    )}
                    {item.TicketStatus === "Open" && (
                      <span className="text-danger font-weight-bold">Open</span>
                    )}
                  </td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center justify-content-md-end">
                      <Button
                        variant="success"
                        style={{ marginRight: "2px" }}
                        onClick={() => handleView(item)}>
                        View
                      </Button>
                      {/* <Button
                        variant="primary"
                        onClick={() => handleEdit(item.TicketId)}>
                        Edit
                      </Button> */}
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

export default TicketManagement;
