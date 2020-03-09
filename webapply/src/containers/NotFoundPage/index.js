import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { ReactComponent as Arrow } from "../../assets/icons/whiteArrow.svg";
import { ContainedButton } from "../../components/Buttons/ContainedButton";
import routes from "../../routes";

export default function NotFoundPage() {
  const history = useHistory();
  const classes = useStyles();
  const { notFound } = useIconsByAccount();
  const handleGoToHomePage = useCallback(() => {
    history.push(routes.accountsComparison);
  }, [history]);

  return (
    <div className={classes.appStatus}>
      <img src={notFound} alt="NotFound" width="auto" height={232} />
      <p>Sorry, we couldn’t find that page.</p>
      <ContainedButton
        label={
          <span className={classes.buttonText}>
            Go to homepage <Arrow alt="arrow" />
          </span>
        }
        handleClick={handleGoToHomePage}
      />
    </div>
  );
}
