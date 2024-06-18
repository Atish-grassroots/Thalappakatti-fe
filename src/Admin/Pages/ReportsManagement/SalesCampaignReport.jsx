import { useEffect, useState } from "react";
import { Col, FormControl, Row, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import useSalesCamapaign from "../SalesCampaign/hook";

const SalesCampaignReport = () => {
  const [{ getSalesCampaign }] = useSalesCamapaign();
  const [salesCampaignData, setSalesCampaignData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await getSalesCampaign(0, 10, 0, 0).then((response) => {
        setSalesCampaignData(response?.data?.message);
        setFilteredData(response?.data?.message);
        const openSalesCampaign = response?.data?.message.filter(
          (item) => item.Active
        );
        const closedSalesCampaign = response?.data?.message.filter(
          (item) => !item.Active
        );
        setOpenCount(openSalesCampaign.length);
        setClosedCount(closedSalesCampaign.length);
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
    switch (status) {
      case "Open":
        setFilteredData(salesCampaignData?.filter((item) => item.Active));
        break;
      case "Closed":
        setFilteredData(salesCampaignData?.filter((item) => !item.Active));
        break;
      default:
        setFilteredData(salesCampaignData);
    }
    setCurrentPage(1); // Reset to first page after filter change
  };

  useEffect(() => {
    setFilteredData(
      salesCampaignData.filter((item) =>
        item.CamapaignName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, salesCampaignData]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table-responsive">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6} lg={4}>
          <FormControl
            type="text"
            placeholder="Search by campaign name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col
          xs={12}
          md={6}
          lg={4}
          className="d-flex justify-content-md-center justify-content-lg-start align-items-center mt-3 mt-md-0"
        >
          <span
            className="badge bg-success me-2"
            style={{ cursor: "pointer" }}
            onClick={() => filterByStatus("Open")}
          >
            <i className="bi bi-check-circle me-1"></i> Active - {openCount}
          </span>
          <span
            className="badge bg-danger me-2"
            style={{ cursor: "pointer" }}
            onClick={() => filterByStatus("Closed")}
          >
            <i className="bi bi-exclamation-triangle me-1"></i> Disabled -{" "}
            {closedCount}
          </span>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead>
            <h4 className="fw-bold">Sales Campaign Report </h4>
            <tr>
              <th>Campaign ID</th>
              <th>Campaign Name</th>
              <th>Enterprise Name</th>
              <th>Attempts</th>
              <th>Active</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr>
                <td>{item.rid}</td>
                <td>{item.CamapaignName}</td>
                <td>{item.CustomerName}</td>
                <td>{item.Attemps}</td>
                <td>
                  {item.Active ? (
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

export default SalesCampaignReport;
