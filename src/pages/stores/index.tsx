import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Message, Topic } from "roslib";
import { initiateRos, initiateTopic, stores } from "../../helpers";
import { DefaultLayout } from "../../layouts";
import styles from "./stores.module.scss";

const Stores = () => {
  const [, setRosMessage] = useState<Message>();
  const [rosTopic, setRosTopic] = useState<Topic>();
  const params = useParams();
  const navigate = useNavigate();

  const sendTargetToROS: React.MouseEventHandler<HTMLButtonElement> = () => {
    const targetLocation = new Message({ data: "502" });
    rosTopic?.publish(targetLocation);
    navigate(`/stores/${params.storeId}/navigation`);
  };

  const renderStore = () => {
    const store = stores.find(
      ({ name }) => name.toLowerCase() === params.storeId
    );
    if (!store) return <>Store not found</>;
    return (
      <section className={styles.store}>
        <figure className={styles["brand-logo"]}>
          <img
            src={store.rectangularImage}
            alt={store.name}
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
                <p className={styles.description}>{store.description}</p>
                <p className={styles.address}>{store.address}</p>
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
    );
  };

  useEffect(() => {
    const ros = initiateRos();
    const topic = initiateTopic({
      ros,
      name: "/txt_msg",
      messageType: "std_msgs/String",
    });
    setRosTopic(topic);

    topic.subscribe((message) => {
      setRosMessage(message);
      console.log(message);
    });
  }, []);

  return <DefaultLayout>{renderStore()}</DefaultLayout>;
};

export default Stores;
