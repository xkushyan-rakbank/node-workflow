export const styles = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    },
    "& fieldset": {
      "@media all and (-ms-high-contrast: active), (-ms-high-contrast: none)": {
        top: "0"
      }
    }
  },
  selectFieldBasic: {
    position: "relative",
    "&::after": {
      content: "''",
      position: " absolute",
      width: " 1px",
      height: " 100%",
      backgroundColor: " #ddd",
      right: " 56px",
      top: 0,
      zIndex: "1"
    },
    "& > div:first-child": {
      paddingRight: "56px"
    },
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      position: "absolute",
      right: "20px"
    }
  },
  selectFieldCombined: {
    width: "93px !important",
    position: "absolute",
    zIndex: 1,
    "& label": {
      maxWidth: "unset"
    },
    "& fieldset": {
      borderColor: "transparent",
      borderRight: "1px solid #dddddd !important"
    },
    "& svg": {
      right: "10px"
    },
    "& input": {
      paddingLeft: 0
    },
    "& legend": {
      marginLeft: 0
    },
    "& .MuiSelect-select.Mui-disabled": {
      backgroundColor: "transparent !important"
    }
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
};
