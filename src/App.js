import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import {LandingPage, BiographyPage, ResumeModal, CaseStudiesPage} from './components';
import './App.scss';
import './utilities.scss'


class App extends Component {
  constructor(props) {
    super(props);
    this.handleResumeModal = this.handleResumeModal.bind(this)
  }

  state = {
    showResumeModal: false,
  }

  handleResumeModal(e) {
    e.preventDefault();
    console.log('setting modal');
    this.setState({showResumeModal: !this.state.showResumeModal});
  }

  render() {
    return (
      <div>
        {this.state.showResumeModal && <ResumeModal onClick={this.handleResumeModal}/>}
        <nav className="c-app__navigation">
          <div className="c-app__navigation__links">
            <NavLink className="c-app__navigation__link" exact to='/'>Home</NavLink>
            <NavLink className="c-app__navigation__link" to="" onClick={this.handleResumeModal}>Resume</NavLink>
            <NavLink className="c-app__navigation__link" to='/cases'>Case&nbsp;Studies</NavLink>
          </div>
        </nav>

        
        <Route
          exact
          path='/'
          render={routeProps=> <LandingPage handleResumeModal={this.handleResumeModal} {...routeProps} />}
        ></Route>
        <Route path='/biography' component={BiographyPage}></Route>
        <Route path='/cases' component={CaseStudiesPage}></Route>
        <footer className="c-app__footer"></footer>
      </div>
    );
  }
}

export default App;
