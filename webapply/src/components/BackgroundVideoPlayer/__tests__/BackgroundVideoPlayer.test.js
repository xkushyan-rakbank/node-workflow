import React from "react";
import { render } from "@testing-library/react";
import { BackgroundVideoPlayer } from "../BackgroundVideoPlayer";

describe("BackgroundVideoPlayer", () => {
  beforeEach(() => {
    // Create a div and append it to the body
    const div = document.createElement("div");
    div.setAttribute("id", "root"); // Replace 'portal' with the id of the element you're trying to render into
    document.body.appendChild(div);
  });

  afterEach(() => {
    // Cleanup the DOM
    const div = document.getElementById("root"); // Replace 'portal' with the id of the element you're trying to render into
    if (div) {
      document.body.removeChild(div);
    }
  });
  it("renders without errors", () => {
    const video = {
      mp4: "video.mp4",
      webm: "video.webm",
      poster: "poster.jpg"
    };

    render(<BackgroundVideoPlayer video={video} />);
  });
});
