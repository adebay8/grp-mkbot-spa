import cx from "classnames";
import styles from "./styles.module.scss";
import { RecordingStatus } from "../home";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface HomeSpeechProps {
  recorderStatus: RecordingStatus;
  stopRecording: () => void;
  startRecording: () => void;
}

const HomeSpeech: React.FC<HomeSpeechProps> = ({
  recorderStatus,
  stopRecording,
  startRecording,
}) => {
  return (
    <div
      className={cx(styles["record-button-container"], styles[recorderStatus])}
    >
      {[styles.one, styles.two, styles.three].map((className, index) => (
        <div
          className={cx(styles.circle, className, styles[recorderStatus])}
          key={index}
        />
      ))}

      <button
        className={cx(styles["record-button"], styles[recorderStatus])}
        onClick={
          recorderStatus === RecordingStatus.recording
            ? stopRecording
            : startRecording
        }
      >
        {recorderStatus === RecordingStatus.recording ? (
          <FaStop size={70} />
        ) : (
          <FaMicrophone size={70} />
        )}
      </button>
    </div>
  );
};

export default HomeSpeech;
