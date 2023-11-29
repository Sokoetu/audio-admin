import React from "react";

import styles from "@/styles/Loader.module.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
