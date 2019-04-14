import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom';
import {loadReCaptcha} from 'react-recaptcha-google'
import {LandingPage, BiographyPage, ResumeModal, CaseStudiesPage, KeepItSimpleStupid} from './components';
import './App.scss';
import './utilities.scss'


class App extends Component {
  state = {
    showResumeModal: false,
  }

  componentDidMount() {
    loadReCaptcha();
    window.title = 'EthanEFung.github.io'
  }

  handleResumeModal= (e) => {
    e.preventDefault();
    this.setState({showResumeModal: !this.state.showResumeModal});
  }

  render() {
    return (
      <div>
        {this.state.showResumeModal && <ResumeModal onClick={this.handleResumeModal}/>}
        <nav className="c-app__navigation">
          <div className="c-app__navigation__links">
            <NavLink className="c-app__navigation__link" exact to='/'>Home</NavLink>
            <NavLink className="c-app__navigation__link" to='' onClick={this.handleResumeModal}>Resume</NavLink>
            <NavLink className="c-app__navigation__link" to='/cases'>Case&nbsp;Studies</NavLink>
          </div>
        </nav>

        
        <Route
          exact
          path='/'
          render={routeProps => <LandingPage handleResumeModal={this.handleResumeModal} {...routeProps} />}
        />
        <Route path='/biography' component={BiographyPage} />
        <Route path='/cases' component={CaseStudiesPage} />
        <footer className="c-app__footer"></footer>
      </div>
    );
  }
}

export default App;
