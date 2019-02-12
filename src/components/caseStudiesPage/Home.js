
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './case-studies.scss';

class Home extends Component {
  render() {
    return (
      <div className='o-jumbo-cards__container c-content'>
      <h2 className='o-header-text'>Featured</h2>
        <Link to='/cases/keep_it_simple_stupid' className='o-jumbo-cards o-jumbo-cards--light'>
          <h3>KEEP IT SIMPLE STUPID (COMPONENTS IN REACT)</h3>
        </Link>
        <Link to='/cases/keep_it_simple_stupid' className='o-jumbo-cards o-jumbo-cards--light'>
          <h3>KEEP IT SIMPLE STUPID (COMPONENTS IN REACT)</h3>
        </Link>
        <Link to='/cases/keep_it_simple_stupid' className='o-jumbo-cards o-jumbo-cards--light'>
          <h3>KEEP IT SIMPLE STUPID (COMPONENTS IN REACT)</h3>
        </Link>
        
      </div>
    );
  }
}

export default Home;
