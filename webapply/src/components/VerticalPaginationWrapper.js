import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  paginationWrapper: {},
  paginationDots: {
    position: "absolute",
    top: "50vh",
    right: "30px",
    width: "10px",
    transform: "translateY(-50%)"
  },
  paginationDot: {
    width: "10px",
    height: "10px",
    "& + &": {
      marginTop: "15px"
    },
    "&:focus": {
      outline: "none"
    },
    border: 0,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0, .2)"
  }
};

class VerticalPaginationWrapper extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.paginationWrapper}>
        {children}
        <div className={classes.paginationDots}>
          {React.Children.map(children, () => (
            <button className={classes.paginationDot} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(VerticalPaginationWrapper);
