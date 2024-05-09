import React from "react";
import Text from "components/Text";
import LogoIcon from "components/icons/LogoIcon";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`content ${styles.content}`}>
        <div className={styles.logo}>
          <LogoIcon />

          <Text view="p-20" weight="bold">
            GitHub Client
          </Text>
        </div>

        <img className={styles.avatar} src={"/avatar.jpg"} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
