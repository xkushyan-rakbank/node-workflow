import React, { useCallback, useRef } from "react";

import { scrollToDOMNode, VerticalPagination } from "../../../../components/VerticalPagination";
import { AccountBenefits } from "../AccountBenefits";
import { AccountingSoftware } from "../AccountingSoftware";
import { getVideoByAccountType } from "../../../../utils/getVideoByAccountType";
import { BackgroundVideoPlayer } from "../../../../components/BackgroundVideoPlayer";
import { useStyles } from "./styled";

export const DetailedAccountComponent = ({
  accountType,
  selectedAccountType,
  isIslamicBanking,
  handleClickonReadMoreBtn
}) => {
  const classes = useStyles();
  const firstSection = useRef(null);
  const secondSection = useRef(null);
  const thirdSection = useRef(null);

  const scrollToSection = useCallback(
    i => scrollToDOMNode([firstSection, secondSection, thirdSection][i]),
    []
  );

  return (
    <VerticalPagination scrollToSection={scrollToSection}>
      <div ref={firstSection} className="hide-on-mobile">
        <BackgroundVideoPlayer
          video={getVideoByAccountType(accountType, isIslamicBanking)}
          classes={{ container: "hide-on-mobile" }}
          handleClick={handleClickonReadMoreBtn}
        />
      </div>
      <div ref={secondSection} className={classes.section}>
        <AccountBenefits accountType={selectedAccountType} />
      </div>
      <div ref={thirdSection} className={classes.section}>
        <AccountingSoftware />
      </div>
    </VerticalPagination>
  );
};
