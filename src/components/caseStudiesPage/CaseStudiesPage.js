
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Home from './Home';

import './case-studies.scss';



class CaseStudiesPage extends Component {
  render() {
    return (
      <div className='c-page
        c-page__container
        c-case-studies-page
        c-case-studies-page__container
      '>
        <aside className='c-page__sidebar'>
          <h2 className='o-header-text c-page__sidebar__header-text'>
            Cases
          </h2>
          <ul className='c-page__sidebar__links'>
            <Link to='/cases/keep_it_simple_stupid'>
              <p>Keep It Simple&nbsp;Stupid (Components In&nbsp;React)</p>
            </Link>


          </ul>
        </aside>
        <article className='c-page__content'>
          <Route exact to='/' component={Home}></Route>
          

          {/* <Route to='/cases/keep_it_simple_stupid' component={div}></Route> */}
        </article>
      </div>
    );
  }
}

export {CaseStudiesPage};
