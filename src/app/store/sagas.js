import { put, takeLatest } from 'redux-saga/effects';
import {
  sendLoginData,
  loginSucceed,
  loginFailed,
  requestPasswordRestore,
  passwordRestoreSucceed,
  passwordRestoreFailed,
  resetNotify
} from './actions';

const API_MAIN = 'http://mrkt.little.team/api';
const API = {
  AUTHORIZATION: `${API_MAIN}/public/users/login`,
  RESET_PASSWORD: `${API_MAIN}/public/users/reset-password`
};

const messages = {
  login: {
    success: 'Вы успешно залогинились!',
    fail: 'Сочетание логин-пароль не обнаружено в базе'
  },
  restorePassword: {
    success: 'Успех! Ожидайте сообщение с напоминанием пароля',
    fail: 'Не удалось восстановить пароль. Проверьте почту/телефон и попробуйте ещё раз.'
  }
};

const loginStub = {
  phone: '+73333333333',
  email: 'test@test.ru',
  password: '123123q'
};

const delay = msDelay => new Promise(resolve => setTimeout(resolve, msDelay));

function* sagaTemplate(requestDelay, resetDelay, condition, success, fail) {
  try {
    yield delay(requestDelay);
    if (condition) {
      yield put(success);
    } else {
      yield put(fail);
    }
  } finally {
    yield delay(resetDelay);
    yield put(resetNotify());
  }
}

function* signInSaga(action) {
  const { login, password } = action.payload;
  const
    condition = (
      password === loginStub.password &&
      (login === loginStub.email || login === loginStub.phone)
    ),
    success = loginSucceed('5c63f0d66bb9c9615ad2784a', messages.login.success),
    fail = loginFailed(messages.login.fail);
  yield sagaTemplate(2000, 2000, condition, success, fail);
}

function* restorePasswordSaga(action) {
  const { login } = action.payload;
  const
    condition = (login === loginStub.email || login === loginStub.phone),
    success = passwordRestoreSucceed(messages.restorePassword.success),
    fail = passwordRestoreFailed(messages.restorePassword.fail);
  yield sagaTemplate(2000, 2000, condition, success, fail);
}

export default function* () {
  yield takeLatest(sendLoginData, signInSaga);
  yield takeLatest(requestPasswordRestore, restorePasswordSaga);
}
