import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };
  
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCqZ3Ag2rNCNLdt0GfD7oDXuASCkkvVtsU',
      authDomain: 'auth-5b719.firebaseapp.com',
      databaseURL: 'https://auth-5b719.firebaseio.com',
      projectId: 'auth-5b719',
      storageBucket: 'auth-5b719.appspot.com',
      messagingSenderId: '521200961098',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  logOutPress() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
        case true:
          return (
            <Button onPress={this.logOutPress}>
              Log Out
            </Button>
          );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
