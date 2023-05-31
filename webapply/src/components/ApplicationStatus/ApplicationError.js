import React from "react";
import { useHistory } from "react-router-dom";
import { Divider } from "@material-ui/core";
import cx from "classnames";
import Button from "@material-ui/core/Button/Button";
import routes from "../../routes";
import { useStyles } from "./styled";
import { ReactComponent as LogoSmallColor } from "../../assets/images/logo-small-color.svg";

//ro-assist-brd2-3
const accountComparisionRoute = {
  link: routes.accountsComparison,
  label: "Back to home"
};
const getFirstLine = text => {
  var index = text.indexOf("$");
  if (index === -1) {
    index = undefined;
    return "";
  } else {
    return text.substring(0, index);
  }
};
const getScondLine = text => {
  var index = text.indexOf("$");
  if (index === -1) {
    index = undefined;
    return text;
  } else {
    return text.substring(index + 1);
  }
};

export const ApplicationError = ({
  icon,
  text,
  link,
  screeningType = "",
  buttons = [accountComparisionRoute]
}) => {
  const classes = useStyles();
  const history = useHistory();
  const redirectTo = (route, external) => {
    if (external) {
      window.location.href = route;
    } else {
      history.push(route);
      window.location.reload();
    }
  };
  return (
    <>
      <header className={cx(classes.header, "small-menu-show")}>
        <LogoSmallColor />
      </header>
      <div className={classes.appErrorStatusMain}>
        <div className={classes.appErrorStatus}>
          <div className={classes.errorMessage}>
            {screeningType !== 403 ? (
              <>
                <div className={classes.title}>{getFirstLine(text)}</div>
                <p className={classes.subTitle}>{getScondLine(text)}</p>
              </>
            ) : (
              <>
                <div className={classes.title}>
                  {"Thank You for chosing our bank assisted application process"}
                </div>
                <div className={cx(classes.info)} dangerouslySetInnerHTML={{ __html: text }} />
              </>
            )}

            <Divider className={classes.divider} />
          </div>
          {/* ro-assist-brd2-3 */}
          {link && (
            <div className={classes.linkErrorWrapper}>
              {buttons.map((btn, index) => (
                <Button
                  key={index}
                  onClick={() => redirectTo(btn.link, btn.external)}
                  className={classes.appErrorLink}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
