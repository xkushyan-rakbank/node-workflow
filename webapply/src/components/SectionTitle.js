import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { InfoTitle } from "./InfoTitle";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    fontSize: "20px",
    fontWeight: 600,
    alignItems: "center",
    color: "#373737",
    marginBottom: "10px"
  }
});

export const SectionTitle = ({ title, subTitle, scrollIntoView = false, ...props }) => {
  const classes = useStyles(props);
  const sectionTitleRef = useRef();

  useEffect(() => {
    scrollIntoView && sectionTitleRef.current.scrollIntoView();
  }, []);

  return (
    <>
      <div ref={sectionTitleRef} className={classes.wrapper}>
        {title}
      </div>
      {!!subTitle && <InfoTitle title={subTitle} />}
    </>
  );
};
