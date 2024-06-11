import React from 'react'
//import styled from 'styled-components'
import { MainAreaLayout } from '../components/MainAreaLayout'
import { KuiButton  } from '@paychex/kuiper-components-core/react';

function FSContent(): JSX.Element {
    return (
      <div className='kui-parent-container'>
        <section>
          <div>
          <a href="https://www.advancepartners.com/">Welcome to Full Service</a>
          </div>
  
          <div className="kui-button-group" slot="actions">
            <KuiButton mode="primary" >Sample Button</KuiButton>
            
          </div>        
        </section>
      </div>
    );
  }

  const FullService: React.FunctionComponent = () => {
    return (
      <MainAreaLayout title="Advance Partners Full Service">
        <FSContent />
      </MainAreaLayout>
    )
}

export default FullService