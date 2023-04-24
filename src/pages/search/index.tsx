import cx from "classnames";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import styles from "./search.module.scss";
import { useLazyQuery } from "@apollo/client";
import { GET_STORES } from "./query";
import { Spinner } from "../../components";
import { useEffect, useState } from "react";
import { CategoryType, StoreType } from "../../gql/graphql";

const HomeSearch: React.FC<any> = () => {
  const [getStores] = useLazyQuery(GET_STORES);

  const [stores, setStores] = useState<StoreType[]>([]);
  const [filteredStores, setFilteredStores] = useState<StoreType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    setLoading(true);
    getStores()
      .then((res) => {
        setStores(res.data.stores);
        setFilteredStores(res.data.stores);
        setCategories(res.data.categories);
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
          <select
            className={styles.dropdown}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              const filtered = stores.filter(
                (store) =>
                  store.category?.externalId === Number(e.target.value) &&
                  store.name.toLowerCase().includes(input.toLowerCase())
              );
              setFilteredStores(filtered);
            }}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.externalId} value={category.externalId}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Where do you want to go?"
            className={styles.input}
            autoFocus
            onChange={(e) => {
              setInput(e.target.value);

              const filtered = stores.filter(
                (store) =>
                  store.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) &&
                  (() => {
                    if (activeCategory !== "") {
                      return (
                        store.category?.externalId === Number(activeCategory)
                      );
                    }
                    return true;
                  })()
              );
              setFilteredStores(filtered);
            }}
            value={input}
          />
          <button type="submit" className={styles.button}>
            <BsSearch size={30} />
          </button>
        </form>
        <div className={styles.suggestions}>
          {loading ? (
            <Spinner />
          ) : (
            filteredStores.map((item) => (
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
