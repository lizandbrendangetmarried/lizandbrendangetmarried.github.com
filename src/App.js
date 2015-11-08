import React, { Component } from 'react';
import RsvpForm from './rsvpForm.jsx';

export default class App extends Component {
  render() {
    return (
      <section>
        <h1>Liz & Brendan</h1>
        <h2>09-04-2016</h2>
        <RsvpForm />
      </section>
    );
  }
}
