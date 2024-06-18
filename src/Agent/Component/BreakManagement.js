import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import relayService from '../../Admin/AppProviders/Axios/hook';
import { jwtDecode } from 'jwt-decode';

const BreakManagement = ({ isVisible }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [buttonText, setButtonText] = useState('Break In');
    const [buttonColor, setButtonColor] = useState('primary');

    const handleBreakOut = async () => {
        if (buttonText === 'BreakOut') {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);

            try {
                const response = await relayService({
                    url: '/Biometrics/BreakOut',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        TenantId: 0,
                        Email: decoded.userId.Email
                    }
                });
                toast.success('Break Out successful!');
                resetBreakState();
            } catch (error) {
                toast.error('Error during Break Out.');
            }
        } else {
            setModalOpen(true);
        }
    };

    const handleBreak = async () => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const breakType = selectedOption;

        try {
            const response = await relayService({
                url: '/Biometrics/BreakIn',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    TenantId: 0,
                    Email: decoded.userId.Email,
                    StatusType: breakType
                }
            });
            toast.success('Break In successful!');
            setButtonText('BreakOut');
            setButtonColor('success');
            setModalOpen(false);
            localStorage.setItem('onBreak', breakType);
        } catch (error) {
            toast.error('Error during Break In.');
        }
    };

    const resetBreakState = () => {
        setButtonText('Break In');
        setButtonColor('primary');
        setSelectedOption('');
        setModalOpen(false);
        localStorage.removeItem('onBreak');
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        const onBreak = localStorage.getItem('onBreak');
        if (onBreak) {
            setSelectedOption(onBreak);
            setButtonText('BreakOut');
            setButtonColor('success');
        }
    }, []);

    return (
        <>
            {isVisible && (
                <Button onClick={handleBreakOut} variant={buttonColor}>
                    {buttonText}
                </Button>
            )}
            <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Break Option</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex gap-3">
                        <Form.Check
                            type="radio"
                            id="lunch"
                            label="Lunch"
                            name="breakOption"
                            value="LUNCH"
                            checked={selectedOption === 'LUNCH'}
                            onChange={handleOptionChange}
                        />
                        <Form.Check
                            type="radio"
                            id="tea"
                            label="Tea"
                            name="breakOption"
                            value="TEA"
                            checked={selectedOption === 'TEA'}
                            onChange={handleOptionChange}
                        />
                        <Form.Check
                            type="radio"
                            id="shortBreak"
                            label="Short Break"
                            name="breakOption"
                            value="SHORTBREAK"
                            checked={selectedOption === 'SHORTBREAK'}
                            onChange={handleOptionChange}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleBreak}>
                        Break In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BreakManagement;