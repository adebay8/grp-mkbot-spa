import cx from "classnames";
import styles from "./styles.module.scss";
import { BsPlay } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_STORE_FROM_SPEECH } from "./speech";
import { useNavigate } from "react-router-dom";

const mimeType = "audio/webm";

const StartSection: React.FC<any> = ({ setSearchParams }) => {
  const [getStoreFromSpeech] = useMutation(GET_STORE_FROM_SPEECH);
  const [permission, setPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [showRecordingButton, setShowRecordingButton] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();
  const mediaRecorder = useRef<MediaRecorder>();

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);

        setStream(mediaStream);
      } catch (err) {}
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingAudio(true);

    if (stream) {
      const media = new MediaRecorder(stream, { mimeType: mimeType });

      mediaRecorder.current = media;

      mediaRecorder.current.start();

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
    setRecordingAudio(false);

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });

        let formData = new FormData();
        formData.append("text", "this is the transcription of the audio file");
        formData.append("recording", audioBlob, "recording.webm");
        runMutation(formData);

        setAudioChunks([]);
      };
    }
  };

  const runMutation = async (formData: FormData) => {
    const uploadResponse = await fetch("http://127.0.0.1:8000/speech/upload", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) return;

    const responseData = await uploadResponse.json();

    getStoreFromSpeech({
      variables: {
        uri: responseData.uri,
      },
    })
      .then((res) => {
        if (res.data.getStoreFromSpeech.store) {
          const { name } = res.data.getStoreFromSpeech.store;
          navigate(`/stores/${name.toLowerCase()}`);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [getMicrophonePermission()]);

  return (
    <div className={cx(styles.step, styles["step-one"])}>
      <video autoPlay className={styles.video} loop>
        <source src="/videos/start-videos.mp4" type="video/mp4" />
      </video>
      <h1 className={styles.heading}>Where do you want to go?</h1>
      <div className={styles["start-action"]}>
        <Link to="/search">
          <button className={styles["start-button"]}>
            <BsPlay size={50} />
            <p>Start</p>
          </button>
        </Link>
        <button
          onClick={() => {
            setShowRecordingButton(true);
            startRecording();
          }}
        >
          <FaMicrophone size={70} />
        </button>
      </div>
      {showRecordingButton && (
        <>
          <div className={cx(styles["record-button-container"])}>
            <div
              className={cx(styles.circle, {
                [styles.one]: true,
              })}
            />
            <div
              className={cx(styles.circle, {
                [styles.two]: true,
              })}
            />
            <div
              className={cx(styles.circle, {
                [styles.three]: true,
              })}
            />

            <button
              className={styles["record-button"]}
              onClick={
                recordingAudio === false ? startRecording : stopRecording
              }
            >
              {recordingAudio === true ? (
                <FaStop size={70} />
              ) : (
                <FaMicrophone size={70} />
              )}
            </button>
          </div>
          <p>start talking</p>
        </>
      )}
    </div>
  );
};

export default StartSection;
