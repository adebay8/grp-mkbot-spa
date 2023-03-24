import cx from "classnames";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import styles from "./search.module.scss";

const HomeSearch: React.FC<any> = ({ setSearchParams, searchParams }) => {
  const stores = [
    { name: "WHSmith", image: "/images/stores/retailer_whsmith-colour.jpg" },
    { name: "hmv", image: "/images/stores/hmv-colour.jpg" },
    { name: "HSamuel", image: "/images/stores/hsamuel-colour.jpg" },
    { name: "Game", image: "/images/stores/retailer_game-colour.jpg" },
    { name: "Baseo", image: "/images/stores/baseo-colour.jpg" },
    { name: "CEX", image: "/images/stores/cex-clour.jpg" },
    { name: "BeaverBrook", image: "/images/stores/beaverbrooks-black.jpg" },
  ];

  return (
    <DefaultLayout>
      <div className={cx(styles.step, styles["step-two"])}>
        <form
          className={styles["search-container"]}
          onSubmit={(e) => {
            e.preventDefault();
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
          {stores.map((item, index) => (
            <Link
              to={`/stores/${item.name.split(" ").join("-").toLowerCase()}`}
            >
              <img
                src={item.image}
                key={index}
                alt="name"
                className={styles.suggestion}
              />
            </Link>
          ))}
        </div>
        {/* on click show loading or searching */}
      </div>
    </DefaultLayout>
  );
};

export default HomeSearch;
