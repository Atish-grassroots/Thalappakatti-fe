import { useEffect, useMemo, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import useUser from "../UserManagement/hook";

const UsersReport = (filterDate) => {
  console.log(filterDate, "filterDate");
  const [{ getUser }] = useUser();
  const [usersReportData, setUsersReportData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getUser(0, 10, 0, 0).then((response) => {
        setUsersReportData(response?.data?.message);
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

  const filterByStatus = (status) => {
    if (status === "All") {
      setFilteredData(usersReportData);
    } else {
      setFilteredData(
        usersReportData.filter((item) => item?.Active === status)
      );
    }
  };
  const counts = useMemo(() => {
    return {
      Active: usersReportData.filter((item) => item?.Active === true).length,
      Inactive: usersReportData.filter((item) => item.Active === false).length,
    };
  }, [usersReportData]);
  useEffect(() => {
    setFilteredData(
      usersReportData.filter((item) =>
        item.UserName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, usersReportData]);
  useEffect(() => {
    if (
      !filterDate?.date ||
      !filterDate?.date[0] ||
      !filterDate?.date[1] ||
      !usersReportData
    ) {
      return;
    }

    const startfilterDateString = filterDate?.date[0].toISOString();
    const endfilterDateString = filterDate?.date[1].toISOString();
    console.log(startfilterDateString, endfilterDateString);
    const filteredData = usersReportData.filter((item) => {
      const salesStartDate = new Date(item.SalesDate).toISOString();
      const salesEndDate = new Date(item.SalesDate).toISOString();
      console.log(salesStartDate, salesEndDate);
      return (
        startfilterDateString <= salesEndDate &&
        endfilterDateString >= salesStartDate
      );
    });

    setFilteredData(filteredData);
  }, [filterDate, usersReportData]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table-responsive">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <FormControl
            type="text"
            placeholder="Search by name"
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
            <i className="bi bi-star me-1"></i> All - {usersReportData.length}
          </span>
        </Col>

        <Col xs="auto">
          <span
            className="badge bg-success mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus(true)}
          >
            <i className="bi bi-check-circle me-1"></i> Active -{counts.Active}
          </span>
        </Col>
        <Col xs="auto">
          <span
            className="badge bg-danger mb-0"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => filterByStatus(false)}
          >
            <i className="bi bi-exclamation-octagon me-1"></i> Inactive -
            {counts.Inactive}
          </span>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="text-center">
            <h5>Users Report</h5>
            <tr>
              <th>User ID</th>
              <th className="text-center">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.UserId}>
                <td className="text-center">{item.UserId}</td>
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
                  {item.Active === true ? (
                    <span className="text-success">Yes</span>
                  ) : (
                    <span className="text-danger">No</span>
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

export default UsersReport;
