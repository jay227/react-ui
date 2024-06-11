import { KuiHeader } from '@paychex/kuiper-components-core/react'
import React from 'react';

import { useDocumentTitle } from './hooks/useDocumentTitle';
import styles from './MainAreaLayout.module.css'

export function MainAreaLayout({title, children}: {title: string, children?: React.ReactNode}): JSX.Element {
  useDocumentTitle({
      title: `${title}`,
  });

  return (
    <div className={styles.main}>
      <div className={styles.stage}>
        <KuiHeader className={styles.title}><h2 data-testid="main-title">{title}</h2></KuiHeader>
        { children }
      </div>
    </div>
  );
}
