import React, { Component } from 'react';
import RsvpForm from './rsvpForm.jsx';
import schoolImage from './school-arts.jpg';
import 'font-awesome/fonts/fontawesome-webfont.eot';
import 'font-awesome/fonts/fontawesome-webfont.svg';
import 'font-awesome/fonts/fontawesome-webfont.ttf';
import 'font-awesome/fonts/fontawesome-webfont.woff';
import 'font-awesome/fonts/fontawesome-webfont.woff2';
import 'font-awesome/css/font-awesome.min.css';

export default class App extends Component {
  render() {
    return (
      <section className='container'>
        <h1>Liz & Brendan</h1>
        <h2>- 9th April 2016 -</h2>
        <div className='image-wrapper'><img src={schoolImage} /></div>
        <RsvpForm />
      </section>
    );
  }
}
