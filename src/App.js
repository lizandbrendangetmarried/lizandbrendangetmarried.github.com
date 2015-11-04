import React, { Component } from 'react';
import apostle from 'apostle.io';

class SendWelcomeEmail {
  constructor() {
    apostle.domainKey = "dd487e5521278b8fd8db25e5e69ec24643280c01";
  }
  send() {
    apostle.deliver("welcome", {email: "brendan.r.carey@gmail.com"})
      .then(() => console.log('success!'), () => console.log('error!'));
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.welcome = new SendWelcomeEmail();
  }

  render() {
    return (
      <section>
        <h1>Hello, stinker.</h1>
        <button onClick={() => this.welcome.send()}>Send email</button>
      </section>
    );
  }
}
