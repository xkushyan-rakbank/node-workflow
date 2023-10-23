import React, { memo } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";

import { theme } from "../../theme";
import { ICONS, Icon } from "../Icons";
import { getIsSendingProspect } from "../../store/selectors/sendProspectToAPI";

export const ArrowBack = styled(Icon)({
  width: "18px"
});

export const Root = styled(Link)({
  marginRight: "20px",
  display: "flex",
  alignItems: "center"
});

export const Text = styled("span")({
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "underline"
});

Text.defaultProps = {
  style: theme.palette.text
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "underline",
    color: "#1F1F1F",
    "& .arrowIcon": {
      fill: "#1F1F1F",
      "& path": {
        fill: "#1F1F1F"
      }
    }
  },
  linkContainerBtn: {
    display: "flex",
    background: "#fff",
    border: "none",
    textDecoration: "none",
    gap: "5px",
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: "18px",
    fontStyle: "normal",

    [theme.breakpoints.up("sm")]: {
      padding: "10px 40px",
      alignItems: "center",
      gap: "8px",
      borderRadius: "100px",
      border: "1px solid #3B3A3A",
      color: "#3B3A3A",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "28px"
    },

    "& .arrowIcon": {
      fill: "#3B3A3A",
      "& path": {
        fill: "#3B3A3A"
      }
    },
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#1F1F1F",
      "& svg": {
        fill: "#ffffff",
        "& path": {
          fill: "#ffffff"
        }
      }
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "1.125rem",
      padding: "12px 30px",
      lineHeight: "20px"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem",
      padding: "12px 45px"
    }
  }
}));
const BackLinkBase = ({ text = "Back", className = "", path, isTypeButton = false, ...props }) => {
  const isProspectSaving = useSelector(getIsSendingProspect);
  const classes = useStyles();

  const handleLinkClick = ev => {
    if (ev && isProspectSaving) {
      ev.preventDefault();
    }
    props.onClick && props.onClick();
  };

  return (
    <Link
      className={cx(classes.root, { [classes.linkContainerBtn]: isTypeButton })}
      to={path}
      onClick={handleLinkClick}
      replace
      {...props}
    >
      <Icon className="arrowIcon" alt="collapse-icon" name={ICONS.arrowLeft} />
      <span>{text}</span>
    </Link>
  );
};

const areEqual = (prevProps, nextProps) =>
  prevProps.text === nextProps.text &&
  JSON.stringify(prevProps.path) === JSON.stringify(nextProps.path);

export const BackLink = memo(BackLinkBase, areEqual);
