import React, { useState } from "react";
import classNames from "classnames";
import { Nav } from "react-bootstrap";

const FilterTab = ({ tabItems, className }) => {
  const [activeItem, setActiveItem] = useState("all");

  const handleClick = (item) => {
    setActiveItem(item.value);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Nav className={classNames(className, "nav nav-links mx-n2")}>
      {tabItems.map((item) => (
        <Nav.Item key={item.label}>
          <Nav.Link
            onClick={() => handleClick(item)}
            className={classNames("px-2 py-1", {
              active: activeItem === item.value,
            })}>
            {item.label}{" "}
            <span className="text-body-tertiary fw-semibold">
              ({item.count})
            </span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default FilterTab;
