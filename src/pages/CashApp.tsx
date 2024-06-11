import React, { useState } from 'react';

//import styled from 'styled-components'
import { MainAreaLayout } from '../components/MainAreaLayout'
import { KuiButton, KuiMenu } from '@paychex/kuiper-components-core/react';
import styles from '../components/MainAreaLayout.module.css'
import CashPostingBatches  from './LoadBatches'


function LoadBatches(): JSX.Element {
  return (
    <div className='kui-parent-container'>
      <section>
         <CashPostingBatches/>
      </section>  
    </div>
  );
}

function CashAppHome(): JSX.Element {
  return (
    <div className='kui-parent-container'>
      <section>
      </section>  
    </div>
  );
}



const CashApp : React.FunctionComponent = () => {
  const [feature,setFeature] = useState("");
  
  return (
    <MainAreaLayout title="CashApp">

      <div className={styles.menu}>
        <KuiMenu role='menubar' >
          <KuiButton mode="tertiary" onClick={() => setFeature("")}>Create From File</KuiButton>
          <hr></hr>
          <KuiButton mode="tertiary" onClick={() => setFeature("load")}>Load</KuiButton>
          <hr></hr>
          <KuiButton mode="tertiary" onClick={() => setFeature("")}>Export</KuiButton>
          <hr></hr>
          <KuiButton mode="tertiary" onClick={() => setFeature("")}>Print</KuiButton>
        </KuiMenu>
      </div>
      <div>
        {feature === "" && CashAppHome()}
        {feature === "load" && LoadBatches()}
      </div>
    </MainAreaLayout>
  )
}

export default CashApp