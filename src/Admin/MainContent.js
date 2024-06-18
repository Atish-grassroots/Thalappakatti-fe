import React, { useEffect, useState } from "react";
import { Modal, Card, Container, Row, Col, Breadcrumb, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { Tooltip as RechartsTooltip } from "recharts";
import {
  Area, AreaChart, Bar, CartesianGrid, ComposedChart,
  Line as ChartLine, XAxis, YAxis, ResponsiveContainer, Legend as ChartLegend, Tooltip as ChartTooltip
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import relayService from "./AppProviders/Axios/hook";
import ReactApexChart from "react-apexcharts";
import { Line } from "react-chartjs-2";
import industryData from "../Admin/Data/IndustryData"
import ResponsiveCard from "../components/ResponsiveCard";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const schemeData = [
  { "Title": "Seasonal Discounts", "MinmumTurnOver": "4,56,000" },
  { "Title": "Buy One, Get One Free (BOGO)", "MinmumTurnOver": "4,23,000" },
  { "Title": "Loyalty Program", "MinmumTurnOver": "3,28,700" },
  { "Title": "Referral Program", "MinmumTurnOver": "2,89,000" },
  { "Title": "Volume Discounts", "MinmumTurnOver": "1,12,000" }
];

const stateData = [
  { name: "Karnataka", Current: 4000, Previous: 2400, Sales: 2400 },
  { name: "Kerala", Current: 7000, Previous: 1398, Sales: 2210 },
  { name: "TamilNadu", Current: 5000, Previous: 2400, Sales: 2400 },
  { name: "Delhi", Current: 2000, Previous: 1398, Sales: 2210 },
  { name: "Punjab", Current: 3000, Previous: 1398, Sales: 2210 },
];

const cityData = [
  { name: "Bengaluru", Current: 3000, Previous: 2400, Sales: 2400 },
  { name: "Mumbai", Current: 5000, Previous: 1398, Sales: 2210 },
  { name: "Chennai", Current: 4000, Previous: 2400, Sales: 2400 },
  { name: "Mysore", Current: 6000, Previous: 1398, Sales: 2210 },
  { name: "Pune", Current: 4500, Previous: 1398, Sales: 2210 },
];

const dataCampaign = [
  { name: "Flash Sale", Current: 5400, Previous: 2400, Sales: 3000 },
  { name: "Customer Appreciation", Current: 3000, Previous: 2210, Sales: 790 },
  { name: " New Product Launch", Current: 2000, Previous: 7290, Sales: 5290 },
  { name: " End-of-Season Clearance", Current: 2780, Previous: 2000, Sales: 780 },
  { name: "Bundle Offer", Current: 1800, Previous: 4800, Sales: 3000 },
];

const salesCampaignData = [
  { name: "Flash Sale Campaign", startDate: '12/05/2024', endDate: '20/05/2024', Sales: 2400 },
  { name: "Customer Appreciation Campaign", startDate: '15/05/2024', endDate: '28/05/2024', Sales: 2210 },
  { name: " New Product Launch Campaign", startDate: '23/05/2024', endDate: '12/06/2024', Sales: 7290 },
  { name: " End-of-Season Clearance", startDate: '05/05/2024', endDate: '30/05/2024', Sales: 2000 },
  { name: "Bundle Offer", startDate: '01/06/2024', endDate: '15/06/2024', Sales: 4800 },
];

const customerData = [
  { name: "ApexCem Cement Producers", Current: 5400, Previous: 2400, Orders: "2400 bags" },
  { name: "SummitStone Cement Ltd.", Current: 3000, Previous: 2210, Orders: "2210 bags" },
  { name: "FortressCem Cement Group", Current: 2000, Previous: 7290, Orders: "7290 bags" },
  { name: "GreenPeak Cement Industries", Current: 2780, Previous: 2000, Orders: "2000 bags" },
  { name: "PrimeStone Cement Works", Current: 1890, Previous: 4800, Orders: "4800 bags" },
];


const MainContent = () => {
  const [selectedValue, setSelectedValue] = useState("Select");
  const [orders, setOrders] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [salesModal, setSalesModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  // const [industryData, setIndustryData] = useState([])

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDropdownSelect = (value) => {
    setSelectedValue(value);
  };

  // const fetchIndustryData = async () => {
  //   try {
  //     const response = await relayService({ url: `/ZAIServices/IndustryData`, method: "GET", data: { TenantId: 0 } });
  //     // setIndustryData(response?.data?.message);
  //   } catch (err) {
  //     console.error("Error fetching orders", err);
  //   }
  // };

  const fetchOrders = async () => {
    try {
      const response = await relayService({ url: `/Offers/`, method: "GET", data: { TenantId: 0 } });
      setOrders(response?.data?.message[0]?.Count);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await relayService({ url: `/Campaigns/`, method: "GET", data: { TenantId: 0 } });
      setCampaign(response?.data?.message[0]?.Count);
    } catch (err) {
      console.error("Error fetching campaigns", err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await relayService({ url: `/Customer/`, method: "GET", data: { TenantId: 0 } });
      setCustomers(response?.data?.message[0]?.Count);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCampaigns();
    fetchCustomers();
    // fetchIndustryData?()
  }, []);


  const handleShowModal = () => setShowModal(true);
  const showSalesModal = () => setSalesModal(true);
  const showCustomerModal = () => setCustomerModal(true);
  const handleCloseModal = () => setShowModal(false);
  const closeSalesModal = () => setSalesModal(false);
  const closeCustomerModal = () => setCustomerModal(false);

  const chartData = [
    { state: 'Maharashtra', sales: 300 },
    { state: 'Karnataka', sales: 250 },
    { state: 'Tamil Nadu', sales: 220 },
    { state: 'Gujarat', sales: 200 },
    { state: 'Rajasthan', sales: 180 },
    { state: 'Uttar Pradesh', sales: 170 },
    { state: 'West Bengal', sales: 160 },
    { state: 'Madhya Pradesh', sales: 150 },
    { state: 'Punjab', sales: 140 },
    { state: 'Bihar', sales: 130 }
  ];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400, // Adjusted height for better visibility
      toolbar: {
        show: false // Hide chart toolbar
      },
      background: 'transparent' // Transparent background
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%', // Increased column width for better visibility
        borderRadius: 5 // Added border radius for a smoother look
      }
    },
    xaxis: {
      categories: chartData.map(item => item.state),
      title: {
        text: 'States',
        style: {
          fontSize: '16px'
        }
      },
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Sales',
        style: {
          fontSize: '16px'
        }
      },
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    title: {
      text: 'State-wise Sales Data - This Year', // Added "This Year" label
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    dataLabels: {
      enabled: true
    },
    colors: ['#5E35B1'] // Changed bar color for better contrast
  };



  const renderGraph = () => {
    const productionData = industryData?.map(item => ({ Month: item.Month, Production: item.Production, Sales: item.Sales, Demand: item.demand }));

    return (
      <div className="custom-graph-container">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={productionData}>
            <XAxis dataKey="Month" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <ChartTooltip />
            <ChartLegend />
            <Bar dataKey="Production" barSize={20} fill="#413ea0" />
            <ChartLine type="monotone" dataKey="Sales" stroke="#ff7300" />
            <ChartLine type="monotone" dataKey="Demand" stroke="#387908" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };


  const data = {
    labels: industryData?.map(item => item.Month),
    datasets: [
      {
        label: 'Population',
        data: industryData?.map(item => item.population),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y1'
      },
      {
        label: 'GDP',
        data: industryData?.map(item => item.gdp),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        yAxisID: 'y2'
      },
      {
        label: 'Disbursement',
        data: industryData?.map(item => item.disbusment),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        yAxisID: 'y2'
      },
      {
        label: 'Interest Rate',
        data: industryData?.map(item => item.interestrate),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left'
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <main id="main" className="main">
      <Container fluid>
        <div className="pagetitle d-flex justify-content-between align-items-center">
          <h1>Dashboard</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <section className="section dashboard">
        

          <Row>
            <Col xs={12} md={6}>
              <Card className="top-selling overflow-auto">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>{selectedValue === "States" ? "Top 5 States" : "Top 5 Cities"}</Card.Title>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <DropdownButton id="dropdown-primary-button" title={selectedValue}>
                        <Dropdown.Item onClick={() => handleDropdownSelect("States")}>States</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDropdownSelect("Cities")}>Cities</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={selectedValue === "States" ? stateData : cityData}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="Current" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                      <Area type="monotone" dataKey="Previous" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6}>
              <Card className="recent-sales overflow-auto">
                <Card.Body>
                  <Card.Title>Top 5 Sales Details</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={dataCampaign}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <CartesianGrid stroke="#f5f5f5" />
                      <Area type="monotone" dataKey="Sales" fill="#8884d8" stroke="#8884d8" />
                      <Bar dataKey="Previous" barSize={10} fill="#413ea0" />
                      <Line type="monotone" dataKey="Current" stroke="#ff7300" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ApexChart component */}
          <Row>
            <Card className="recent-sales overflow-auto">
              <Card.Body>
                <ReactApexChart
                  options={chartOptions}  
                  series={[{ name: 'Sales', data: chartData.map(item => item.sales) }]}
                  type="bar"
                  height={400}
                />
              </Card.Body>
            </Card>
          </Row>
          <Row>

            <Row>
              <Card>
                <Card.Header>
                  <Card.Title>Monthly Data Overview</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Line data={data} options={options} />
                </Card.Body>
              </Card>
            </Row>

            <Row>
              <Col md={12} className="mb-4">
                <Card>
                  <Card.Header>
                    <Card.Title>Monthly Production, Sales, and Demand</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {renderGraph()}
                  </Card.Body>
                </Card>
              </Col>
            </Row>


            <Col xs={12}>
              <Card className="sales-data-table overflow-auto">
                <Card.Body>
                  <Card.Title>Sales Data Table</Card.Title>
                  <hr />
                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <label>Start Date  </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control m-2"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <label>End Date  </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control m-2"
                      />
                    </Col>
                  </Row>
                  <Table striped bordered hover className="text-center custom-table">
                    <thead>
                      <tr>
                        <th>Campaign</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesCampaignData?.map((campaign, index) => (
                        <tr key={index}>
                          <td>{campaign.name}</td>
                          <td>{campaign.startDate}</td>
                          <td>{campaign.endDate}</td>
                          <td>{campaign.Sales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          dialogClassName="custom-modal"
          centered
        >
          {/* <Modal.Body> */}
          <Card className="custom-card scheme-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Scheme Performance</Card.Title>
              <div className="scheme-performance">
                {schemeData.map((scheme, index) => (
                  <div key={index} className="scheme-item">
                    <p><strong>{scheme.Title}</strong></p>
                    <p>{scheme.MinmumTurnOver}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          {/* </Modal.Body> */}
        </Modal>


        {/* Modal for Campaign Performance */}
        <Modal
          show={salesModal}
          onHide={closeSalesModal}
          dialogClassName="custom-modal"
          centered
        >
          {/* <Modal.Body> */}
          <Card className="custom-card campaign-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Campaign Performance</Card.Title>
              <div className="campaign-performance">
                {dataCampaign.map((campaign, index) => (
                  <div key={index} className="campaign-item">
                    <p><strong>{campaign.name}</strong></p>
                    <p>{campaign.Sales}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          {/* </Modal.Body> */}
        </Modal>

        {/* Modal for Customer Performance */}
        <Modal
          show={customerModal}
          onHide={closeCustomerModal}
          dialogClassName="custom-modal"
          centered
        >
          {/* <Modal.Body> */}
          <Card className="custom-card customer-card">
            <Card.Body className="d-flex justify-content-center align-items-center flex-column">
              <Card.Title className="text-center mb-4">Distributors / Retailer</Card.Title>
              <div className="customer-performance">
                {customerData.map((campaign, index) => (
                  <div key={index} className="customer-item">
                    <p><strong>{campaign.name}</strong></p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          {/* </Modal.Body> */}
        </Modal>
      </Container>
    </main>
  );
};

export default MainContent;
