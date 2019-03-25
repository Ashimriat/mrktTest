import { createActions } from 'redux-actions';

export const {
  sendLoginData,
  loginSucceed,
  loginFailed,
  requestPasswordRestore,
  passwordRestoreSucceed,
  passwordRestoreFailed,
  resetNotify
} = createActions ({
  SEND_LOGIN_DATA: (login, password) => ({login, password}),
  LOGIN_SUCCEED: (userId, message) => ({userId, message}),
  LOGIN_FAILED: message => ({message}),
  REQUEST_PASSWORD_RESTORE: login => ({login}),
  PASSWORD_RESTORE_SUCCEED: message => ({message}),
  PASSWORD_RESTORE_FAILED: message => ({message}),
  RESET_NOTIFY: () => ({})
});
