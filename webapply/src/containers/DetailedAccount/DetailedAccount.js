import React, { useRef, useCallback, useContext } from "react";

import {
  VerticalPagination,
  scrollToDOMNode,
  VerticalPaginationContext
} from "../../components/VerticalPagination";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { BackgroundVideoPlayer } from "../../components/BackgroundVideoPlayer";

export const DetailedAccount = () => {
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  useFormNavigation([true, false]);

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
          handleClick={() => setCurrentSection(1)}
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
