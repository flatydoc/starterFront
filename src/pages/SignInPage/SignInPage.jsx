import { Auth } from "../../modules/Auth/Auth";
import styles from "./SignInPage.module.scss";

export const SignInPage = () => {
  return (
    <div className={styles.formPage}>
      <Auth />
    </div>
  );
};
