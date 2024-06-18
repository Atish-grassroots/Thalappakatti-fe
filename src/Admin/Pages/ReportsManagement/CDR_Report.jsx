import { useEffect, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import useReport from "./hook";

const CDR_Report = (filterDate) => {
  console.log(filterDate, "startDateEndDate");
  const [{ getCDR }] = useReport();
  const [cdrReportData, setCdrReportData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const fetchData = async () => {
    try {
      const reverseDateFormat = (dateString) => {
        return dateString.split("/").reverse().join("/");
      };

      const response = await getCDR(
        reverseDateFormat(
          new Date(filterDate?.startEndDate[0]).toLocaleDateString()
        ),
        reverseDateFormat(
          new Date(filterDate?.startEndDate[1]).toLocaleDateString()
        ),
        "SIP/9999"
      );

      setCdrReportData(response?.data?.data);
      setFilteredData(response?.data?.data);

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
      cdrReportData.filter((item) =>
        item.AgentName.toLowerCase().includes(search.toLowerCase())
      ) 
    );
  }, [search, cdrReportData]);

  useEffect(() => {
    if (
      filterDate?.startEndDate.length > 1 &&
      filterDate?.startEndDate[1] !== null
    ) {
      fetchData();
    }
  }, [filterDate]);
  return (
    <div className="table-responsive">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <FormControl
            type="text"
            placeholder="Search by agent id"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <h4 className="fw-bold">CDR Report</h4>
          <tr>
            <th className="text-center d-sm-none d-md-table-cell">Agent ID</th>
            <th className="text-center">Call Type</th>

            <th className="text-center d-sm-none d-md-table-cell">Caller ID</th>
            <th className="text-center d-sm-none d-md-table-cell">
              Start Time
            </th>
            <th className="text-center d-sm-none d-md-table-cell">Duration</th>
            <th className="text-center">Queue</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr>
              <td className="text-center">{item.AgentId}</td>
              <td className="text-center">{item.CallType}</td>
              <td className="text-center">{item.CallerId}</td>
              <td className="text-center">{item.StartTime}</td>
              <td className="text-center">{item.Duration}</td>
              <td className="text-center">{item.Queue}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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

export default CDR_Report;
