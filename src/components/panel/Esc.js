import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Esc extends React.Component {
  onKeyPress = (e) => {
    const { onContinue, to } = this.props;
    if (e.keyCode === 27) { // 'm' was pressed
      onContinue({ to });
    }
  };

  componentWillMount() {
    window.addEventListener("keydown", this.onKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    return false;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onContinue: ({ to }) => {
    dispatch(push( to ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Esc);
