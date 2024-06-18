import React from 'react';
import classNames from 'classnames';
import { Button as BsButton, Spinner } from 'react-bootstrap';

export const ButtonVariant = [
  '',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'light',
  'link',
  'circle',
  'outline-primary',
  'outline-secondary',
  'outline-success',
  'outline-danger',
  'outline-warning',
  'outline-info',
  'outline-dark',
  'outline-light',
  'phoenix-primary',
  'phoenix-secondary',
  'phoenix-success',
  'phoenix-danger',
  'phoenix-warning',
  'phoenix-info',
  'phoenix-dark',
  'phoenix-light',
  'subtle-primary',
  'subtle-secondary',
  'subtle-success',
  'subtle-danger',
  'subtle-warning',
  'subtle-info',
  'subtle-dark',
  'subtle-light',
  'loading'
];

const Button = ({
  children,
  startIcon,
  endIcon,
  loading,
  loadingPosition,
  className,
  variant = '',
  ...rest
}) => {
  return (
    <BsButton
      variant={variant}
      type="button"
      disabled={loading}
      {...rest}
      className={classNames(className, {
        'btn-loading lh-1 d-flex align-items-center position-relative': loading
      })}
    >
      {loading && loadingPosition === 'start' && (
        <Spinner animation="border" role="status" className="me-2">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {startIcon &&
        React.cloneElement(startIcon, {
          className: classNames(startIcon.props.className, 'me-1')
        })}
      {children}
      {endIcon &&
        React.cloneElement(endIcon, {
          className: classNames(endIcon.props.className, 'ms-1')
        })}
      {loading && loadingPosition === 'end' && (
        <Spinner animation="border" role="status" className="ms-2">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </BsButton>
  );
};

export default Button;
