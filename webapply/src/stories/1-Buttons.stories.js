import React from "react";
import { action } from "@storybook/addon-actions";
import { BrowserRouter } from "react-router-dom";
import { styled } from "@material-ui/styles";

import { AddButton } from "../components/Buttons/AddButton";
import { Grid } from "@material-ui/core";
import { BackLink } from "../components/Buttons/BackLink";

export default {
  title: "Buttons"
};

const Container = styled(Grid)({
  marginTop: "15px",
  maxWidth: "800px"
});

const Item = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  border: "dotted 1px black"
});

export const buttons = () => (
  <Container container justify="center" spacing={3}>
    <Item item md={3} sm={2}>
      <AddButton title="Add Button" onClick={action("clicked-add-button")} />
    </Item>
    <Item item md={3} sm={2}>
      <BrowserRouter>
        <BackLink title="Back Link" path="#" onClick={action("clicked-back-link")} />
      </BrowserRouter>
    </Item>
  </Container>
);

buttons.story = {
  name: "Buttons"
};
