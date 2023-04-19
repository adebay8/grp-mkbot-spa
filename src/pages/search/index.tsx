import cx from "classnames";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import styles from "./search.module.scss";
import { useLazyQuery } from "@apollo/client";
import { GET_STORES } from "./query";
import { Spinner } from "../../components";
import { useEffect, useState } from "react";
import { StoreType } from "../../gql/graphql";

const HomeSearch: React.FC<any> = () => {
  const [getStores] = useLazyQuery(GET_STORES);

  const [stores, setStores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStores()
      .then((res) => {
        setStores(res.data.stores);
        setLoading(false);
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, []);

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
          {loading ? (
            <Spinner />
          ) : (
            stores.map((item) => (
              <Link
                to={`/stores/${item.name.split(" ").join("-").toLowerCase()}`}
                key={item.id}
              >
                <img
                  src={item.logo}
                  key={item.id}
                  alt={item.name}
                  className={styles.suggestion}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomeSearch;
