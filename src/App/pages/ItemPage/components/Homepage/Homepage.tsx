import React from "react";
import LinkIcon from "components/icons/LinkIcon";
import styles from "./Homepage.module.scss";

interface HomepageProps {
  homepage: string;
}

const Homepage: React.FC<HomepageProps> = ({ homepage }) => {
  const url = homepage.replace(/^https?:\/\//, "");

  return (
    <div className={styles.link}>
      <LinkIcon color="primary" />
      <a href={homepage} target="_blank" rel="noreferrer">
        {url}
      </a>
    </div>
  );
};

export default Homepage;
