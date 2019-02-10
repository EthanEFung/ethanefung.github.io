
import React, {Component} from 'react';
import './resume-modal.scss'


class ResumeModal extends Component {
  state = {
    sectionIndex: 0,
  }

  handleResume(index) {
    this.setState({sectionIndex: index});
  }

  render() {
    return (
      <div className='c-resume-modal'>
        <div className='c-resume-modal__container'>
          <article className='c-resume' onClick={(e) => {}}>
            <section className='c-resume__section c-resume__header'>
              <h1 className='o-header c-resume__header-text'>
                Ethan Emmanuel Fung – Full Stack Software Engineer
              </h1>
              <ul className='c-resume__contact-info__container'>
                <li className='c-resume__contact-info__item'>
                  626-354-8475
                </li>
                <li className='c-resume__contact-info__item'>
                  EthanEFung@gmail.com
                </li>
                <li className='c-resume__contact-info__item'>
                  linkedin.com/in/e-emmanuel-fung
                </li>
                <li className='c-resume__contact-info__item'>
                  ethanefung.github.io
                </li>
                <li className='c-resume__contact-info__item'>
                  github.com/EthanEFung
                </li>
                <li className='c-resume__contact-info__item'>
                  codepen.io/EthanEFung
                </li>
              </ul>
            </section>
            <nav className="c-resume__section c-resume__navigation__container">
              <button className={`o-header
                  c-resume__navigation__item
                  c-resume__navigation__experience
                  ${this.state.sectionIndex === 0 ? 'active': ''}`
                }
                onClick={this.handleResume.bind(this, 0)}
              >
                EXPERIENCE
              </button>
              <button className={`o-header
                  c-resume__navigation__item
                  c-resume__navigation__projects
                  ${this.state.sectionIndex === 1 ? 'active': ''}`
                }
                onClick={this.handleResume.bind(this, 1)}
              >
                PROJECTS
              </button>
              <button 
              className={`o-header
                  c-resume__navigation__item
                  c-resume__navigation__education
                  ${this.state.sectionIndex === 2 ? 'active': ''}`
                }
                onClick={this.handleResume.bind(this, 2)}
              >
                PRIOR&nbsp;WORK
              </button>
            </nav>
            
            {[
              <section className='c-resume__section c-resume__section__container c-resume__experience'>
                <h2 className='o-header
                  c-resume__section__sub-header
                  c-resume__experience__header
                '>Full Stack Developer - EKA Solutions - April 2018 - Present</h2>
                <p>Promoted from the QA team, I read and write SCSS, React, Redux,
                  Express, Bookshelf and Postgres daily. Accomplishments: creating
                  client facing filters that query our database for thousands of data
                  points and extending our testing  library with intuitive Nightwatch
                  scripts. Proud to document code, have strong debugging skills,
                  diligent in end-to-end testing and writing BEM driven SCSS 
                  and&nbsp;flex-box.</p>
                <h2 className='o-header
                  c-resume__section__sub-header
                  c-resume__experience__header
                '>Teaching Fellow - Hack Reactor – December 2017 - May 2018</h2>
                <p>Gave live online JavaScript lectures to sixty students twice a
                  week, and held office hours to support and code review half the
                  class on my off days. Lesson topics ranged from higher order
                  functions, to closures and object orientated programming. Led my
                  students to the highest average assessment scores of
                  ten&nbsp;groups.</p>
              </section>,
              <section className='c-resume__section c-resume__section__container c-resume__projects'>
                <h2 className='o-header
                  c-resume__section__sub-header
                  c-resume__projects__header
                '>Wandr – Time Management Chrome Extension – Present</h2>
                <p>A framework-less personal project built with semantic HTML, CSS3
                  variables and animations, ES6 and Chrome Extension APIs. Application
                  monitors user specified website usage and stores minutes locally.
                  Users can add, delete, and update timers to monitor specific sites.
                  A future feature will generate reports using Sendgrid API.</p>

                <h2 className='o-header
                  c-resume__section__sub-header
                  c-resume__projects__header
                '>CARe – Mechanic / Client Relations Web Application Thesis – 2017</h2>
                <p>Created the configuration page for the Mechanic’s Dashboard, and
                  developed the Appointments feature. The UI utilized Bootstrap,
                  FullCalendar.io, Booking.js, React, and Redux. The feature was built
                  on Express and persisted using Sequelize, Postgres and Timekit.io.
                </p>

                <h2 className='o-header
                  c-resume__section__sub-header
                  c-resume__projects__header
                '>Boom Boom Cats – Web Browser Game - 2017</h2>
                <p>Learned basic SCRUM principles and project management using Trello,
                  data persistence using MongoDB, REST protocol using mLab, and version
                  control (Github).</p>
              </section>,
              <section className='c-resume__section c-resume__section__container c-resume__education'>
                <ul>
                  <li>
                    Medical Assistant at Comprehensive Cardiovascular Specialists –
                    2014-2017
                  </li>
                  <li>
                    Bachelor of Arts in Sociology at Boston University – 2009-2013
                  </li>
                  <li>
                    Advanced Immersion Certificate in Software Engineering at
                    Hack Reactor – Sept 2017
                  </li>
                  <li>
                    AI Programming with Python Certificate at Udacity - Present
                  </li>
                  <li>
                    Javascript Algorithms and Data Structures Certificate from
                    freeCodeCamp - May 2018
                  </li>
                </ul>
              </section>
            ][this.state.sectionIndex]}
          </article>
          <button className='c-resume-modal__close' onClick={this.props.onClick}></button>
        </div>
      </div>
    );
  }
}

export {ResumeModal};
