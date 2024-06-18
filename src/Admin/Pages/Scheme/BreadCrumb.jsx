import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item as={Link} to="/scheme/viewscheme">
        All Schemes
      </Breadcrumb.Item>
      <Breadcrumb.Item as={Link} to="/activescheme">
        Active Schemes
      </Breadcrumb.Item>
      <Breadcrumb.Item as={Link} to="/addscheme">
        Add Scheme
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;
