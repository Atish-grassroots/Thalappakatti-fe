import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import {
  Card,
  Col,
  Container,
  FormControl,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import schemeHook from "./hook";

const ViewScheme = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [offerDetails, setOfferDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [{ getOfferDetails }] = schemeHook();

  const fetchData = async () => {
    try {
      const response = await getOfferDetails("0");
      const details = response?.data?.message || [];
      setOfferDetails(details);
      setFilteredData(details);
      setOpenCount(details?.filter((item) => item.Active).length);
      setClosedCount(details?.filter((item) => !item.Active).length);
      console.log(details);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      offerDetails?.filter((item) =>
        item?.Title?.toLowerCase()?.includes(search?.toLowerCase())
      )
    );
  }, [search, offerDetails]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterByStatus = (status) => {
    switch (status) {
      case "Open":
        setFilteredData(offerDetails?.filter((item) => item.Active));
        break;
      case "Closed":
        setFilteredData(offerDetails?.filter((item) => !item.Active));
        break;
      default:
        setFilteredData(offerDetails);
    }
    setCurrentPage(1); // Reset to first page after filter change
  };

  return (
    <Container fluid className="mt-3">
      <BreadCrumb />
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
            className="d-flex justify-content-md-center mt-3 mt-md-0">
            <Row className="mb-3">
              <Col xs="auto">
                <span
                  className="badge bg-primary mb-0"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => filterByStatus("All")}>
                  <i className="bi bi-star me-1"></i> All -{" "}
                  {offerDetails?.length}
                </span>
              </Col>
              <Col xs="auto">
                <span
                  className="badge bg-success mb-0"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => filterByStatus("Open")}>
                  <i className="bbi bi-check-circle me-1"></i> Active -{" "}
                  {openCount}
                </span>
              </Col>
              <Col xs="auto">
                <span
                  className="badge bg-danger mb-0"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => filterByStatus("Closed")}>
                  <i className="bi bi-exclamation-triangle me-1"></i> Disabled -{" "}
                  {closedCount}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center d-sm-none d-md-table-cell">SL No</th>
                <th className="text-center">Title</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Start Date
                </th>
                <th className="text-center d-sm-none d-md-table-cell">
                  End Date
                </th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Usage Count
                </th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.OfferId}>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {index + 1 + indexOfFirstItem}
                  </td>
                  <td className="text-center">{item.Title}</td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {new Date(item.OStartDate).toLocaleDateString()}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {new Date(item.OEndDate).toLocaleDateString()}
                  </td>
                  <td className="text-center d-sm-none d-md-table-cell">
                    {item.UsageCount}
                  </td>
                  <td className="text-center bold d-sm-none d-md-table-cell">
                    {item.Active ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Disabled</span>
                    )}
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

export default ViewScheme;
