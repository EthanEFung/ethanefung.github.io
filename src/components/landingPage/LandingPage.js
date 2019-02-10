import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import './landing-page.scss';

class LandingPage extends Component {
  render() {
    return (<div className="c-landing-page c-landing-page__container">    
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

      <form className="c-landing-page__call-to-action">
        <header className="c-landing-page__call-to-action__header"><h3 className="o-header-text">Let's Connect</h3></header>
  
        <label className="o-label c-landing-page__call-to-action__label" for="name">Name*</label>
        <input className="name c-landing-page__call-to-action__input" required></input>

        <label className="c-landing-page__call-to-action__label" for="email">Email*</label>
        <input className="email c-landing-page__call-to-action__input" required></input>

        <label className="c-landing-page__call-to-action__label" for="phone">Phone</label>
        <input className="phone c-landing-page__call-to-action__input"></input>

        <label className="c-landing-page__call-to-action__label" for="company">Company</label>
        <input className="company c-landing-page__call-to-action__input"></input>

        <label className="c-landing-page__call-to-action__label" for="title">Title</label>
        <input className="title c-landing-page__call-to-action__input"></input>

        <label className="c-landing-page__call-to-action__label" for="comments">Comments</label>
        <input className="comments c-landing-page__call-to-action__input"></input>

        <button className="c-landing-page__call-to-action__submit"type="submit">Submit</button>
      </form>

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
            <p className="c-landing-page__article__card__description">See what I'm working&nbsp;on, and what I've built.</p>
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