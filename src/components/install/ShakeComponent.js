import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu } from './../../config/Wizards';
import { WizardPanel, Next } from './../panel/index';
import { ProgressCircle } from './../controls/ProgressCircle';

const _t = {
  generate: 'Generate Some Randomness',
  pleaseShakeDesktop: 'Please move your mouse cursor to strengthen your future password',
  start: 'Continue'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export class ShakeComponent extends React.Component {
  onMouseMove = (e) => {
    const a = [e.pageX, e.pageY];
    this.props.onSeed(a);
  }
  componentWillMount() {
    document.addEventListener("mousemove", this.onMouseMove, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove, false);
  }
  render() {
    const { install } = this.props;
    return (
      <WizardPanel title={_t.generate}>
        <Next title={_t.start} to={InstallationMenu[5]} />
        <Centered>
          <div style={{ margin: '20px auto', display: 'flex' }}>
            <img src='/media/randommove.svg' alt='' style={{ width: 'auto', height: '50px', marginRight: 5 }} />
            <div style={{ textAlign: 'center' }}>{_t.pleaseShakeDesktop}</div>
          </div>
          <ProgressCircle value={install.generatedProgress} />
        </Centered>
        <Steps {...{ step: 4, menu: InstallationMenu }} />
      </WizardPanel>
    );
  }
}
