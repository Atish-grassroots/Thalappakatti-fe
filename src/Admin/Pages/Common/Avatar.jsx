import React from "react";
import classNames from "classnames";
import avatar from "assets/img/team/40x40/avatar.webp";

const Avatar = ({
  size,
  src,
  variant,
  rounded,
  status,
  className,
  imageClassName,
  thumbnail,
  children,
  placeholder,
}) => {
  return (
    <div
      className={classNames(className, `avatar avatar-${size}`, {
        [`status-${status}`]: status,
      })}>
      {variant === "image" && (
        <img
          src={src ? src : avatar}
          alt="avatar"
          className={classNames(imageClassName, {
            "img-thumbnail bg-body-emphasis": thumbnail,
            "avatar-placeholder": !src || placeholder,
            "rounded-circle": rounded === "circle",
            "rounded-soft": rounded === "soft",
          })}
        />
      )}

      {variant === "name" && (
        <div
          className={classNames("avatar-name", {
            "rounded-circle": rounded === "circle",
            "rounded-soft": rounded === "soft",
          })}>
          <span>{children}</span>
        </div>
      )}
      {variant === "emoji" && (
        <div
          className={classNames("avatar-emoji", {
            "rounded-circle": rounded === "circle",
            "rounded-soft": rounded === "soft",
          })}>
          <span role="img" aria-label="Emoji">
            {children}
          </span>
        </div>
      )}
    </div>
  );
};

export const AvatarGroup = ({ children, className, total, size }) => {
  return (
    <div className={classNames(className, "avatar-group")}>
      {children}
      {total && total > React.Children.count(children) && (
        <Avatar size={size} variant="name">
          +{total - React.Children.count(children)}
        </Avatar>
      )}
    </div>
  );
};

Avatar.Group = AvatarGroup;

export default Avatar;
