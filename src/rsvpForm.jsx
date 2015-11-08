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

    return (
      <section className='rsvp-form'>
        <p>Please indicate if you are able to attend our wedding using the form below.</p>
        <form>
          <div className='row'>
            <input type='text' required placeholder='Name' valueLink={nameLink} />
            <input type='email' required placeholder='Email' valueLink={emailLink} />
          </div>
          <div className='row events'>
            <button type='button' className={this.state.friday ? 'active' : null} onClick={() => this.setState({ friday: !this.state.friday })}>Friday evening 8th April @ Berry Inn Hotel</button>
            <button type='button' className={this.state.ceremony ? 'active' : null} onClick={() => this.setState({ ceremony: !this.state.ceremony })}>Ceremony 2pm 9th April @ Berry Courthouse</button>
            <button type='button' className={this.state.reception ? 'active' : null} onClick={() => this.setState({ reception: !this.state.reception })}>Reception 5pm 9th April @ Berry school of arts community hall</button>
          </div>
          <div className='row dietary'>
            <p>Please indicate any dietary requirements below.</p>
            <button type='button' className={this.state.dietary === 'everything' ? 'active' : null} onClick={() => this.setState({ dietary: 'everything' })}>Eats everything</button>
            <button type='button' className={this.state.dietary === 'vegetarian' ? 'active' : null} onClick={() => this.setState({ dietary: 'vegetarian' })}>Vegetarian</button>
            <button type='button' className={this.state.dietary === 'other' ? 'active' : null} onClick={() => this.setState({ dietary: 'other' })}>Other (we&#39;ll be in touch)</button>
          </div>
          <div className='row action'>
            <button type='button' onClick={this._submitForm.bind(this)}>Submit</button>
          </div>
        </form>
      </section>
    )
  }
}