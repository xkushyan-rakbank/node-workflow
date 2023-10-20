import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as InformationIcon } from "../assets/icons/information.svg";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: ({ showInLineError }) => ({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontWeight: "400",
    color: "#757575",
    marginTop: "10px",
    position: showInLineError ? "absolute" : "unset",
    flexWrap: showInLineError ? "nowrap" : "unset",
    "& div": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "pre-line"
    }
  }),
  informationDisclaimer: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-line",
    marginRight: "auto",
    gap: "8px"
  },
  main: {
    display: "flex",
    flexDirection: "row-reverse"
  }
});

export const FieldDescription = ({
  title,
  fieldValueLength,
  fieldMaxLength,
  showTitleIcon,
  iconWidth = 14,
  iconHeight = 14,
  showInLineError
}) => {
  const classes = useStyles({ showInLineError });
  const isMobile = useMediaQuery("(max-width: 767px") || window.innerWidth <= 768;
  const iconSize = isMobile
    ? { width: iconWidth, height: iconHeight }
    : { width: "14px", height: "14px" };

  return (
    <div className={`${showInLineError ? classes.main : ""}`}>
      <div className={classes.wrapper}>
        <div className={classes.informationDisclaimer}>
          {title && (
            <>
              <InformationIcon {...iconSize} />
              {title}
            </>
          )}
        </div>
        {fieldMaxLength && (
          <div>
            {fieldValueLength}&nbsp;/&nbsp;{fieldMaxLength}
          </div>
        )}
      </div>
    </div>
  );
};
