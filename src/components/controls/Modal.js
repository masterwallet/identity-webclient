import React from 'react';

// Props: show, onClose, onConfirm, title, body, buttons.close, buttons.confirm
class Modal extends React.Component {
  state = {
    show: false
  }

  componentWillMount() {
    this.setState({ ...this.state, show: this.props.show });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({ ...this.state, show: nextProps.show });
    }
  }

  onClose = () => {
    this.props.onClose();
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onConfirm = () => {
    this.props.onConfirm();
  }

  render() {
    const modalClass = this.state.show ? 'modal show' : 'modal';
    const modalStyle = this.state.show ? { display: 'block' } : { display: 'none' };
    const backdropClass = this.state.show ? 'modal-backdrop fade show' : 'modal-backdrop fade';
    const backdropStyle = this.state.show ? { display: 'block' } : { display: 'none' };

    return (
      <div>
        <div className={modalClass} style={modalStyle}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' style={{ textTransform: 'capitalize' }}>{this.props.title}</h4>
                <button type='button' className='close' onClick={this.onClose}>
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                  {this.props.body}
              </div>
              <div className='modal-footer'>
                {
                  this.props.buttons !== undefined
                  ?
                  (<div>
                    <button className={this.props.buttons.cancel.class} onClick={this.onCancel}>
                      {this.props.buttons.cancel.label} {this.props.buttons.cancel.title}
                    </button>
                    &nbsp; &nbsp;
                    <button className={this.props.buttons.confirm.class} onClick={this.onConfirm}>
                      {this.props.buttons.confirm.label} {this.props.buttons.confirm.title}
                    </button>
                  </div>)
                  :
                  null
                }
              </div>
            </div>
          </div>
        </div>
        <div className={backdropClass} style={backdropStyle}></div>
      </div>
    );
  }
}

export default Modal;
