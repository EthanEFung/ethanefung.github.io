
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './case-studies.scss';

class Home extends Component {

  render() {
    return (
      <div className='o-jumbo-cards__container c-content'>
        <h2 className='o-header-text o-header-text--light'>Featured</h2>
        <Link to='/cases/problem_solving' className='o-jumbo-card o-jumbo-card--light'>
          <h3>Problem Solving > Domain Knowledge</h3>
        </Link>
        <Link to='/cases/testing_with_nightwatch' className='o-jumbo-card o-jumbo-card--light'>
          <h3>Testing with Nightwatch.js</h3>
        </Link>
      </div>
    );
  }
}

export default Home;
