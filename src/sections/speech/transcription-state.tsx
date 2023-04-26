import cx from "classnames";
import { RecordingStatus } from "../home";
import { MdReplay } from "react-icons/md";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { StoreType } from "../../gql/graphql";

interface TranscriptionStateProps {
  recorderStatus: RecordingStatus;
  startRecording: () => void;
  data?: {
    store: StoreType;
    transcription: String;
  };
}

const TranscriptionState: React.FC<TranscriptionStateProps> = ({
  recorderStatus,
  startRecording,
  data,
}) => {
  const renderStatus = () => {
    switch (recorderStatus) {
      case RecordingStatus.recording:
        return (
          <p className={styles["transcription-state-text"]}>Listening...</p>
        );
      case RecordingStatus.transcribing:
        return (
          <p className={styles["transcription-state-text"]}>Transcribing...</p>
        );
      case RecordingStatus.completedFailed:
        return (
          <p className={styles["transcription-state-text"]}>
            I was unable to understand what you said. <br />
            Can you repeat yourself?
          </p>
        );
      default:
        return (
          <div className={styles.result}>
            <p>
              {data?.transcription ??
                "I didn't understand you. Please try again"}
            </p>
            <div className={styles.actions}>
              <button
                className={cx(styles["action-button"], styles.outline)}
                onClick={startRecording}
              >
                <MdReplay size={25} />
                Try again
              </button>
              <Link
                to={`/stores/${encodeURI(
                  data?.store.category?.name.toLowerCase() as string
                )}/${data?.store.name.toLowerCase().split(" ").join("-")}`}
              >
                <button className={styles["action-button"]}>
                  Go to {data?.store.name}
                </button>
              </Link>
            </div>
          </div>
        );
    }
  };
  return <div className={styles["transcription-state"]}>{renderStatus()}</div>;
};

export default TranscriptionState;
