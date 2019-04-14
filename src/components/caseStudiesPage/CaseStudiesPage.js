
import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from './Home';

import ProblemSolvingOverDomainKnowledge from './ProblemSolvingOverDomainKnowledge';
import TestingWithNightwatch from './TestingWithNightwatch';
import './case-studies.scss';

function CaseStudiesPage () {

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
          <Link to='/cases/problem_solving'>
            <p>Problem Solving > Domain Knowledge</p>
          </Link>
          <Link to='/cases/testing_with_nightwatch'>
            <p>Testing with Nightwatch</p>
          </Link>
        </ul>
      </aside>
      <Route path='/cases/problem_solving' component={ProblemSolvingOverDomainKnowledge} />
      <Route path='/cases/testing_with_nightwatch' component={TestingWithNightwatch} />
      <Route
        exact
        path='/cases'
        render={() => <Home />}
      />
    </div>
  );
}

export {CaseStudiesPage};
