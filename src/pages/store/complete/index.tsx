import cx from "classnames";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../../../layouts";
import styles from "./complete.module.scss";
import { useEffect, useState } from "react";
import { StoreType } from "../../../gql/graphql";
import { useLazyQuery } from "@apollo/client";
import { GET_STORE } from "../query";
import { Spinner } from "../../../components";

const Complete = () => {
  const [getStore] = useLazyQuery(GET_STORE);
  const params = useParams();

  const [store, setStore] = useState<StoreType>();
  const [loading, setLoading] = useState(true);

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

  const renderComplete = () => {
    if (loading)
      return (
        <div className={styles["spinner-container"]}>
          <Spinner />
        </div>
      );
    if (!store) return <>Store not found</>;
    return (
      <section className={styles.complete}>
        <div className={cx(styles.step, styles["step-three"])}>
          <div className={cx(styles.images)}>
            <div>
              <img src={store.rectangularLogo} alt={store.name} />
            </div>
            <div>
              <img src={store.image} alt={store.name} />
            </div>
          </div>
          <div className={styles.details}>
            <img alt="Waving hand" src="/images/waving-hand.png" />
            <h2>We've arrived at {store.name}</h2>
            <p>Enjoy your shopping</p>
          </div>
        </div>
      </section>
    );
  };

  return <DefaultLayout>{renderComplete()}</DefaultLayout>;
};

export default Complete;
