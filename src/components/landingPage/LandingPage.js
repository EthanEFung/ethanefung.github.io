import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import profile from '../../assets/profile.jpg';

class LandingPage extends Component {
  render() {
    return (<div className="c-app c-app__container">    
      <header className="c-app__header">
        <div className="c-app__header__content">
          <img 
            className="c-app__header__profile-img"
            src={profile}
            alt="profile"
          />
          <section className="c-app__header__description">
            <h1 className="o-header-text c-app__header__name">
              Ethan<br/>Emmanuel<br/>Fung
            </h1>
            <h2 className="o-header-text c-app__header__job-title">Software Engineer</h2>
          </section>
        </div>
      </header>

      <form className="c-app__call-to-action">
        <header className="c-app__call-to-action__header"><h3 className="o-header-text">Let's Connect</h3></header>
  
        <label className="o-label c-app__call-to-action__label" for="name">Name*</label>
        <input className="name c-app__call-to-action__input" required></input>

        <label className="c-app__call-to-action__label" for="email">Email*</label>
        <input className="email c-app__call-to-action__input" required></input>

        <label className="c-app__call-to-action__label" for="phone">Phone</label>
        <input className="phone c-app__call-to-action__input"></input>

        <label className="c-app__call-to-action__label" for="company">Company</label>
        <input className="company c-app__call-to-action__input"></input>

        <label className="c-app__call-to-action__label" for="title">Title</label>
        <input className="title c-app__call-to-action__input"></input>

        <label className="c-app__call-to-action__label" for="comments">Comments</label>
        <input className="comments c-app__call-to-action__input"></input>

        <button className="c-app__call-to-action__submit"type="submit">Submit</button>
      </form>

      <article className="c-app__article u-text-color--secondary">
        <h2 className="o-header-text c-app__article__header">About Me</h2>
        <section className="c-app__article__cards">
          <Link to="/biography" className="c-app__article__card">
            <h3 className="o-header-text c-app__article__card__header">Biography</h3>
            <p className="c-app__article__card__description">
              Hear how I got into the industry, and where I'm&nbsp;headed.
            </p>
          </Link>
          <Link to={this.props.location.pathname} className="c-app__article__card" onClick={this.props.handleResumeModal}>
            <h3 className="o-header-text c-app__article__card__header">Resume</h3>
            <p className="c-app__article__card__description">See what I'm working&nbsp;on, and what I've built.</p>
          </Link>
          <Link to="/cases" className="c-app__article__card">
            <h3 className="o-header-text c-app__article__card__header">Case Studies</h3>
            <p className="c-app__article__card__description">Read my blog posts on what I've&nbsp;learned.</p>
          </Link>
        </section>
      </article>
    </div>);
  }
}

export {LandingPage};