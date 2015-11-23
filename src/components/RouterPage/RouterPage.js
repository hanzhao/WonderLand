/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'
import styles from './RouterPage.css'
import withStyles from '../../decorators/withStyles'

@withStyles(styles)
class RouterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.setState({
      name: localStorage.name
    })
  }

  render() {
    const title = 'WonderLand'
    this.context.onSetTitle(title);
    return (
      <div className="RouterPage-vertical-container">
        <div className="RouterPage-logo"><img src={require('./avatar.png')} /></div>
        <div className="RouterPage-text">{this.state.name}</div>
        <div className="RouterPage-line"> </div>
        <div className="RouterPage-flex">
          <div className="RouterPage-opacity-button" onClick={() => window.location = '/record'}>
            <div className="RouterPage-div-inbtn">
              <img className="RouterPage-icon" src={require('./tb1.png')} />
              <div className="RouterPage-chn-text"> 记录梦境 </div>
              <div className="RouterPage-eng-text"> dream record </div>
            </div>
          </div>
        </div>
        <div className ="RouterPage-flex">
          <div className="RouterPage-opacity-button" onClick={() => window.location = '/timeline'}>
            <div className="RouterPage-div-inbtn">
              <img className="RouterPage-icon" src={require('./tb2.png')} />
              <div className="RouterPage-chn-text"> 查看梦境 </div>
              <div className="RouterPage-eng-text"> view dreams </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default RouterPage
