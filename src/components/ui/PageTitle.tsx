import React from "react";
import { styles } from "../../styles/styles";

type Props = {
  title: string;
  paragraph: string;
};

const PageTitle = ({ title, paragraph }: Props) => {
  return (
    <>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.paragraph}>{paragraph}</p>
    </>
  );
};

export default PageTitle;
