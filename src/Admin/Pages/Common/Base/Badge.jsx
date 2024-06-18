import classNames from 'classnames';
import { Badge as BsBadge } from 'react-bootstrap';

const Badge = ({
  children,
  bg,
  icon,
  className,
  variant = 'default',
  iconPosition = 'start',
  iconFamily = 'feather',
  ...rest
}) => {
  return (
    <BsBadge
      className={classNames(className, {
        [`badge-phoenix badge-phoenix-${bg}`]: variant === 'phoenix',
        'badge-tag': variant === 'tag'
      })}
      bg={['phoenix', 'tag'].includes(variant) ? '' : bg}
      {...rest}
    >
      {variant === 'phoenix' ? (
        <>
          {icon ? (
            <>
              {icon && iconPosition === 'start' && icon}
              <span
                className={classNames({
                  'badge-label': iconFamily === 'feather'
                })}
              >
                {children}
              </span>
              {icon && iconPosition === 'end' && icon}
            </>
          ) : (
            children
          )}
        </>
      ) : (
        children
      )}
    </BsBadge>
  );
};

export default Badge;
