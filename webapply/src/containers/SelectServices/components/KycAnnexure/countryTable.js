import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  //TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useStyles, BootstrapInput } from "./styled";
import { yesNoOptions } from "../../../../constants/options";
import { setInitialCheck, updateProspect } from "../../../../store/actions/appConfig";

export const TableComponent = ({ data, datalist, content }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [__data, __setData] = useState({
    poaCountry: [],
    riskIndustries: [],
    clientDealingCountry: [],
    goAmlIndustry: []
  });

  const TEXTS = {
    POA: "poaCountry",
    RISK_INDS: "riskIndustries",
    CL_COUNTRIES: "clientDealingCountry",
    GO_AML_INDUSTRY: "goAmlIndustry"
  };

  useEffect(() => {
    const { POA, RISK_INDS, CL_COUNTRIES, GO_AML_INDUSTRY } = TEXTS;
    return content == POA
      ? __setData({ [POA]: data })
      : content == RISK_INDS
      ? __setData({ riskIndustries: data })
      : content == CL_COUNTRIES
      ? __setData({ [CL_COUNTRIES]: data })
      : content == GO_AML_INDUSTRY
      ? __setData({ [GO_AML_INDUSTRY]: data })
      : null;
  }, [data]);

  useEffect(() => {
    dispatch(
      updateProspect({
        [`prospect.kycAnnexure.${content}`]: __data[content]
      })
    );
  }, [__data]);

  const handleChange = (e, item) => {
    dispatch(setInitialCheck({ [content]: true }));
    if (e.target.value === "Yes") {
      __setData({ [content]: [...__data[content], item.value] });
    } else {
      __setData({
        [content]: __data[content].filter(i => i !== item.value)
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader className={classes.table} aria-label="Search results table">
          <TableBody>
            {datalist.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.displayText}</TableCell>
                <TableCell align="center">
                  <Select
                    value={__data[content] && __data[content].includes(item.value) ? "Yes" : "No"}
                    onChange={e => handleChange(e, item)}
                    input={<BootstrapInput />}
                  >
                    {yesNoOptions.map(i => (
                      <MenuItem value={i.label} key={i.code}>
                        {i.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
