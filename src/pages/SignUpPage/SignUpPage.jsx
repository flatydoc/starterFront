import { Registration } from "../../modules/Registration/Registration";
import styles from "./SignUpPage.module.scss";

export const SignUpPage = () => {
  return (
    <div className={styles.formPage}>
      <Registration />
    </div>
  );
};
