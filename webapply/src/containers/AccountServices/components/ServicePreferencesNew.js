import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  AutoSaveField as Field,
  InlineRadioGroup,
  SelectAutocomplete
} from "../../../components/Form";
import { ContexualHelp } from "../../../components/Notifications";
import { yesNoOptions } from "../../../constants/options";
import { updateProspect } from "../../../store/actions/appConfig";
import { useStyles } from "../styled";

export const ServicePreferences = ({ values, setFieldValue, isIslamic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRecieveInterestChange = useCallback(event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    setFieldValue(name, value);
    dispatch(
      updateProspect({
        "prospect.accountInfo.receiveInterest": value
      })
    );
  });

  const filteredBranches = useCallback(
    options => {
      /* istanbul ignore next */
      return options
        .filter(city => city.code === values.accountEmirateCity)
        .reduce((acc, curr) => (curr.subGroup ? [...acc, ...curr.subGroup] : acc), []);
    },
    [values.accountEmirateCity]
  );

  return (
    <div data-testid="servicePreferenceWrapper">
      <Field
        name="accountCurrency"
        path={"prospect.accountInfo.accountCurrency"}
        label="Account currency"
        placeholder="Account currency"
        datalistId="accountCurrencies"
        component={SelectAutocomplete}
        disabled={true}
        dataTestid="accountCurrencyField"
      />
      <Field
        name="accountEmirateCity"
        path={"prospect.accountInfo.accountEmirateCity"}
        label="Emirate or City"
        placeholder="Emirate or City"
        datalistId="branchCity"
        component={SelectAutocomplete}
        isLoadDefaultValueFromStore={false}
      />
      <Field
        name="branchId"
        path={"prospect.accountInfo.branchId"}
        label="Branch"
        placeholder="Branch"
        datalistId="branchCity"
        component={SelectAutocomplete}
        filterOptions={options => filteredBranches(options)}
      />
      {!isIslamic && (
        <div className={classes.questionareWrapper} data-testid="receiveInterestFieldWrapper">
          <label className={classes.sectionLabel}>
            Do you want to earn interest on this account?
            <ContexualHelp
              title={
                "Get the most out of your money. Just maintain\n the minimum account balance to unlock\n competitive interest rates."
              }
              placement="right"
              isDisableHoverListener={false}
              classes={classes.infoIcon}
            >
              <HelpOutlineIcon className={classes.infoIcon} />
            </ContexualHelp>
          </label>
          <Field
            typeRadio
            options={yesNoOptions}
            name="receiveInterest"
            path={"prospect.accountInfo.receiveInterest"}
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={handleRecieveInterestChange}
          />
        </div>
      )}
    </div>
  );
};
