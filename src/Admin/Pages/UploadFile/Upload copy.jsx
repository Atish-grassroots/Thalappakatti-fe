import React from 'react';
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import './Upload.css'; // Import the CSS file
import axios from 'axios';

import Spinner from './Spinner';

export default function Upload() {

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
    return (
        <div className="main-container1">
            <div className="card1">
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

                {loading && <Spinner />} {/* Conditional rendering of Spinner */}


            </div>
        </div>
    );
}

