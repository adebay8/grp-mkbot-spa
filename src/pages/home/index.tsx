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
              <select className={styles.dropdown}>
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
              {[
                "https://centremk.com/media/4577/primark-logo.png?alias=standard-square&width=875&height=875",
                "https://centremk.com/media/2041/retailer_costa.png?alias=standard-square&width=875&height=875",
                "https://centremk.com/media/7030/john-lewis-negative.jpg?alias=standard-square&width=875&height=875",
              ].map((item, index) => (
                <img
                  src={item}
                  key={index}
                  alt="name"
                  className={styles.suggestion}
                />
              ))}
            </div>
            {/* on click show loading or searching */}
          </div>
        );
      case "3":
        return (
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
        );
      default:
        return <>Not found</>;
    }
  };

  return <DefaultLayout>{renderContent()}</DefaultLayout>;
};

export default HomePage;
