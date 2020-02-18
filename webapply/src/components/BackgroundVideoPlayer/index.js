import { connect } from "react-redux";
import { BackgroundVideoPlayerComponent } from "./BackgroundVideoPlayer";
import { addPlayedVideo } from "../../store/actions/video";

const mapStateToProps = state => ({
  playedVideos: state.video
});

const mapDispatchToProps = {
  addPlayedVideo
};

export const BackgroundVideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundVideoPlayerComponent);
