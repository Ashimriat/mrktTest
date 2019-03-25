import React from 'react';
import { connect } from 'react-redux';
import Loader from './components/Loader/Loader'
import LoginForm from './components/LoginForm/LoginForm';
import Notification from './components/Notification/Notification';
import styles from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };

    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000);
  }

  renderContent() {
    const {userId } = this.props;

    if (userId) {
      return pug`
        div.appCore__welcome
          | Добро пожаловать, ${userId}
      `
    }
    return <LoginForm/>;
  }

  render() {
    const { lastAction, showNotification } = this.props;
    const { loading } = this.state;

    const isAwaitingResponse = (lastAction === 'SEND_LOGIN_DATA' || lastAction === 'REQUEST_PASSWORD_RESTORE');

    return pug`
      div.appCore
        ${loading || isAwaitingResponse ?
          <Loader/> :
          this.renderContent()
        }
        ${showNotification && <Notification/>}
    `
  }
}

const mapStateToProps = state => ({
  userId: state.userId,
  lastAction: state.lastAction,
  showNotification: state.notify.show
});

export default connect(mapStateToProps)(App);
