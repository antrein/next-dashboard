'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Nav, NavItem, NavLink, Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import styles from "./HeaderSelectProjectNav.module.css"; // Import the custom CSS

export default function HeaderSelectProjectNav() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([
    { name: "project 1", id: "project-1" },
    { name: "project 2", id: "project-2" }
  ]);
  const router = useRouter();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleNewProject = () => {
    setShowModal(false);
    router.push('/queue/create');
  };

  return (
    <>
      <Nav>
        <NavItem>
          <NavLink
            className="p-2 border border-gray-300 rounded"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          >
            Select Project <FontAwesomeIcon icon={faCaretDown} />
          </NavLink>
        </NavItem>
      </Nav>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName={styles.modalCentered} // Apply the custom class
        centered // Use Bootstrap's centered property
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {projects.map((project, index) => (
              <ListGroupItem key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{project.name}</span>
                  <span>{project.id}</span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNewProject}>
            New Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


  