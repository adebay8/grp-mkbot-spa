import cx from "classnames";
import { useParams } from "react-router-dom";
import { Store, stores } from "../../../helpers";
import { DefaultLayout } from "../../../layouts";
import styles from "./complete.module.scss";

const Complete = () => {
  const params = useParams();

  const findStore = () => {
    const store = stores.find(
      ({ name }) => name.toLowerCase() === params.storeId
    );
    return store;
  };

  const renderComplete = (store?: Store) => {
    if (!store) return <>Not found</>;
    return (
      <section className={styles.complete}>
        <div className={cx(styles.step, styles["step-three"])}>
          <div className={cx(styles.images)}>
            <div>
              <img src={store.rectangularImage} alt={store.name} />
            </div>
            <div>
              <img src="/images/primark-map.jpg" alt="Primark map location" />
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

  return <DefaultLayout>{renderComplete(findStore())}</DefaultLayout>;
};

export default Complete;
