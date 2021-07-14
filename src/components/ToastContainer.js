import React from 'react';
import './ToastContainer.scss';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux'
import { clearNotification } from '../redux/actions'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WithHeightValueDiv from './common/WithHeightValueDiv.js'

function ToastContainer({ toasts, clearNotification }) {
  return (
    <div className="toast-container">
      <TransitionGroup>
        {toasts.map(toast => (
          <CSSTransition key={toast.id} timeout={1000} classNames="toast-transition">
            <WithHeightValueDiv>
              <Toast show={true} onClose={() => { clearNotification(toast.id) }} delay={10000} autohide>
                <Toast.Header>
                  <strong className="mr-auto">{toast.header}</strong>
                </Toast.Header>
                <Toast.Body>{toast.body}</Toast.Body>
              </Toast>
            </WithHeightValueDiv>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
const mapStateToProps = ({ toasts }) => ({ toasts });
export default connect(mapStateToProps, { clearNotification })(ToastContainer);