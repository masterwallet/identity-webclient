import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next, Prev } from './../panel/index';
import { ProgressCircle } from './../controls/ProgressCircle';

const _t = {
  generate: 'Generate Some Randomness',
  pleaseShakeDesktop: 'Please move your mouse cursor to strengthen your future password',
  start: 'Continue',
  back: 'Back'
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
  };
  onKeyPress = (e) => {
    if (e.keyCode) this.props.onSeed(e.keyCode);
  }
  componentWillMount() {
    const { install } = this.props;
    const { dictionary } = install;
    if (!dictionary || !dictionary.length) {
      this.props.onInit();
    }
    document.addEventListener("mousemove", this.onMouseMove, false);
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove, false);
    document.removeEventListener("keydown", this.onKeyPress, false);
  }
  render() {
    const { install } = this.props;
    const menu = InstallationMenu;
    const step = findWizardStep(menu, '/shake');
    const canContinue = (install.generatedProgress >= 100);
    return (
      <WizardPanel title={_t.generate}>
        {canContinue ? <Next title={_t.start} to={menu[step + 1]} />: false}
        <Prev title={_t.back} to={menu[step - 1]} />
        <Centered>
          <div style={{ margin: '20px auto', display: 'flex' }}>
            <img src='/media/randommove.svg' alt='' style={{ width: 'auto', height: '50px', marginRight: 5 }} />
            <div style={{ textAlign: 'center', fontSize: 14 }}>{_t.pleaseShakeDesktop}</div>
          </div>
          <ProgressCircle value={install.generatedProgress} />
        </Centered>
        <pre>{JSON.stringify(install.entropy.pool)}</pre>
        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  }
}
