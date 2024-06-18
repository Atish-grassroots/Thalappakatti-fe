import { useEffect, useState } from "react";
import useCampaign from "../Campaign/hook";
import {
  Col,
  Form,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { Chart } from "primereact/chart";
import { PaginationControl } from "react-bootstrap-pagination-control";

const CampaignReport = (filterDate) => {
  const [{ getCampaignData }] = useCampaign();
  const [campaignData, setCampaignData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [chartData, setChartData] = useState({});
  const fetchData = async () => {
    try {
      const response = await getCampaignData();

      const openOffers = response?.data?.message.filter((item) => item.Active);
      const closedOffers = response?.data?.message.filter(
        (item) => !item.Active
      );
      setCampaignData(response?.data?.message);
      setOpenCount(openOffers.length);
      setClosedCount(closedOffers.length);
      console.log(response.data.message);

      const chartLabels = response?.data?.message.map(
        (offer) => offer.CampaignType
      );

      const chartDataDiscount = response?.data?.message.map(
        (offer) => offer.DiscountPercentage
      );

      const chartDataUsageCount = response?.data?.message.map(
        (offer) => offer.UsageCount
      );

      const chartDataMinimumTurnover = response?.data?.message.map(
        (offer) => offer?.Applicability?.MinmumTurnOver
      );

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Discount Percentage",
            data: chartDataDiscount,
            backgroundColor: "#007bff",
          },
          {
            label: "Usage Count",
            data: chartDataUsageCount,
            backgroundColor: "#28a745",
          },
          {
            label: "Minimum Turnover",
            data: chartDataMinimumTurnover,
            backgroundColor: "#dc3545",
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterByStatus = (status) => {
    switch (status) {
      case "Open":
        setFilteredData(campaignData?.filter((item) => item.Active));
        break;
      case "Closed":
        setFilteredData(campaignData?.filter((item) => !item.Active));
        break;
      default:
        setFilteredData(campaignData);
    }
    setCurrentPage(1); // Reset to first page after filter change
  };

  useEffect(() => {
    setFilteredData(
      campaignData.filter((item) =>
        item.Title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, campaignData]);
  useEffect(() => {
    if (
      !filterDate?.date ||
      !filterDate?.date[0] ||
      !filterDate?.date[1] ||
      !campaignData
    ) {
      return;
    }

    const startfilterDateString = filterDate?.date[0].toISOString();
    const endfilterDateString = filterDate?.date[1].toISOString();

    const filteredData = campaignData.filter((item) => {
      const campaignStartDate = new Date(item.StartDate).toISOString();
      const campaignEndDate = new Date(item.EndDate).toISOString();
      return (
        startfilterDateString <= campaignEndDate &&
        endfilterDateString >= campaignStartDate
      );
    });

    setFilteredData(filteredData);

    const chartLabels = filteredData.map((offer) => offer.Title);
    const chartDataDiscount = filteredData.map(
      (offer) => offer.DiscountPercentage
    );
    const chartDataUsageCount = filteredData.map((offer) => offer.UsageCount);
    const chartDataMinimumTurnover = filteredData.map(
      (offer) => offer?.Applicability?.MinmumTurnOver
    );

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Discount Percentage",
          data: chartDataDiscount,
          backgroundColor: "#007bff",
        },
        {
          label: "Usage Count",
          data: chartDataUsageCount,
          backgroundColor: "#28a745",
        },
        {
          label: "Minimum Turnover",
          data: chartDataMinimumTurnover,
          backgroundColor: "#dc3545",
        },
      ],
    });
  }, [filterDate, campaignData]);

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
      <Table striped bordered hover responsive>
        <thead>
          <h4 className="fw-bold">Campaign Summary Report</h4>
          <tr>
            <th className="text-center d-sm-none d-md-table-cell">
              Campaign ID
            </th>
            <th className="text-center">Campaign Name</th>

            <th className="text-center d-sm-none d-md-table-cell">
              Campaign Type
            </th>
            <th className="text-center d-sm-none d-md-table-cell">
              Start date
            </th>
            <th className="text-center d-sm-none d-md-table-cell">End date</th>
            <th className="text-center">Discount</th>
            <th className="text-center">Active</th>
          </tr>
        </thead>
        <tbody>
          {/* {JSON.stringify(currentItems)} */}
          {currentItems.map((item) => (
            <tr>
              <td className="text-center">
                {item.CampaignId}
              </td>
              <td className="text-center">{item.Title}</td>
              <td className="text-center">{item.CampaignType}</td>
              <td className="text-center d-sm-none d-md-table-cell">
                {item.StartDate &&
                  new Date(item.StartDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </td>
              <td className="text-center d-sm-none d-md-table-cell">
                {item.EndDate &&
                  new Date(item.EndDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </td>
              <td className="text-center">{item.DiscountPercentage}</td>
              <td className="text-center">
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
      <Row className="mt-3">
        <Col xs={12}>
          <Form.Label className="fw-bold text-primary text-center fs-5">
            Campaign Analytics
          </Form.Label>
          <div className="mt-3" style={{ height: "400px" }}>
            <Chart type="bar" data={chartData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignReport;
