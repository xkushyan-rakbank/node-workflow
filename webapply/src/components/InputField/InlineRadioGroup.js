import React from "react";
import cx from "classnames";
import get from "lodash/get";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateField } from "../../store/actions/appConfig";

const styles = {
  wrapper: {
    width: "100%"
  },
  inlineFormControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "nowrap",
    margin: "10px 0",
    "& > .box-group-grid": {
      marginLeft: "40px"
    }
  },
  label: {
    marginRight: "42px"
  }
};

class RadiobuttonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: get(props.value, [])
    };
  }

  handleChange = event => {
    const value = JSON.parse(event.target.value);
    console.log(this.props.name, value);
    this.props.updateField({
      value,
      name: this.props.name
    });
  };

  render() {
    const {
      name,
      value,
      classes = {},
      config: { datalist = [], required, error, label }
    } = this.props;

    return (
      <FormControl error={error} required={required} className={classes.wrapper}>
        <RadioGroup
          name={name}
          className={cx(classes.inlineFormControl, "smallText")}
          value={value}
          onChange={this.handleChange}
        >
          {label}
          <div className="box-group-grid">
            {datalist.map(item => (
              <FormControlLabel
                key={item.key}
                value={item.value}
                control={<Radio color="secondary" />}
                label={item.displayText}
              />
            ))}
          </div>
        </RadioGroup>
      </FormControl>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateField
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RadiobuttonGroup);
