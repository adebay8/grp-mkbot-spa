import { Link } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import styles from "./stores.module.scss";

const Stores = () => {
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
              <Link to="/complete">
                <button className={styles["action-button"]}>Let's go</button>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Stores;
