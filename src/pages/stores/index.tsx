import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Message, Topic } from "roslib";
import { initiateRos, initiateTopic } from "../../helpers";
import { DefaultLayout } from "../../layouts";
import styles from "./stores.module.scss";

const Stores = () => {
  const [, setRosMessage] = useState<Message>();
  const [rosTopic, setRosTopic] = useState<Topic>();

  const sendTargetToROS: React.MouseEventHandler<HTMLButtonElement> = () => {
    const targetLocation = new Message("1");
    rosTopic?.publish(targetLocation);
  };

  useEffect(() => {
    const ros = initiateRos();
    const topic = initiateTopic({
      ros,
      name: "/cmd_vel",
      messageType: "std_msgs/String",
    });
    setRosTopic(topic);

    topic.subscribe((message) => {
      setRosMessage(message);
      console.log(message);
    });
  }, []);

  return (
    <DefaultLayout>
      <section className={styles.store}>
        <figure className={styles["brand-logo"]}>
          <img
            src={"/images/stores/rectangular/hmv-rectangular.jpg"}
            alt={"/images/stores/hmv-colour.jpg"}
            className={styles.logo}
          />
        </figure>
        <div className={styles.options}>
          <article className={styles.option}>
            <div className={styles.map}>
              <img src="/images/primark-map.jpg" alt="Primark map location" />
            </div>
            <div className={styles.details}>
              <div>
                <p className={styles.description}>
                  Feed your love of art at AC Framing where a fantastic
                  selection of original and limited edition art prints awaits
                  you. We also offer a bespoke framing service.
                </p>
                <p className={styles.address}>
                  33a Silbury Blvd, Milton Keynes MK9 3ES
                </p>
                <div className={styles.status}>Open</div>
              </div>
              <Link to="/complete"></Link>
              <button
                className={styles["action-button"]}
                onClick={sendTargetToROS}
              >
                Let's go
              </button>
            </div>
          </article>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Stores;
