import React from 'react';
import Select, { components } from 'react-select';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStateManager } from 'react-select';

const ClearIndicator = (props) => {
  const { innerProps: { ref, ...restInnerProps } } = props;
  return (
    <div {...restInnerProps} ref={ref} className="me-2">
      <div className="text-primary fs-9">clear</div>
    </div>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faAngleDown} className="fs-9 text-body" />
    </components.DropdownIndicator>
  );
};

const ReactSelect = ({ icon, ...rest }) => {
  return (
    <div className="react-select-container">
      <Select
        closeMenuOnSelect={false}
        components={{ ClearIndicator, DropdownIndicator }}
        classNamePrefix="react-select"
        className={{ control: icon ? 'ps-5' : '', placeholder: icon ? 'ps-2' : '' }}
        {...rest}
      />
      {icon}
    </div>
  );
};

export default ReactSelect;
