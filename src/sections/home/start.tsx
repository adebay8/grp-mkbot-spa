import cx from "classnames";
import styles from "./styles.module.scss";
import { BsPlay } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_STORE_FROM_SPEECH } from "./speech";

const StartSection: React.FC<any> = ({ setSearchParams }) => {
  const [recordingAudio, setRecordingAudio] = useState<Boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [getStoreFromSpeech, { data, error, loading }] = useMutation(
    GET_STORE_FROM_SPEECH
  );

  let audioRecorder: {
    chunks: Blob[];
    start: () => Promise<MediaStream | void>;
    stop: () => Promise<Blob>;
    mediaRecorder?: MediaRecorder;
  } = {
    chunks: [],
    mediaRecorder: undefined,
    start: async function () {
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        return Promise.reject(
          new Error(
            "mediaDevices API or getUserMedia method is not supported in this browser."
          )
        );
      }

      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioRecorder.mediaRecorder = new MediaRecorder(stream);

          audioRecorder.chunks = [];

          audioRecorder.mediaRecorder.addEventListener(
            "dataavailable",
            (event) => {
              audioRecorder.chunks.push(event.data);
            }
          );

          audioRecorder.mediaRecorder.addEventListener("stop", () => {
            console.log(audioRecorder.mediaRecorder);
            audioRecorder.mediaRecorder?.stop();
          });

          audioRecorder.mediaRecorder.start();

          setRecorder(audioRecorder.mediaRecorder);
        });
    },
    stop: async function () {
      audioRecorder.mediaRecorder = recorder;

      return new Promise((resolve) => {
        let mimeType = audioRecorder.mediaRecorder?.mimeType;
        console.log(mimeType);

        let audioBlob = new Blob(audioRecorder.chunks, { type: mimeType });
        resolve(audioBlob);
      });
    },
  };

  const handleRecording = () => {
    audioRecorder
      .start()
      .then(() => {
        setRecordingAudio(true);
      })
      .catch(() => {});
  };

  const stopRecording = () => {
    audioRecorder.stop().then((audioBlob) => {
      setRecordingAudio(false);
      const formData = new FormData();
      formData.append("recording", audioBlob);
      runMutation(formData);
    });
  };

  const startRecording = () => {};

  const runMutation = (formData: FormData) => {
    getStoreFromSpeech({
      variables: {
        recording: formData,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {}, []);

  return (
    <div className={cx(styles.step, styles["step-one"])}>
      <h1 className={styles.heading}>Where do you want to go?</h1>
      <div
        className={cx(styles["record-button-container"], {
          [styles.static]: !recordingAudio,
        })}
      >
        <div
          className={cx(styles.circle, {
            [styles.one]: recordingAudio,
          })}
        />
        <div
          className={cx(styles.circle, {
            [styles.two]: recordingAudio,
          })}
        />
        <div
          className={cx(styles.circle, {
            [styles.three]: recordingAudio,
          })}
        />

        <button
          className={styles["record-button"]}
          onClick={!recordingAudio ? startRecording : stopRecording}
        >
          {recordingAudio ? <FaStop size={70} /> : <FaMicrophone size={70} />}
        </button>
      </div>

      <p>start talking</p>

      {/* <Link to="/search">
        <button className={styles["start-button"]}>
          <BsPlay size={50} />
          <p>Start</p>
        </button>
      </Link> */}
    </div>
  );
};

export default StartSection;
