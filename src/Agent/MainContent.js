import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Modal, Row } from "react-bootstrap";
import BreakManagement from "./Component/BreakManagement";
import LeadDetails from "./Component/LeadDetails";
import DispositionForm from "./Component/DispositionForm";
import "./style.css";

const MainContent = () => {
    const [breakInVisible, setBreakInVisible] = useState(true);
    const [formData, setFormData] = useState({});
    const [showLeadDetails, setShowLeadDetails] = useState(true);
    const [showDispositionForm, setShowDispositionForm] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit logic here
        console.log(formData); // Example action: log the formData to console
    };

    useEffect(() => { }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <main
                id="main"
                className="main"
                style={{ marginLeft: "0px", padding: "10px 15px" }}
            >
                <div className="row d-flex">
                    <div className="col-md-12">
                        <div className="" style={{ background: 'whitesmoke', marginTop: "5px",  marginBottom: '15px' }}>
                            <div className=" d-flex justify-content-between">
                                <div>
                                    <span className="badge bg-primary me-2">
                                        <i className="bi bi-star me-1"></i> Total - 10
                                    </span>
                                    <span className="badge bg-success me-2 cursor-pointer">
                                        <i className="bi bi-check-circle me-1"></i> Interaction - 5
                                    </span>
                                    <span className="badge bg-warning text-dark me-2">
                                        <i className="bi bi-exclamation-triangle me-1"></i> Follow Up - 0
                                    </span>
                                    <span className="badge bg-danger me-2">
                                        <i className="bi bi-exclamation-octagon me-1"></i> Pending - 0
                                    </span>
                                </div>
                                {/* <div style={{ backgroundColor: "lightblue", alignSelf: "center" }}>
                                    Status
                                </div> */}
                                <span className="ms-3" style={{ marginLeft: 'auto' }}>
                                    <BreakManagement isVisible={breakInVisible} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card col-md-6">
                        <div className="d-flex justify-content-between ">
                            <div style={{ width: "20%", backgroundColor: "lightblue" }}>
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        color: "black",
                                        marginTop: "17px",
                                    }}
                                >
                                    Status
                                </p>
                            </div>
                            <div
                                className="d-flex justify-content-end gap-2"
                                style={{ marginTop: "12px" }}
                            >
                                <div>
                                    <BreakManagement isVisible={breakInVisible} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="row d-flex">
                    <div className="col-md-6">
                        {showLeadDetails && <LeadDetails />}
                    </div>
                    <div className="col-md-6">
                        {showDispositionForm && <DispositionForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />}
                    </div>
                </div>
            </main>
        </>
    );
};

export default MainContent;