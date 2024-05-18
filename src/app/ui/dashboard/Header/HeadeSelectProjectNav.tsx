import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";

export default function HeaderSelectProjectNav() {
  return (
    <Nav>
      <NavItem>
        <Link href="#" passHref legacyBehavior>
          <NavLink className="p-2 border border-gray-300 rounded">
            Select Project <FontAwesomeIcon icon={faCaretDown} />
          </NavLink>
        </Link>
      </NavItem>
    </Nav>
  );
}
