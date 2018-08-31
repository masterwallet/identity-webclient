import React from 'react';
import styled from 'styled-components';
import { Steps } from './../controls/Steps';
import { InstallationMenu, findWizardStep } from './../../config/Wizards';
import { WizardPanel, Next, Prev } from './../panel/index';
import { ProgressCircle } from './../controls/ProgressCircle';
import ReadyRedirect from './../../containers/layout/ReadyRedirect';

const _t = {
  generate: 'Generate Some Randomness',
  pleaseShakeDesktop: 'Please move your mouse cursor to strengthen your future password',
  start: 'Continue',
  restart: 'Restart',
  back: 'Back'
};

const Centered = styled.div`
  text-align:center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ResetButton = styled.button`
  margin: 0px auto;
  background: transparent;
  font-weight: bold;
  color: #262327;
  border-top: 1px #6239bf solid;
  border-bottom: 1px #61c38b solid;
  border-radius: 0px;

  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
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
    const { install, onInit } = this.props;
    const { dictionary } = install;
    if (!dictionary || !dictionary.length) {
      onInit();
    }
    document.addEventListener("mousemove", this.onMouseMove, false);
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove, false);
    document.removeEventListener("keydown", this.onKeyPress, false);
  }
  render() {
    const { install, onReset } = this.props;
    const menu = InstallationMenu;
    const step = findWizardStep(menu, '/shake');
    const canContinue = (install.generatedProgress >= 100);
    return (
      <WizardPanel title={_t.generate}>
        <ReadyRedirect />
        <Next title={_t.start} to={menu[step + 1]} disabled={!canContinue} />
        <Prev title={_t.back} to={menu[step - 1]} />
        <Centered>
          <div style={{ margin: '20px auto', display: 'flex' }}>
            <img src='media/randommove.svg' alt='' style={{ width: 'auto', height: '50px', marginRight: 5 }} />
            <div style={{ textAlign: 'center', fontSize: 14 }}>{_t.pleaseShakeDesktop}</div>
          </div>
          <ProgressCircle value={install.generatedProgress} />

          {(install.generatedProgress > 1) ? (
            <ResetButton onClick={onReset}>{_t.restart}</ResetButton>
          ) : false }
        </Centered>
        <Steps {...{ step, menu }} />
      </WizardPanel>
    );
  }
}
