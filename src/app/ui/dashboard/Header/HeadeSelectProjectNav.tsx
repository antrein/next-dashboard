'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Nav, NavItem, NavLink, Modal, Button } from "react-bootstrap";
import Link from "next/link";

export default function HeaderSelectProjectNav() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your project selection form or content here */}
          <p>Here you can select your project.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

