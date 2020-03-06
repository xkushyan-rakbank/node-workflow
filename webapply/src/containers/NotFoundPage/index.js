import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { ReactComponent as Arrow } from "../../assets/icons/whiteArrow.svg";
import { GoToHomePageButton } from "./components/GoToHomePageButton";
import routes from "../../routes";

export default function NotFoundPage() {
  const history = useHistory();
  const classes = useStyles();
  const labelText = (
    <span className={classes.buttonText}>
      Go to homepage <Arrow alt="arrow" />
    </span>
  );

  const handleGoToHomePage = useCallback(() => {
    history.push(routes.accountsComparison);
  }, [history]);
  const { notFound } = useIconsByAccount();
  return (
    <div className={classes.appStatus}>
      <img src={notFound} alt="NotFound" />
      <p>Sorry, we couldn’t find that page.</p>
      <GoToHomePageButton label={labelText} handleClick={handleGoToHomePage} />
    </div>
  );
}
