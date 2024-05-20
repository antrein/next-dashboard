'use client'
import { Col, Row, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        project_id: "",
        threshold: 0,
        session_time: 0,
        host: "",
        base_url: "",
        max_users_in_queue: 0,
        queue_start: "",
        queue_end: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here
    };

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <h1>Project Configuration</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="project_id">
                        <Form.Label>Project ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="project_id" 
                            value={formData.project_id} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="threshold">
                        <Form.Label>Threshold</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="threshold" 
                            value={formData.threshold} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="session_time">
                        <Form.Label>Session Time</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="session_time" 
                            value={formData.session_time} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="host">
                        <Form.Label>Host</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="host" 
                            value={formData.host} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="base_url">
                        <Form.Label>Base URL</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="base_url" 
                            value={formData.base_url} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="max_users_in_queue">
                        <Form.Label>Max Users in Queue</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="max_users_in_queue" 
                            value={formData.max_users_in_queue} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="queue_start">
                        <Form.Label>Queue Start</Form.Label>
                        <Form.Control 
                            type="datetime-local" 
                            name="queue_start" 
                            value={formData.queue_start} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="queue_end">
                        <Form.Label>Queue End</Form.Label>
                        <Form.Control 
                            type="datetime-local" 
                            name="queue_end" 
                            value={formData.queue_end} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

