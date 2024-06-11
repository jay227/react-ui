import { MainAreaLayout } from '../components/MainAreaLayout'
import { KuiButton  } from '@paychex/kuiper-components-core/react';

function HomeContent(): JSX.Element {
    return (
      <div className='kui-parent-container'>
        <section>
          <div>
          <a href="https://www.advancepartners.com/">Welcome to Advance Partners</a>
          </div>
  
          <div className="kui-button-group" slot="actions">
            <KuiButton mode="primary" >Test Button</KuiButton>
          </div>        
        </section>
      </div>
    );
  }

const Home: React.FunctionComponent = () => {
    return (
      <MainAreaLayout title="Advance Partners Dashboard">
        <HomeContent />
      </MainAreaLayout>
    )
}

export default Home