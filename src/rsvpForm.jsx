import React, { Component } from 'react';
import apostle from 'apostle.io';

export default class RsvpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      friday: false,
      ceremony: true,
      reception: true,
      dietary: 'everything',
      sent: false
    };

    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
  }

  _submitForm() {
    if(!this.state.name || !this.state.email || this.state.sent) {
      console.log('Invalid, try again');
      return;
    }

    apostle.deliver('wedding-rsvp', {
      email: 'lizandbrendangetmarried+rsvp@gmail.com',
      guestName: this.state.name,
      guestEmail: this.state.email,
      friday: this.state.friday,
      ceremony: this.state.ceremony,
      reception: this.state.reception,
      dietary: this.state.dietary
    })
    .then(() => {
      this.setState({ sent: true });
      console.log('success!');
    }, (err, response) => console.log('error!', err, response));
  }

  _handleNameChange(newValue) {
    this.setState({ name: newValue });
  }

  _handleEmailChange(newValue) {
    this.setState({ email: newValue });
  }

  render() {
    if(this.state.sent) {
      return <h3>Thanks, we look forward to seeing you there!</h3>;
    }

    let nameLink = {
      value: this.state.name,
      requestChange: this._handleNameChange
    };

    let emailLink = {
      value: this.state.email,
      requestChange: this._handleEmailChange
    };

    let buttonFunc = (label, isActive, onClick) => {
      let tick = null;
      if (isActive) {
        tick = <i className='fa fa-check'></i>;
      }
      return <button type='button' className={isActive ? 'active' : null} onClick={onClick}>{label} {tick}</button>;
    };

    return (
      <section className='rsvp-form'>
        <p>Please indicate if you are able to attend our wedding using the form below.</p>
        <form>
          <div className='row'>
            <input type='text' required placeholder='Name' valueLink={nameLink} />
            <input type='email' required placeholder='Email' valueLink={emailLink} />
          </div>
          <div className='row events'>
            {buttonFunc('Friday evening 8th April @ Berry Inn Hotel', this.state.friday, () => this.setState({ friday: !this.state.friday }))}
            {buttonFunc('Ceremony 2:30pm 9th April @ Berry Courthouse', this.state.ceremony, () => this.setState({ ceremony: !this.state.ceremony }))}
            {buttonFunc('Reception 5pm 9th April @ Berry school of arts community hall', this.state.reception, () => this.setState({ reception: !this.state.reception }))}
          </div>
          <div className='row dietary'>
            <p>Please indicate any dietary requirements below.</p>
            {buttonFunc('Eats everything', this.state.dietary === 'everything', () => this.setState({ dietary: 'everything' }))}
            {buttonFunc('Vegetarian', this.state.dietary === 'vegetarian', () => this.setState({ dietary: 'vegetarian' }))}
            {buttonFunc('Other (we\'ll be in touch)', this.state.dietary === 'other', () => this.setState({ dietary: 'other' }))}
          </div>
          <div className='row action'>
            <button type='button' onClick={this._submitForm.bind(this)}>Submit <i className='fa fa-thumbs-o-up'></i></button>
          </div>
        </form>
      </section>
    )
  }
}