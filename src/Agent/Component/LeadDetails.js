import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const LeadDetails = () => {
    const [key, setKey] = useState('details');
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:42400/UploadData/collectionDetails');
                setCustomerDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader className="fw-bold" style={{ backgroundColor: "rgb(245 245 244)", marginBottom: "8px" }}>
                Customer Information
            </CardHeader>
            <Tabs
                id="lead-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="details" title="Lead Details">
                    <CardBody style={{ height: "52vh", overflowY: "auto" }}>
                        <div className="row">
                            <div className="col-md-12" style={{ padding: "5px 10%", borderLeft: "5px solid #198754" }}>
                                {customerDetails.map((item, index) => (
                                    <div key={index}>
                                        {Object.keys(item).filter(key => key !== '_id' && key !== 'uploadId').map((key) => (
                                            <h6 key={key}>
                                                {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: 
                                                <span style={{ float: 'right' }}>{item[key]}</span>
                                            </h6>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardBody>
                </Tab>
                <Tab eventKey="history" title="Lead History">
                    <CardBody style={{ height: "52vh", overflowY: "auto" }}>
                        <p>Lead history data and interactions will be displayed here.</p>
                    </CardBody>
                </Tab>
            </Tabs>
        </Card>
    );
};

export default LeadDetails;