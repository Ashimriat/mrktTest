import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {requestPasswordRestore, sendLoginData} from "../../store/actions";
import styles from './LoginForm.scss';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.sendSignInData = this.sendSignInData.bind(this);
    this.requestPasswordRecovery = this.requestPasswordRecovery.bind(this);
  }

  handleInputChange(event, inputType) {
    this.setState({[inputType]: event.target.value || ''});
  }

  validatePassword() {
    const { password } = this.state;

    if (password.length < 6) {
      this.setState({error: 'Пароль должен быть не меньше 6 символов!'});
      return false;
    }
    return true;
  }

  sendSignInData() {
    const { sendLoginData } = this.props;
    const { login, password } = this.state;

    if (this.validatePassword()) {
      this.setState({error: ''});
      sendLoginData(login, password);
    }
  }

  requestPasswordRecovery() {
    const { requestPasswordRestore } = this.props;
    const { login } = this.state;

    if (!login) {
      this.setState({error: 'Введите почту или пароль!'})
    } else {
      this.setState({error: ''});
      requestPasswordRestore(login);
    }
  }

  render() {
    const { login, password, error } = this.state;

    return pug`
      div.loginForm
        form.loginForm__form
          div.loginForm__textContainer
            h2.loginForm__formTitle
              | Вход
            a.loginForm__signUpLink
              | Регистрация
          div.loginForm__inputContainer
            label.loginForm__label(for="login")
              | Эл. почта или телефон
            input#login.loginForm__input(
              name='login'
              type='text'
              value=${login}  
              onChange=${event => this.handleInputChange(event, 'login')}
            )
          div.loginForm__inputContainer
            label.loginForm__label(for="password")
              | Пароль
            input#password.loginForm__input(
              name='password'
              type='password'
              value=${password}
              onChange=${event => this.handleInputChange(event, 'password')}
            )
            div.loginForm__remindPassword(onClick=${this.requestPasswordRecovery})
              | Напомнить
        div.loginForm__bottomSection
          button(
            className=${classNames('loginForm__button', (!login || !password) && `loginForm__button--disabled`)}
            type='submit'
            onClick=${this.sendSignInData}
          )
            | Войти на площадку
          ${error &&
            pug`
              div.loginForm__errorMessage
                | ${error}  
            `
          }
    `
  }
}

const mapDispatchToProps = {
  requestPasswordRestore,
  sendLoginData
};

export default connect(null, mapDispatchToProps)(LoginForm);
