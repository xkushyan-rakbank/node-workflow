import { connect } from "react-redux";
import { BackgroundVideoPlayerComponent } from "./BackgroundVideoPlayer";
import { addPlayedVideo } from "../../store/actions/playedVideos";

const mapStateToProps = state => ({
  playedVideos: state.playedVideos
});

const mapDispatchToProps = {
  addPlayedVideo
};

export const BackgroundVideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundVideoPlayerComponent);
