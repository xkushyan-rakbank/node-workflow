import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { ContainedButton } from "../../components/Buttons/ContainedButton";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import routes from "../../routes";

import { useStyles } from "./styled";

import { ReactComponent as Arrow } from "../../assets/icons/whiteArrow.svg";

export default function NotFoundPage() {
  const history = useHistory();
  const classes = useStyles();
  const { notFound } = useIconsByAccount();
  useFormNavigation([false, false]);
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
