import { useEffect, useMemo, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ticketManagementHook from "../TicketManagement/hook";

const TicketReport = (filterDate) => {
  const [{ getTicketDetails }] = ticketManagementHook();
  const [ticketsReport, setTicketsReport] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getTicketDetails("0").then((response) => {
        setTicketsReport(response?.data?.message);
        setFilteredData(response?.data?.message);
      });

      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setFilteredData(
      ticketsReport.filter((item) =>
        item.TicketType.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, ticketsReport]);
  useEffect(() => {
    if (
      !filterDate?.date ||
      !filterDate?.date[0] ||
      !filterDate?.date[1] ||
      !ticketsReport
    ) {
      return;
    }

    const startfilterDateString = filterDate?.date[0].toISOString();
    const endfilterDateString = filterDate?.date[1].toISOString();

    const filteredData = ticketsReport.filter((item) => {
      const salesStartDate = new Date(item.LoyaltyStartDate).toISOString();
      const salesEndDate = new Date(item.LoyaltyStartDate).toISOString();

      return (
        startfilterDateString <= salesEndDate &&
        endfilterDateString >= salesStartDate
      );
    });

    setFilteredData(filteredData);
  }, [filterDate, ticketsReport]);

  const counts = useMemo(() => {
    return {
      open: ticketsReport.filter((item) => item?.TicketStatus === "Open")
        .length,
      closed: ticketsReport.filter((item) => item.TicketStatus === "Closed")
        .length,
      inProgress: ticketsReport.filter(
        (item) => item.TicketStatus === "In-Progress"
      ).length,
    };
  }, [ticketsReport]);
  const filterByStatus = (status) => {
    if (status === "All") {
      setFilteredData(ticketsReport);
    } else {
      setFilteredData(
        ticketsReport.filter((item) => item?.TicketStatus === status)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table-responsive">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <FormControl
            type="text"
            placeholder="Search by ticket type"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="auto">
          <span
            className="badge bg-primary mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus("All")}
          >
            <i className="bi bi-star me-1"></i> All - {ticketsReport.length}
          </span>
        </Col>
        <Col xs="auto">
          <span
            className="badge bg-danger mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus("Open")}
          >
            <i className="bi bi-exclamation-octagon me-1"></i> Open -{" "}
            {counts.open}
          </span>
        </Col>
        <Col xs="auto">
          <span
            className="badge bg-success mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus("Closed")}
          >
            <i className="bi bi-check-circle me-1"></i> Closed - {counts.closed}
          </span>
        </Col>
        <Col xs="auto">
          <span
            className="badge bg-warning text-dark mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus("In-Progress")}
          >
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
              <th className="text-center d-sm-none d-md-table-cell">Subject</th>
              <th className="text-center d-sm-none d-md-table-cell">Status</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Row className="mt-3 align-items-center">
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
          <PaginationControl
            className="justify-content-center justify-content-md-end"
            page={currentPage}
            between={4}
            total={filteredData.length}
            limit={itemsPerPage}
            changePage={(page) => setCurrentPage(page)}
            ellipsis={1}
          />
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default TicketReport;
