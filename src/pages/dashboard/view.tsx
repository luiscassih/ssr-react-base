import React, { useState } from 'react';
import { DashboardProps } from './types';
import DockerIcon from './assets/icons/docker.svg';
import capiWizardImage from './assets/images/capi_wizard.png';

export default (props: DashboardProps) => {
  const [counter, setCounter] = useState(props.counter || 0);
  return (
    <div className='Dashboard'>
      <img className='CapiWizardImage' src={capiWizardImage} />
      SSR-React-Base
      <button className='CounterBtn' onClick={() => setCounter(counter + 1)}>{counter}</button>
      <DockerIcon className="DockerIcon" />
    </div>
  );
};