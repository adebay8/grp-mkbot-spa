// import { useNavigate, useParams } from "react-router-dom";
import styles from "./navigation.module.scss";
import { initiateRos, initiateTopic } from "../../../helpers";

const StoreNavigation = () => {
  // const params = useParams();
  // const navigate = useNavigate();

  const ros = initiateRos();
  const statusTopic = initiateTopic({
    ros,
    name: "/move_base/status",
    messageType: "actionlib_msgs/GoalStatusArray",
  });

  statusTopic.subscribe((message) => {
    // if (message.data.status == "1") {
    //   navigate(
    //     `/stores/${params.categoryId}/${params.storeId}/complete`
    //   );
    // }
  });

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
