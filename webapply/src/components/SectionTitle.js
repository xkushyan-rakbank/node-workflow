import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { InfoTitle } from "./InfoTitle";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    fontSize: "20px",
    fontWeight: 500,
    alignItems: "center",
    color: "#373737",
    marginBottom: "10px"
  },
  divider: {
    width: "4px",
    height: "16px",
    borderRadius: "2px",
    backgroundColor: "#373737",
    marginRight: "11px"
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
        {scrollIntoView && <div className={classes.divider} />}
        {title}
      </div>
      {!!subTitle && <InfoTitle title={subTitle} />}
    </>
  );
};
