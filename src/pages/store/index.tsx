import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Message, Topic } from "roslib";
import { initiateRos, initiateTopic } from "../../helpers";
import { DefaultLayout } from "../../layouts";
import styles from "./stores.module.scss";
import { useLazyQuery } from "@apollo/client";
import { GET_STORE } from "./query";
import { StoreType } from "../../gql/graphql";
import { Spinner } from "../../components";
import { BiArrowBack } from "react-icons/bi";

const Stores = () => {
  const [getStore] = useLazyQuery(GET_STORE);

  const [store, setStore] = useState<StoreType>();
  const [loading, setLoading] = useState(true);
  const [, setRosMessage] = useState<Message>();
  const [rosTopic, setRosTopic] = useState<Topic>();

  const params = useParams();
  const navigate = useNavigate();

  const sendTargetToROS: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!store) return;
    const targetLocation = new Message({ data: store.id });
    rosTopic?.publish(targetLocation);

    navigate(
      `/stores/${encodeURI(
        store.category ? store.category.name.toLowerCase() : "technology"
      )}/${params.storeId}/navigation`
    );
  };

  const renderStore = () => {
    if (loading)
      return (
        <div className={styles["spinner-container"]}>
          <Spinner />
        </div>
      );
    if (!store) return <>Store not found</>;
    return (
      <section className={styles.store}>
           <button
          className={styles.back}
          onClick={() => {
            navigate(-1)
          }}
        >
          <BiArrowBack size={25} />
        </button>
        <figure className={styles["brand-logo"]}>
          <img
            src={store.rectangularLogo}
            alt={store.name}
            className={styles.logo}
          />
        </figure>
        <div className={styles.options}>
          <article className={styles.option}>
            <div
              className={styles.map}
              style={{ backgroundImage: `url('${store.image}')` }}
            />
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
      name: "/destination_id",
      messageType: "std_msgs/String",
    });
    setRosTopic(topic);

    topic.subscribe((message) => {
      setRosMessage(message);
      console.log(message);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getStore({
      variables: {
        name: params.storeId,
      },
    })
      .then((res) => {
        setStore(res.data.store);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return <DefaultLayout>{renderStore()}</DefaultLayout>;
};

export default Stores;
