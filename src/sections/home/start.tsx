import cx from "classnames";
import styles from "./styles.module.scss";
import { FaSearch } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_STORE_FROM_SPEECH } from "./query";
import { HomeSpeech, TranscriptionState } from "../speech";
import { StoreType } from "../../gql/graphql";

const mimeType = "audio/webm";

export enum RecordingStatus {
  recording = "recording",
  transcribing = "transcribing",
  completedSuccess = "completedSuccess",
  completedFailed = "completedFailed",
}

const StartSection: React.FC<any> = () => {
  const [getStoreFromSpeech] = useMutation(GET_STORE_FROM_SPEECH);
  const [, setPermission] = useState(false);
  const [recorderStatus, setRecorderStatus] = useState(
    RecordingStatus.recording
  );
  const [showRecordingButton, setShowRecordingButton] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder>();
  const [transcriptionData, setTranscriptionData] = useState<{
    store: StoreType;
    transcription: string;
  }>();

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
        return mediaStream;
      } catch (err) {}
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = (stream?: MediaStream) => {
    setRecorderStatus(RecordingStatus.recording);

    if (stream) {
      const media = new MediaRecorder(stream, { mimeType: mimeType });

      mediaRecorder.current = media;

      mediaRecorder.current.start();

      console.log("inside media recorder");

      let localAudioChunks: Blob[] = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };

      setAudioChunks(localAudioChunks);
    }
  };

  const stopRecording = () => {
    setRecorderStatus(RecordingStatus.transcribing);

    if (mediaRecorder.current) {
      mediaRecorder.current.onstop = () => {
        stream?.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunks, { type: mimeType });

        let formData = new FormData();
        formData.append("text", "this is the transcription of the audio file");
        formData.append("recording", audioBlob, "recording.webm");
        runMutation(formData);

        setAudioChunks([]);
      };

      mediaRecorder.current.stop();
    }
  };

  const runMutation = async (formData: FormData) => {
    fetch(`${process.env.REACT_APP_API_URL}/speech/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setRecorderStatus(RecordingStatus.completedFailed);
          return null;
        }
        return res.json();
      })
      .then((res) => {
        getStoreFromSpeech({
          variables: {
            uri: res.uri,
          },
        })
          .then((res) => {
            if (res.data.getStoreFromSpeech.store) {
              setTranscriptionData({
                store: res.data.getStoreFromSpeech.store,
                transcription: res.data.getStoreFromSpeech.transcription,
              });
              setRecorderStatus(RecordingStatus.completedSuccess);
            } else {
              setRecorderStatus(RecordingStatus.completedFailed);
            }
          })
          .catch((err) => {
            setRecorderStatus(RecordingStatus.completedFailed);
          });
      })
      .catch((e) => {
        setRecorderStatus(RecordingStatus.completedFailed);
      });
  };

  return (
    <div
      className={cx(styles.step, styles["step-one"], {
        [styles.center]: showRecordingButton,
      })}
    >
      {showRecordingButton ? (
        <>
          <button
            className={styles.back}
            onClick={() => {
              setShowRecordingButton(false);
            }}
          >
            <BiArrowBack size={25} />
          </button>
          <HomeSpeech
            recorderStatus={recorderStatus}
            startRecording={() =>
              getMicrophonePermission().then((stream) => {
                startRecording(stream);
              })
            }
            stopRecording={stopRecording}
          />
          <TranscriptionState
            recorderStatus={recorderStatus}
            startRecording={() =>
              getMicrophonePermission().then((stream) => {
                startRecording(stream);
              })
            }
            data={transcriptionData}
          />
        </>
      ) : (
        <>
          <video autoPlay className={styles.video} loop muted playsInline>
            <source
              src="https://storage.googleapis.com/mkbot_staticfiles/videos/start-videos.mp4"
              type="video/mp4"
            />
          </video>
          <h1 className={styles.heading}>Where do you want to go?</h1>
          <div className={styles["start-action"]}>
            <Link to="/stores">
              <button className={styles["start-button"]}>
                <FaSearch className={styles["search-icon"]} />
                <p>Find store</p>
              </button>
            </Link>
            <button
              onClick={() => {
                getMicrophonePermission().then((stream) => {
                  setShowRecordingButton(true);
                  startRecording(stream);
                });
              }}
              className={styles["use-microphone"]}
            >
              <FaMicrophone size={70} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StartSection;
