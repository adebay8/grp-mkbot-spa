import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./navigation.module.scss";
import { initiateRos, initiateTopic } from "../../../helpers";
import { useEffect, useState } from "react";

const StoreNavigation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [allow, setAllow] = useState(false);
  const [robotState, setRobotState] = useState<number>(0);
  const [animationState, setAnimationState] = useState<number>(
    searchParams.get("state") ? Number(searchParams.get("state")) : 1
  );

  useEffect(() => {
    const ros = initiateRos();
    const statusTopic = initiateTopic({
      ros,
      name: "/move_base/status",
      messageType: "actionlib_msgs/GoalStatusArray",
    });

    statusTopic.subscribe((message) => {
      const result = message as any;

      if (result.status_list[0].status === 1) {
        setAllow(true);
        setRobotState(1);
      }

      if (result.status_list[0].status === 3) {
        setRobotState(3);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allow && robotState === 3) {
      setAnimationState(3);
    }
    // eslint-disable-next-line
  }, [robotState, allow]);

  const renderNavigation = () => {
    switch (animationState) {
      case 1:
        return (
          <video
            onEnded={() => {
              setAnimationState(2);
              console.log("i am finished");
            }}
            autoPlay
            playsInline
            className={styles.video}
            key="1"
          >
            <source src="https://storage.googleapis.com/mkbot_staticfiles/videos/hi%20come%20on.mp4" />{" "}
          </video>
        );
      case 2:
        return (
          <video autoPlay loop playsInline className={styles.video} key="2">
            <source src="https://storage.googleapis.com/mkbot_staticfiles/videos/walking%20model%202.mp4" />
          </video>
        );
      case 3:
        return (
          <video
            autoPlay
            playsInline
            className={styles.video}
            onEnded={() => {
              navigate(
                `/stores/${params.categoryId}/${params.storeId}/complete`
              );
            }}
            key="3"
          >
            <source src="https://storage.googleapis.com/mkbot_staticfiles/videos/weve%20arrived.mp4" />
          </video>
        );
    }
  };

  return <>{renderNavigation()}</>;
};

export default StoreNavigation;
