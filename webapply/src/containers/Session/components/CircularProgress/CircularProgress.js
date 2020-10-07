import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const SVGWrapper = styled.svg`
  margin-bottom: 0px;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #ddd;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: red;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const CircleText = styled.text`
  font-size: 1em;
  font-weight: 500;
  fill: #695e57;
`;

const CircularProgress = ({ sqSize = 50, strokeWidth = 3, percentage = 0, label = "" }) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <SVGWrapper width={sqSize} height={sqSize} viewBox={viewBox}>
      <CircleBackground
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <CircleProgress
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }}
      />
      <CircleText x="50%" y="50%" dy=".3em" textAnchor="middle">
        {label}
      </CircleText>
    </SVGWrapper>
  );
};

CircularProgress.propTypes = {
  sqSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  percentage: PropTypes.number,
  label: PropTypes.string
};

export { CircularProgress };
