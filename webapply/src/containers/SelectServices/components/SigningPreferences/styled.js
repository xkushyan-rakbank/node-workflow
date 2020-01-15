import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  formWrapper: {
    margin: 0
  },
  addButton: {
    marginTop: "12px"
  },
  buttonWrapper: {
    width: "100%",
    margin: "40px 0",
    display: "flex",
    justifyContent: "flex-end"
  },
  textAreaWrap: {
    width: "328px"
  },
  formControl: {
    marginBottom: "0"
  },
  radioButtonRoot: {
    width: "calc(50% - 20px)"
  },
  confirmingTransaction: {
    position: "relative",
    "& + $confirmingTransaction": {
      paddingTop: "10px",
      marginTop: "10px",
      borderTop: "1px solid #e6e6e680",
      "& $deleteContact": {
        top: "22px"
      }
    }
  },
  deleteContact: {
    top: "0",
    right: "-66px"
  }
});
