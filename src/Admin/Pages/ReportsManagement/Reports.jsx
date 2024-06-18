import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import schemeHook from "../Scheme/hook";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Chart } from "primereact/chart";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GrPowerReset } from "react-icons/gr";
import CampaignReport from "./CampaignReport";
import * as XLSX from "xlsx";
import CDR_Report from "./CDR_Report";
import { PaginationControl } from "react-bootstrap-pagination-control";
import SalesCampaignReport from "./SalesCampaignReport";
import OrdersReport from "./OrdersReport";
import LoyalityReport from "./LoyalityReport";
import TicketReport from "./TicketReport";
import CustomersReport from "./CustomersReport";
import UsersReport from "./UsersReport";

const Reports = () => {
  const [{ getOfferDetails }] = schemeHook();
  const [search, setSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);
  const [offerDetails, setOfferDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});

  const options = [
    {
      value: 1,
      label: "Offer Report",
    },
    {
      value: 2,
      label: "Campaign Report",
    },
    {
      value: 3,
      label: "CDR Report",
    },
    {
      value: 4,
      label: "Sales Campaign Report",
    },
    {
      value: 5,
      label: "Orders Report",
    },
    {
      value: 6,
      label: "Loyality Report",
    },
    {
      value: 7,
      label: "Tickets Report",
    },
    {
      value: 8,
      label: "Customers Report",
    },
    {
      value: 9,
      label: "Users Report",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (selectedKey === 1) {
        try {
          const response = await getOfferDetails("0");
          const offerData = response?.data?.message || [];
          const openOffers = offerData.filter((item) => item.Active);
          const closedOffers = offerData.filter((item) => !item.Active);
          setOfferDetails(offerData);
          setOpenCount(openOffers.length);
          setClosedCount(closedOffers.length);

          const chartLabels = offerData.map((offer) => offer.Title);

          const chartDataDiscount = offerData.map(
            (offer) => offer.DiscountPercentage
          );

          const chartDataUsageCount = offerData.map(
            (offer) => offer.UsageCount
          );

          const chartDataMinimumTurnover = offerData.map(
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
          console.error("Error fetching offer details:", error);
        }
      }
    };
    fetchData();
  }, [selectedKey]);

  useEffect(() => {
    setFilteredData(
      offerDetails.filter((item) =>
        item.Title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, offerDetails]);

  useEffect(() => {
    const chartLabels = filteredData.map((offer) => offer.Title);
    const chartDataDiscount = filteredData.map(
      (offer) => offer.DiscountPercentage
    );
    const chartDataUsageCount = filteredData.map((offer) => offer.UsageCount);
    const chartDataMinimumTurnover = filteredData.map(
      (offer) => offer?.Applicability?.MinmumTurnOver || 0
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
  }, [filteredData]);

  useEffect(() => {
    if (!date || !date[0] || !date[1] || !offerDetails) return;

    const startDateString = date[0].toISOString();
    const endDateString = date[1].toISOString();

    const filteredData = offerDetails.filter((item) => {
      const offerStartDate = new Date(item.OStartDate).toISOString();
      const offerEndDate = new Date(item.OEndDate).toISOString();
      return startDateString <= offerEndDate && endDateString >= offerStartDate;
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
  }, [date, offerDetails]);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Copy

  const handleCopy = () => {
    const table = document.querySelector("table");
    const range = new Range();
    range.selectNode(table);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
  };

  const handleCSV = () => {
    const table = document.querySelector("table");
    let csvContent = Array.from(table.querySelectorAll("tr"), (row) =>
      Array.from(
        row.querySelectorAll("td, th"),
        (cell) => `"${cell.textContent.replace(/"/g, '""')}"`
      ).join(",")
    ).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "table_data.csv",
    });
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      Array.from(document.querySelectorAll("table th")).map(
        (th) => th.textContent
      ),
      ...Array.from(document.querySelectorAll("table tbody tr")).map((tr) =>
        Array.from(tr.querySelectorAll("td")).map((td) => td.textContent)
      ),
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  const handlePDF = () => {
    const dataTable = document.querySelector("table");
    if (!dataTable) {
      console.error("DataTable not found");
      return;
    }
    html2canvas(dataTable, { backgroundColor: "#FFFFFF" }).then((canvas) => {
      // Set background color to white
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspectRatio = imgWidth / imgHeight;
      let pdfImgWidth = pdfWidth;
      let pdfImgHeight = pdfWidth / aspectRatio;
      if (pdfImgHeight > pdfHeight) {
        pdfImgHeight = pdfHeight;
        pdfImgWidth = pdfHeight * aspectRatio;
      }

      pdf.setFillColor("#FFFFFF");
      pdf.rect(0, 0, pdfWidth, 40, "F");

      pdf.setTextColor("#000");
      pdf.setFontSize(14);
      const yOffset = 20;
      pdf.addImage(canvas, "PNG", 0, yOffset + 20, pdfImgWidth, pdfImgHeight);
      pdf.save("datatable_data_dark.pdf");
    });
  };

  const handlePrint = () => {
    const dataTable = document.querySelector("table");
    const printWindow = window.open("", "_blank");

    const printContent = `
        <html>
            <head>
                <style>
                    table {
                        font-size: 14px; /* Adjust font size as needed */
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        text-align: left;
                        padding: 8px;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body style="font-size: 16px; padding: 20px;"> <!-- Adjust body font size and padding as needed -->
                ${dataTable.outerHTML}
            </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleReset = () => {
    setSelectedKey(null);
    setDate([]);
  };
  return (
    <Container fluid className="mt-3">
      <Card className="p-3">
        <Row className="CardHeader">
          <h2 className="CardHeader">Reports Dashboard</h2>
        </Row>
        <hr />
        <Row className="mb-3">
          <Col sm={6} md={4}>
            <Form.Group controlId="ReportType">
              <Form.Label>Report Type</Form.Label>
              <br />
              <Dropdown
                value={selectedKey}
                options={options.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
                optionLabel="label"
                optionValue="value"
                filter
                onChange={(e) => {
                  setSelectedKey(e.value);
                  setDate([]);
                }}
                placeholder="Choose a report type"
              />
            </Form.Group>
          </Col>

          {selectedKey !== 4 &&
            selectedKey !== 7 &&
            selectedKey !== 8 &&
            selectedKey !== 9 && (
              <Col sm={6} md={4}>
                <Form.Group controlId="DateFilter">
                  <Form.Label>Choose date for filter</Form.Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Calendar
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      selectionMode="range"
                      maxDate={new Date()}
                      placeholder="start date - end date"
                      readOnlyInput
                    />

                    <Button
                      className="ms-2"
                      variant="primary"
                      onClick={handleReset}
                    >
                      <GrPowerReset />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            )}
        </Row>
        {selectedKey && (
          <Row className="align-items-center mt-3 mt-lg-0 ">
            <Col className="d-flex justify-content-end">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="copy-tooltip">Copy</Tooltip>}
              >
                <Button className="me-2" onClick={handleCopy}>
                  <i className="bi bi-files me-1"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="csv-tooltip">CSV</Tooltip>}
              >
                <Button className="me-2" onClick={handleCSV}>
                  <i className="bi bi-file-earmark-spreadsheet me-1"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="excel-tooltip">Excel</Tooltip>}
              >
                <Button className="me-2" onClick={handleExcel}>
                  <i className="bi bi-file-earmark-excel me-1"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="pdf-tooltip">PDF</Tooltip>}
              >
                <Button className="me-2" onClick={handlePDF}>
                  <i className="bi bi-file-earmark-pdf me-1"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="print-tooltip">Print</Tooltip>}
              >
                <Button onClick={handlePrint}>
                  <i className="bi bi-printer me-1"></i>
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
        )}

        <hr />

        {selectedKey === 2 && <CampaignReport date={date} />}
        {selectedKey === 3 && date !== null && (
          <CDR_Report startEndDate={date} />
        )}
        {selectedKey === 4 && <SalesCampaignReport />}
        {selectedKey === 5 && <OrdersReport date={date} />}
        {selectedKey === 6 && <LoyalityReport date={date} />}
        {selectedKey === 7 && <TicketReport date={date} />}
        {selectedKey === 8 && <CustomersReport date={date} />}
        {selectedKey === 9 && <UsersReport date={date} />}

        {selectedKey === 1 && (
          <div className="table-responsive">
            <Row className="mb-3">
              <Col xs={12} md={6} lg={4}>
                <FormControl
                  type="text"
                  placeholder="Search by offer name"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col
                xs={12}
                md={6}
                lg={4}
                className="d-flex justify-content-md-center align-items-center mt-3 mt-md-0"
              >
                <span
                  className="badge bg-primary me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => filterByStatus("All")}
                >
                  <i className="bi bi-star me-1"></i> All -{" "}
                  {offerDetails?.length}
                </span>
                <span
                  className="badge bg-success me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => filterByStatus("Open")}
                >
                  <i className="bi bi-check-circle me-1"></i> Active -{" "}
                  {openCount}
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
                <h4 className="fw-bold">Offer Summary Report</h4>
                <tr>
                  <th className="text-center d-sm-none d-md-table-cell">
                    Offer Id
                  </th>
                  <th className="text-center">Name of the Scheme</th>

                  <th className="text-center d-sm-none d-md-table-cell">
                    Offer start date
                  </th>
                  <th className="text-center d-sm-none d-md-table-cell">
                    Offer end date
                  </th>
                  <th className="text-center">Number of usage</th>
                  <th className="text-center d-sm-none d-md-table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr>
                    <td className="text-center d-sm-none d-md-table-cell">
                      {item.OfferId}
                    </td>
                    <td className="text-center">{item.Title}</td>
                    <td className="text-center d-sm-none d-md-table-cell">
                      {item.OStartDate &&
                        new Date(item.OStartDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                    </td>
                    <td className="text-center d-sm-none d-md-table-cell">
                      {item.OEndDate &&
                        new Date(item.OEndDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                    </td>
                    <td className="text-center">{item.UsageCount}</td>
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
                  Offers on the basis of month
                </Form.Label>
                <div className="mt-3" style={{ height: "400px" }}>
                  <Chart type="bar" data={chartData} />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Reports;
