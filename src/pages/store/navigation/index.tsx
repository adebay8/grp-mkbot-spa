import { useNavigate, useParams } from "react-router-dom";
import styles from "./navigation.module.scss";
import { initiateRos, initiateTopic } from "../../../helpers";
import { useEffect, useState } from "react";

const StoreNavigation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [allow, setAllow] = useState(false);
  const [robotState, setRobotState] = useState<number>(0);

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
      navigate(`/stores/${params.categoryId}/${params.storeId}/complete`);
    }
    // eslint-disable-next-line
  }, [robotState, allow]);

  const renderNavigation = () => {
    return (
      <video autoPlay loop playsInline className={styles.video}>
        <source src="https://storage.googleapis.com/mkbot_staticfiles/videos/walking%20model%202.mp4" />
      </video>
    );
  };

  return <>{renderNavigation()}</>;
};

export default StoreNavigation;
