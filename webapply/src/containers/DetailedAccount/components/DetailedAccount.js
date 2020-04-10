import React, { useCallback, useRef } from "react";

import { scrollToDOMNode, VerticalPagination } from "../../../components/VerticalPagination";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./../components/AccountingSoftware";
import { getVideoByAccountType } from "../../../utils/getVideoByAccountType";
import { BackgroundVideoPlayer } from "../../../components/BackgroundVideoPlayer";

export const DetailedAccountComponent = ({ setCurrentSection, accountType, isIslamicBanking }) => {
  const firstSection = useRef(null);
  const secondSection = useRef(null);
  const thirdSection = useRef(null);

  const scrollToSection = useCallback(
    i => scrollToDOMNode([firstSection, secondSection, thirdSection][i]),
    []
  );

  return (
    <VerticalPagination scrollToSection={scrollToSection}>
      <div ref={firstSection} className={"hide-on-mobile"}>
        <BackgroundVideoPlayer
          video={getVideoByAccountType(accountType, isIslamicBanking)}
          videoWrapperClass="hide-on-mobile"
          handleClick={() => setCurrentSection(2)}
        />
      </div>
      <div ref={secondSection}>
        <AccountBenefits />
      </div>
      <div ref={thirdSection}>
        <AccountingSoftware />
      </div>
    </VerticalPagination>
  );
};
