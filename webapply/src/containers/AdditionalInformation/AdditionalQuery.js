import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useStyles } from "./styled";
import { AutoSaveField as Field, Input } from "../../components/Form";
import { updateAdditionalInfo } from "../../store/actions/appConfig";

export default function AdditionalQuery({
  additionalInfoDetailsFromBPM,
  additionalInfoDetailsForBPMSetCurrentReq,
  setFieldValue,
  errors
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChange = useCallback((ev, info, setFieldValue) => {
    const { name, value } = ev.target;
    setFieldValue(name, value);
    const newInfo = {
      QueryUniqueID: info.queryUniqueID,
      QueryResponse: value
    };
    if (!errors[name]) {
      dispatch(updateAdditionalInfo({ newInfo, additionalInfoDetailsForBPMSetCurrentReq }));
    }
  }, []);

  return additionalInfoDetailsFromBPM ? (
    additionalInfoDetailsFromBPM.map((info, index) => {
      const queryType = `info_${info.queryUniqueID}`;
      return (
        <div key={index} className={classes.innerCards}>
          <div className={classes.infoType}>
            <div className={classes.infoCont}>
              <span className={classes.infoLabel}>Nature of Enquiry :</span>
              <span className={classes.infoValue}>{info.queryCategory}</span>
            </div>
            <div className={classes.infoCont}>
              <span className={classes.infoLabel}>Enquiry Detail</span>
              <span className={classes.infoValue}>{info.queryType}</span>
            </div>
          </div>
          <div className={classes.infoType}>
            <div className={classes.infoCont}>
              <span className={classes.infoLabel}>Query:</span>
              <span className={classes.infoValue}>{info.queryRemarks}</span>
            </div>
          </div>
          <div className={classes.textArea}>
            <Field
              name={queryType}
              label="Write response:"
              multiline
              minRows="3"
              InputProps={{
                inputProps: { tabIndex: 0, maxLength: 1000, minLength: 100 }
              }}
              onChange={ev => onChange(ev, info, setFieldValue)}
              component={Input}
              classes={{
                formControlRoot: classes.customUrlLabel,
                input: classes.textAreaStyle
              }}
            />
          </div>
        </div>
      );
    })
  ) : (
    <></>
  );
}
