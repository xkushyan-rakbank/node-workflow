import React, { useRef, useCallback } from "react";

import { VerticalPagination, scrollToDOMNode } from "../../components/VerticalPagination";
import { AccountBenefits } from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";
import { useAccountTypeByPathname } from "../../utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";

export const DetailedAccount = () => {
  const { accountType, isIslamicBanking } = useAccountTypeByPathname();
  useFormNavigation([true, false]);

  const secondSection = useRef(null);
  const thirdSection = useRef(null);

  const scrollToSecondSection = useCallback(() => scrollToDOMNode(secondSection), []);
  const scrollToThirdSection = useCallback(() => scrollToDOMNode(thirdSection), []);

  return (
    <>
      <VerticalPagination
        scrollToSecondSection={scrollToSecondSection}
        scrollToThirdSection={scrollToThirdSection}
        video={getVideoByAccountType(accountType, isIslamicBanking)}
      >
        <div ref={secondSection}>
          <AccountBenefits />
        </div>
        <div ref={thirdSection}>
          <AccountingSoftware />
        </div>
      </VerticalPagination>
    </>
  );
};
