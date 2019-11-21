import React from "react";
import { action } from "@storybook/addon-actions";
import { BrowserRouter } from "react-router-dom";
import { styled } from "@material-ui/styles";

import { AddButton } from "../components/Buttons/AddButton";
import { Grid } from "@material-ui/core";
import { BackLink } from "../components/Buttons/BackLink";
import { ContainedButton } from "../components/Buttons/ContainedButton";
import { ContinueButton } from "../components/Buttons/ContinueButton";
import { LinkButton } from "../components/Buttons/LinkButton";

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
    <Item item>
      <AddButton title="Add Button" onClick={action("clicked-add-button")} />
    </Item>
    <Item item>
      <BrowserRouter>
        <BackLink title="Back Link" path="#" onClick={action("clicked-back-link")} />
      </BrowserRouter>
    </Item>
    <Item item>
      <ContainedButton
        withRightArrow
        label="Contained Button"
        handleClick={action("clicked-contained")}
      />
    </Item>
    <Item item>
      <ContinueButton handleClick={action("clicked-continue")} />
    </Item>
    <Item item>
      <LinkButton onClick={action("clicked-link")} />
    </Item>
  </Container>
);

buttons.story = {
  name: "Buttons"
};
