import cx from "classnames";
import styles from "./styles.module.scss";
import { BsPlay } from "react-icons/bs";
import { Link } from "react-router-dom";

const StartSection: React.FC<any> = ({ setSearchParams }) => {
  return (
    <div className={cx(styles.step, styles["step-one"])}>
      {/* <img
    src="/images/confused.gif"
    alt="lost gif"
    className={styles.gif}
  /> */}
      <h1 className={styles.heading}>Do you need help?</h1>
      <Link to="/search">
        <button className={styles.button}>
          <BsPlay size={50} />
          <p>Start</p>
        </button>
      </Link>
    </div>
  );
};

export default StartSection;
