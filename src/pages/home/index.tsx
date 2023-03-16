import { BsPlay, BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import cx from "classnames";
import { DefaultLayout } from "../../layouts";
import styles from "./home.module.scss";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ step: "1" });

  const renderContent = () => {
    switch (searchParams.get("step")) {
      case "1":
        return (
          <div className={cx(styles.step, styles["step-one"])}>
            {/* <img
                  src="/images/confused.gif"
                  alt="lost gif"
                  className={styles.gif}
                /> */}
            <h1 className={styles.heading}>Do you need help?</h1>
            {/* <div className={styles["button-container"]}></div> */}
            <button
              onClick={() =>
                setSearchParams({
                  step: "2",
                })
              }
              className={styles.button}
            >
              <BsPlay size={50} />
              <p>Start</p>
            </button>
          </div>
        );
      case "2":
        return (
          <div className={cx(styles.step, styles["step-two"])}>
            <form
              className={styles["search-container"]}
              onSubmit={(e) => {
                e.preventDefault();
                setSearchParams({
                  step: "3",
                });
              }}
            >
              <select style={{ marginRight: "15px" }}>
                <option>All categories</option>
                <option>Food</option>
                <option>Technology</option>
              </select>
              <input
                placeholder="Where do you want to go?"
                className={styles.input}
                autoFocus
              />
              <button type="submit" className={styles.button}>
                <BsSearch size={30} />
              </button>
            </form>
            <div className={styles.suggestions}>
              {[].map((item, index) => (
                <img src={item} key={index} alt="name" />
              ))}
              <div className={styles.suggestion}>Primark</div>
              <div className={styles.suggestion}>John Lewis</div>
              <div className={styles.suggestion}>Costa</div>
            </div>
            {/* on click show loading or searching */}
          </div>
        );
      case "3":
        return <></>;
      default:
        return <>Not found</>;
    }
  };

  return <DefaultLayout>{renderContent()}</DefaultLayout>;
};

export default HomePage;
