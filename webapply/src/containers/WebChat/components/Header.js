import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateProspect } from "../../../store/actions/appConfig";
import { ReactComponent as Close } from "../../../assets/icons/chat-close.svg";
import { ReactComponent as Minimize } from "../../../assets/icons/chat-minimize.svg";

const HeaderStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding: 16px;
  color: #373737;
  border-bottom: 1px solid #e9e9ed;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55px;
  > svg {
    cursor: pointer;
  }
`;

const Header = ({ onClose, onMinimize }) => {
  const [isArabic, setIsArabic] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLang("en");
  }, []);

  const setLang = lang => {
    lang === "ar" ? setIsArabic(false) : setIsArabic(true);
    dispatch(
      updateProspect({
        "prospect.freeFieldsInfo.freeField3": lang === "en" ? "true" : "false"
      })
    );
  };
  return (
    <HeaderStyled>
      <div>
        Chat with us in{" "}
        {isArabic ? (
          <a
            role="button"
            style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setLang("ar")}
          >
            {"(English)"}
          </a>
        ) : (
          <a
            role="button"
            style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setLang("en")}
          >
            {"(عربي)"}
          </a>
        )}
      </div>
      <ActionButtons>
        <Minimize alt="Minimize" onClick={onMinimize} />
        <Close alt="Close" onClick={onClose} />
      </ActionButtons>
    </HeaderStyled>
  );
};

export { Header };
