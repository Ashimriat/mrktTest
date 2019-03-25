import React from 'react';
import { connect } from 'react-redux';
import styles from './Notification.scss';

const Notification = (props) => {
  const { message } = props;
  return pug`
    div.notification
      div.notification__message
        | ${message}
  `
};

const mapStateToProps = (state) => {
  const { notify } = state;

  return {
    message: notify.message
  }
};

export default connect(mapStateToProps, null)(Notification);
