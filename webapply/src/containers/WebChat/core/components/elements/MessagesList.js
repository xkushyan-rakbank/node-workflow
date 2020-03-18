import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { List, CellMeasurerCache, CellMeasurer } from "react-virtualized";

import { Message } from "./Message";

const MessagesListStyled = styled.div`
  box-sizing: border-box;
  height: 0px;
  padding: 0 16px 10px 16px;
  overflow-y: auto;
  min-height: 320px;
`;

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 85,
  defaultHeight: 85
});

const MessagesList = ({ data }) => {
  let virtualRef = useRef();

  useEffect(() => {
    if (virtualRef) {
      if (data.length > 0) virtualRef.recomputeRowHeights(data.length - 1);
      virtualRef.scrollToRow(data.length);
    }
  }, [data]);

  return (
    <MessagesListStyled>
      <List
        ref={element => {
          virtualRef = element;
        }}
        style={{ outline: "none" }}
        width={327}
        deferredMeasurementCache={cache}
        height={310}
        rowCount={data.length}
        rowHeight={cache.rowHeight}
        overscanRowCount={4}
        rowRenderer={({ index, key, parent, style }) => (
          <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
            <Message
              key={key}
              body={data[index].message}
              date={data[index].utcTime}
              name={data[index].name}
              incoming={data[index].type !== "Client"}
              style={style}
            />
          </CellMeasurer>
        )}
      />
    </MessagesListStyled>
  );
};

MessagesList.propTypes = {
  data: PropTypes.array
};

export { MessagesList };
