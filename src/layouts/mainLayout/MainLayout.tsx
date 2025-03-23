import { ReactElement, ReactNode } from 'react';

import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps): ReactElement => (
  <div className={styles.mainLayout}>
    <div className={styles.container}>{children}</div>
  </div>
);

export default MainLayout;
