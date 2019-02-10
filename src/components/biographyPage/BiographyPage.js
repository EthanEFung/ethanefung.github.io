import React, {Component} from 'react';
import './biography.scss';
import '../../App.scss';

class BiographyPage extends Component {
  constructor(props) {
    super(props);
    this.year = new Date().getFullYear();
    this.prettyNumbers = [
      'zero', 'one', 'two', 'three', 'four', 'five',
      'six', 'seven', 'eight', 'nine', 'ten'
    ];
    this.manyYearsAgo = this.year - 2017
    this.manyYearsAgo = this.manyYearsAgo <= 10 
      ? this.prettyNumbers[this.manyYearsAgo]
      : this.manyYearsAgo;
    this.manyYearsAgo += ' '
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div className='c-page
        c-biography-page
        c-biography-page__container
      '>
        <div className='c-biography__container'>
          <header className='c-biography__header'>
            <h1 className='o-header-text'>Biography</h1>
          </header>
          <article className='c-biography'>
            <section className='c-biography__section'>
              <p>While working as a Medical Assistant at a small clinic in Los 
              Angeles, I began to get a name for myself as the 'go-to' staff
              member for software and hardware problems. But to be truthful,
              the bulk of my consultations were spent teaching my colleagues
              how to navigate&nbsp;interfaces.</p>
            </section>
            <section className='c-biography__section'>
              <p>At first, I scheduled a few hours out of my work day to teach
              my colleagues how to use the menus and forms they were expected 
              to know. But it was obvious from the beginning that the majority  
              of our frustrations at the clinic revolved around unintuitive 
              software, and this prevented the team from giving patients our
              full&nbsp;attention.</p>
            </section>
            <section className='c-biography__section'>
              <p>So, I started to take interest in software because I wanted 
              to build a product that my colleagues would use. I started to 
              learn HTML, CSS, and JavaScript quickly learning that building
              applications with great UX and UI is a difficult task, but 
              worth pursuing. I say this from experience since I made this hobby
              a carrier. Now, I'm a fullstack software engineer at a 
              small&nbsp;startup.</p>
            </section>
            <section className='c-biography__section'>
              <p>I left the medical field {this.manyYearsAgo} years ago, and while 
              I miss the team I left, I've found work that I love. Because our team
              is small, I get to play a key role in building a modern but intuitive
              application that remains useful in a complex industry. I've had to take
              on a great deal of responsibilities given our team size, but I enjoy
              the challenge of meeting business demands while maintaining organized
              and scalable&nbsp;code.</p>
            </section>
            <section className='c-biography__section'>
              <p>My interest in tech doesn't end in web development however. While
              traditional software mediums like web forms are powerful tools that
              will persist for years to come, I'm excited by the advances an Artificial
              Intelligence, and its integration with IoTs and telematics. These
              technologies pose tremendous potential to help small businesses and
              improve the healthcare industry. Though, I have years of training to get
              to a point in my carrier of building my own IoT for now I'm building an
              image classifier as a hobby. But knowing how fun I'm having I don't
              expect to stop there.
              </p>
            </section>
          </article>
        </div>
      </div>
    );
  }
}

export {BiographyPage};
