
import React, { Component } from 'react';
import './resume-modal.scss'


class ResumeModal extends Component {
  render() {
    return (
      <div className='c-resume-modal'>
        <article className=' c-resume-modal__container'>
          <section className='c-resume c-resume-modal__resume' onClick={(e) => {}}>
          
          </section>
          <button className='c-resume-modal__close' onClick={this.props.onClick}></button>
        </article>
      </div>
    );
  }
}

export {ResumeModal};
