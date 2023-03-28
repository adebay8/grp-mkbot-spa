import { useParams } from "react-router-dom";
import { Store, stores } from "../../../helpers";
import { DefaultLayout } from "../../../layouts";

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
      <p>
        Heading to {store.name} at {store.address}
      </p>
    );
  };

  return <DefaultLayout>{renderNavigation(findStore())}</DefaultLayout>;
};

export default StoreNavigation;
