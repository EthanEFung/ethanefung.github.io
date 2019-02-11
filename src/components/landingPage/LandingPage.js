import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import './landing-page.scss';
import qs from 'qs'
import {pick} from 'lodash';

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    showCallToAction: true,
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    comments: '',
  }

  handleChange(event) {
    const {target} = event;
    const {value} = target;
    const name = target.id;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const query = qs.stringify(
      pick(this.state, ['name', 'email', 'phone', 'company', 'title', 'comments'])
    );

    const request = new Request('http://brass-cobra-9941.twil.io/github_call_to_action?'+query, {
      method: 'get',
      credentials: 'omit',
      mode: 'cors',
      cache: 'default',
    });
    let hadErr = false;
    fetch(request)
      .then(res => {
        console.log('RESPONSE', res)
      })
      .catch(err => {
        console.warn('ERROR', err)
        hadErr = true;
      })
      .finally(() => {
        if (hadErr) {

        } else {
          this.setState({showCallToAction: false});
        }
      });
  }

  render() {
    return (<div className="c-page c-landing-page c-landing-page__container">    
      <header className="c-landing-page__header">
        <div className="c-landing-page__header__content">
          <img 
            className="c-landing-page__header__profile-img"
            src={profile}
            alt="profile"
          />
          <section className="c-landing-page__header__description">
            <h1 className="o-header-text c-landing-page__header__name">
              Ethan<br/>Emmanuel<br/>Fung
            </h1>
            <h2 className="o-header-text c-landing-page__header__job-title">Software Engineer</h2>
          </section>
        </div>
      </header>

      {this.state.showCallToAction && <form className="c-landing-page__call-to-action">
        <header className="c-landing-page__call-to-action__header"><h3 className="o-header-text">Let's Connect</h3></header>
  
        <label className="o-label c-landing-page__call-to-action__label" htmlFor="name">Name*</label>
        <input className="name o-input c-landing-page__call-to-action__input" id='name' required onChange={this.handleChange}></input>

        <label className="o-label c-landing-page__call-to-action__label" htmlFor="email">Email*</label>
        <input className="email o-input c-landing-page__call-to-action__input" id='email' required onChange={this.handleChange}></input>

        <label className="o-label c-landing-page__call-to-action__label" htmlFor="phone">Phone</label>
        <input className="phone o-input c-landing-page__call-to-action__input" id='phone' onChange={this.handleChange}></input>

        <label className="o-label c-landing-page__call-to-action__label" htmlFor="company">Company</label>
        <input className="company o-input c-landing-page__call-to-action__input" id='company' onChange={this.handleChange}></input>

        <label className="o-label c-landing-page__call-to-action__label" htmlFor="title">Title</label>
        <input className="title o-input c-landing-page__call-to-action__input" id='title' onChange={this.handleChange}></input>

        <label className="o-label c-landing-page__call-to-action__label" htmlFor="comments">Comments</label>
        <input className="comments o-input c-landing-page__call-to-action__input" id='comments' onChange={this.handleChange}></input>

        <button className="c-landing-page__call-to-action__submit" type="submit" onClick={this.handleSubmit}>Submit</button>
      </form>}

      <article className="c-landing-page__article u-text-color--secondary">
        <h2 className="o-header-text c-landing-page__article__header">About Me</h2>
        <section className="c-landing-page__article__cards">
          <Link to="/biography" className="c-landing-page__article__card">
            <h3 className="o-header-text c-landing-page__article__card__header">Biography</h3>
            <p className="c-landing-page__article__card__description">
              Hear how I got into the industry, and where I'm&nbsp;headed.
            </p>
          </Link>
          <Link to={this.props.location.pathname} className="c-landing-page__article__card" onClick={this.props.handleResumeModal}>
            <h3 className="o-header-text c-landing-page__article__card__header">Resume</h3>
            <p className="c-landing-page__article__card__description">See what I'm working on, and what I've&nbsp;built.</p>
          </Link>
          <Link to="/cases" className="c-landing-page__article__card">
            <h3 className="o-header-text c-landing-page__article__card__header">Case Studies</h3>
            <p className="c-landing-page__article__card__description">Read my blog posts on what I've&nbsp;learned.</p>
          </Link>
        </section>
      </article>
    </div>);
  }
}

export {LandingPage};