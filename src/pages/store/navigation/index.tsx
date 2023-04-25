import { useParams } from "react-router-dom";
import { Store, stores } from "../../../helpers";
import styles from "./navigation.module.scss";

const StoreNavigation = () => {
  const params = useParams();

  const findStore = () => {
    const store = stores.find(
      ({ name }) => name.toLowerCase() === params.storeId
    );
    return store;
  };

  const renderNavigation = (store?: Store) => {
    if (!store) return <>Not found</>;
    return (
      <video autoPlay loop playsInline className={styles.video}>
        <source src="https://storage.googleapis.com/mkbot_staticfiles/videos/walking%20model%202.mp4" />
      </video>
    );
  };

  return <>{renderNavigation(findStore())}</>;
};

export default StoreNavigation;
