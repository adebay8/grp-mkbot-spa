import React from "react";
import { DefaultLayoutProps } from "./default.types";
import styles from "./default.module.scss";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>{children}</section>
    </main>
  );
};

export default DefaultLayout;
