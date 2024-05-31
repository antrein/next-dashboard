"use client";
import { Col, Row, Form, Button } from "react-bootstrap";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const selectedProject = Cookies.get("project");
  const [formData, setFormData] = useState({
    project_id: "",
    queue_page_style: "base",
    queue_page_base_color: "",
    queue_page_title: "",
    image: null,
    file: null,
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const auth = Cookies.get("auth");
        if (!auth) {
          console.error("No authorization token found");
          return;
        }
        const authParsed = JSON.parse(auth);
        const { token } = authParsed;

        const response = await fetch(
          `https://api.antrein.com/bc/dashboard/project/detail/${selectedProject}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();

        const data = jsonData.data;
        if (data) {
          console.log({ data });
          setFormData({
            project_id: data.id,
            queue_page_style: data.configuration.queue_page_style,
            queue_page_base_color: data.configuration.queue_page_base_color,
            queue_page_title: data.configuration.queue_page_title,
            image: null,
            file: null,
          });
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    if (selectedProject) {
      fetchProjectDetails();
    }
  }, [selectedProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const auth = Cookies.get("auth");
      if (!auth) {
        console.error("No authorization token found");
        return;
      }
      const authParsed = JSON.parse(auth);
      const { token } = authParsed;

      const formDataToSend = new FormData();
      formDataToSend.append("project_id", formData.project_id);
      if (formData.image) formDataToSend.append("image", formData.image);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      } else {
        formDataToSend.append("queue_page_style", formData.queue_page_style);
        formDataToSend.append(
          "queue_page_base_color",
          formData.queue_page_base_color
        );
        formDataToSend.append("queue_page_title", formData.queue_page_title);
      }

      const response = await fetch(
        `https://api.antrein.com/bc/dashboard/project/style`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Project updated successfully");
      } else {
        toast.error((data as any)?.error);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Project Configuration</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          ></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="project_id">
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                type="text"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="queue_page_title">
              <Form.Label>Queue Page Title</Form.Label>
              <Form.Control
                type="text"
                name="queue_page_title"
                value={formData.queue_page_title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group controlId="file">
              <Form.Label>HTML File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleChange}
                accept=".html"
              />
            </Form.Group>
            {!formData.file && (
              <>
                <Form.Group controlId="queue_page_style">
                  <Form.Label>Queue Page Style</Form.Label>
                  <Form.Control
                    as="select"
                    name="queue_page_style"
                    value={formData.queue_page_style}
                    onChange={handleChange}
                  >
                    <option value="base">Base</option>
                    <option value="custom">Custom</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="queue_page_base_color">
                  <Form.Label>Queue Page Base Color</Form.Label>
                  <Form.Control
                    type="color"
                    name="queue_page_base_color"
                    value={formData.queue_page_base_color}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Toaster />
    </>
  );
}
