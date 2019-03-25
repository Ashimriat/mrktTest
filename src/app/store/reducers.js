import { handleActions, combineActions } from 'redux-actions';
import {
  sendLoginData,
  loginSucceed,
  loginFailed,
  requestPasswordRestore,
  passwordRestoreSucceed,
  passwordRestoreFailed,
  resetNotify
} from './actions';

const defaultState = {
  userId: '',
  notify: {
    message: '',
    show: false
  },
  lastAction: ''
};

export default handleActions(
  {
    [combineActions(sendLoginData, requestPasswordRestore)]: (state, action) => {
      return {
        ...state,
        lastAction: action.type
      }
    },
    [loginSucceed]: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        notify: {
          message: action.payload.message,
          show: true
        },
        lastAction: action.type
      };
    },
    [combineActions(passwordRestoreSucceed, passwordRestoreFailed, loginFailed)]: (state, action) => {
      return {
        ...state,
        notify: {
          message: action.payload.message,
          show: true
        },
        lastAction: action.type
      };
    },
    [resetNotify]: (state, action) => {
      return {
        ...state,
        notify: defaultState.notify,
        lastAction: action.type
      }
    }
  },
  defaultState
);
