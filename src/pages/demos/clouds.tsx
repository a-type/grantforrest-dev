import * as React from 'react';
import { Scene } from '../../clouds/Scene';
import LayoutContainer from '../../components/Layout';

export interface cloudsProps {}

const CloudsPage: React.FC<cloudsProps> = ({}) => {
  return (
    <LayoutContainer forceDarkMode="light">
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Scene />
      </div>
    </LayoutContainer>
  );
};

export default CloudsPage;
