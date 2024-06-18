import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  FormControl,
  Pagination,
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import useCampaign from "./hook";

const Campaign = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState([]); // State to hold API data
  const [{ getCampaignData, generateCampaign }] = useCampaign();
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedCampaign, setSelectedCampaign] = useState(null); // State for the selected campaign
  const [totalOrderValue, setTotalOrderValue] = useState(""); // State for TotalOrderValue

  const fetchData = async () => {
    try {
      const response = await getCampaignData();
      setData(response?.data?.message);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d?.getFullYear();
      const month = String(d?.getMonth() + 1).padStart(2, "0");
      const day = String(d?.getDate())?.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const dataToSend = {
      TenantId: 0,
      TotalOrderValue: parseFloat(totalOrderValue),
      CamapaignName: selectedCampaign.Title,
      CampaignId: selectedCampaign.CampaignId,
      // SalesDate: formatDate(new Date()),
      // StartDate: formatDate(selectedCampaign.StartDate),
      // EndDate: formatDate(selectedCampaign.EndDate),
    };

    console.log("dataToSend::", dataToSend);

    try {
      const response = await generateCampaign(dataToSend);
      setData(response?.data?.message);
      console.log(response?.data?.message);
      setShowModal(false);
      fetchData();

      setTotalOrderValue("");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filtered data based on search query
  const filteredData = data?.filter((item) =>
    item?.Title?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (campaignDetails) => {
    navigate(`/campaign/createcampaign`, {
      state: { view: true, data: campaignDetails },
    });
  };

  // Handle file upload
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        // You can process the jsonData as needed
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container fluid className="mt-3">
      <Card className="p-3">
        <Row className="CardHeader">
          <Col>Custom Campaigns</Col>
        </Row>
        <hr />
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
            <Button
              className="mx-2"
              variant="primary"
              onClick={() => navigate("/campaign/createcampaign")}>
              Add
            </Button>
            <Button variant="primary" onClick={handleUploadClick}>
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
            />
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Campaign Id</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((campaign) => (
                <tr >
                  <td>{campaign.CampaignId}</td>
                  <td>{campaign.Title}</td>
                  <td>{new Date(campaign.StartDate).toLocaleDateString()}</td>
                  <td>{new Date(campaign.EndDate).toLocaleDateString()}</td>
                  <td>{campaign.DiscountPercentage}%</td>
                  <td>
                    <Button
                      variant="success"
                      style={{ marginRight: "2px" }}
                      onClick={() => handleGenerateCampaign(campaign)}>
                      Generate
                    </Button>
                    <Button
                      variant="success"
                      style={{ marginRight: "2px" }}
                      onClick={() => handleView(campaign)}>
                      View
                    </Button>
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

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Minimum Order Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="number"
            value={totalOrderValue}
            onChange={(e) => setTotalOrderValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Campaign;
