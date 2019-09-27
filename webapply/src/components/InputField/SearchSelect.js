import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button/Button";
import Select from "react-select";
import arrowDown from "./../../assets/icons/arrowDown.svg";

const styles = {
  serchSelect: {
    height: "56px",
    borderRadius: "8px",
    border: "solid 1px #e9e9ed",
    backgroundColor: "#ffffff",
    position: "relative"
  },
  serchSelectButton: {
    height: "100%",
    width: "100%",
    textAlign: "left",
    justifyContent: "flex-start",
    padding: "0 14px",
    position: "relative",
    color: "#86868b",
    fontSize: "16px",
    textTransform: "initial",
    backgroundColor: "transparent",
    border: 0,
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "pointer"
    },
    "& img": {
      position: "absolute",
      right: "16px",
      width: "24px",
      top: "50%",
      transform: "translate(0, -50%)"
    },
    "&::after": {
      content: "''",
      position: " absolute",
      width: " 1px",
      height: " 100%",
      backgroundColor: " #ddd",
      top: "0",
      right: " 56px"
    }
  },
  blanket: {
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    position: "fixed",
    zIndex: 0
  },
  selectWrapper: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 4,
    boxShadow: "0 0 0 1px hsla(218, 50%, 10%, 0.1), 0 4px 11px hsla(218, 50%, 10%, 0.1)",
    position: "absolute",
    zIndex: 2
  }
};

const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" })
};

export const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" }
];

// const Blanket = props => <div {...props} />;

class SearchSelect extends React.Component<> {
  state = { isOpen: false, value: undefined };

  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  onSelectChange = value => {
    this.toggleOpen();
    this.setState({ value });
  };

  render() {
    const { isOpen, value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.serchSelect}>
        <button className={classes.serchSelectButton} onClick={this.toggleOpen} type="button">
          {value ? `${value.label}` : "Select a State"}
          <img src={arrowDown} alt="arrowDown" />
        </button>

        {isOpen ? (
          <div className={classes.selectWrapper}>
            <Select
              autoFocus
              backspaceRemovesValue={false}
              components={{ IndicatorSeparator: null }}
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              isClearable={false}
              menuIsOpen
              onChange={this.onSelectChange}
              options={stateOptions}
              styles={selectStyles}
              placeholder="Search..."
              tabSelectsValue={false}
              value={value}
            />
          </div>
        ) : null}

        {/* {isOpen ? <Blanket onClick={this.toggleOpen} className={classes.blanket} /> : null} */}
      </div>
    );
  }
}

export default withStyles(styles)(SearchSelect);
