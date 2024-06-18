import React, { useEffect, useState, useRef } from "react";
import * as XLSX from 'xlsx';
import Spinner from './Spinner';
import axios from 'axios';
import {
  Table,
  FormControl,
  Pagination,
  Card,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import customerHook from "./hook";
const [{ getCustomerDetails }] = customerHook();

const Upload = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customerDetails, setCustomersDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const fileInputRef = useRef(null);

    const [dataToSend, setDataToSend] = useState('iuiuiuiuj');

    

    
    const handleUpload = async () => {
        if (!file) {
            alert('No file selected');
        } else {
            setLoading(true);
            const reader = new FileReader();
    
            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
    
                setJsonData(JSON.stringify(json, null, 2));
                console.log(JSON.stringify(json, null, 2));
    
                try {
                    const response = await fetch('http://127.0.0.1:42400/UploadData/uploadData', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ data: json, fileName: file.name }), // Send json data and file name
                    });
    
                    if (response.ok) {
                        alert("uploaded successfully");
                        setFile(null); // Clear the file state
                        fileInputRef.current.value = null;
    
                    } else {
                        console.log('Failed to send data to the backend');
                        alert("something went wrong")
                    }
                } catch (error) {
                    console.error('Error sending data to the backend:', error);
                } finally {
                    setLoading(false); // Reset loading state after response
                }
            };
    
            try {
                reader.readAsBinaryString(file);
            } catch (error) {
                setLoading(false);
                console.error('Error reading file:', error);
            }
        }
    };

    const sendDataToBackend = async () => {
        try {
            // Make an HTTP POST request to your backend endpoint
            const response = await axios.post('http://127.0.0.1:42400/UploadData/uploadData', {
                key: 'hello', // Your data to send
                // Add other data as needed
            });

            // Handle the response from the backend
            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };
  // Filtered data based on search query
  const filteredData = customerDetails?.filter((item) =>
    item?.CustomerName?.toLowerCase()?.includes(search?.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle adding new data
  const handleAddData = () => {
    navigate("/customers/customersform/null");
  };
  // Function to handle viewing a user
  const handleView = (CustomerId) => {
    navigate(`/customers/customersform/${CustomerId}`, {
      state: { view: true },
    });
  };

  // Function to handle editing a user
  const handleEdit = (CustomerId) => {
    console.log(CustomerId);
    navigate(`/customers/customersform/${CustomerId}`, {
      state: { edit: true },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetching data from the new API endpoint
      const response = await axios.get('http://localhost:42400/UploadData/getCountData');
      if (response.data && response.data.data) {
        setCustomersDetails(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
};

  return (
    <Container fluid className="mt-3">
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
            className="d-flex justify-content-md-end mt-3 mt-md-0">
                      <label className="label1" htmlFor="">
                    Upload file
                </label>
                <input
                    className="file-input"
                    type="file"
                    accept=".xls, .xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={fileInputRef}
                />
                <br />
             <button className="upload-button" onClick={handleUpload}>
             Upload
                </button>
          </Col>
          {loading && <Spinner />}
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center d-sm-none d-md-table-cell">Sl.No</th>
                <th className="text-center">CustomerName</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Type
                </th>
                <th className="text-center d-sm-none d-md-table-cell">City</th>
                <th className="text-center d-sm-none d-md-table-cell">State</th>
                <th className="text-center d-sm-none d-md-table-cell">
                  Active
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
  {currentItems.map((item, index) => (
    <tr key={item._id}> {/* Use _id for key if it's unique */}
      <td className="text-center">{index + 1}</td> {/* Assuming you want a serial number */}
      <td className="text-center">{item.fileName}</td>
      <td className="text-center">{item.totalCount}</td>
      <td className="text-center">{item.validCount}</td>
      <td className="text-center">
        <Button variant="success" style={{ marginRight: "2px" }} onClick={() => handleView(item._id)}>
          View
        </Button>
        <Button variant="primary" onClick={() => handleEdit(item._id)}>
          Edit
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
    </Container>
  );
};

export default Upload;
