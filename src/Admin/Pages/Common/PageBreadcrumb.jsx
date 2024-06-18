import React from 'react';
import classNames from 'classnames';
import { Breadcrumb } from 'react-bootstrap';

const PageBreadcrumb = ({ items, className }) => {
  return (
    <Breadcrumb className={classNames(className, 'mb-2')}>
      {items.map(item => (
        <Breadcrumb.Item href={item.url} active={item.active} key={item.label}>
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
