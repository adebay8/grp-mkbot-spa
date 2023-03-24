import cx from "classnames";
import { DefaultLayout } from "../../layouts";
import styles from "./complete.module.scss";

const Complete = () => {
  return (
    <DefaultLayout>
      <div className={cx(styles.step, styles["step-three"])}>
        <div className={cx(styles.images)}>
          <div>
            <img
              src="/images/primark-store-front.png"
              alt="Primark store front"
            />
          </div>
          <div>
            <img src="/images/primark-map.jpg" alt="Primark map location" />
          </div>
        </div>
        <div className={styles.details}>
          <img alt="Waving hand" src="/images/waving-hand.png" />
          <h2>We've arrived at primark</h2>
          <p>Enjoy your shopping</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Complete;
