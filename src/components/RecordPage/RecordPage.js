/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'
import withStyles from '../../decorators/withStyles'
import styles from './RecordPage.css'
import Link from '../Link'

class Moyomoyo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      audioRecord: true
    }
  }
  toggle(target) {
    this.setState({
      audioRecord: target
    })
  }
  render() {
    if (this.state.audioRecord) {
      return (
        <div className="audio">
          <img className="audioimg" />
        </div>
      )
    } else {
      return (
        <div className="checker-container">
          <div className="checker-yes" onClick={() => this.props.onConfirmed()}>
            <img src={require('./yes.png')} />
          </div>
          <div className="checker-no" onClick={() => this.toggle(true)}>
            <img src={require('./no.png')} />
          </div>
        </div>
      )
    }
  }
}

@withStyles(styles)
class RecordPage extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      typed: false
    }
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  }

  handleTyped() {
    this.refs.checker.toggle(false)
  }

  async handleConfirmed() {
    let qwest = require('qwest')
    try {
      let xhr = await qwest.post('/api/dream/new', {
        text: this.refs.text.value
      })
      window.location = '/timeline'
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const title = '邂逅';
    this.context.onSetTitle(title);
    return (
      <div className="RecordPage vertical-container">
        <div className="sleep">
          <img className="sleepimg" src={require('./zzz.png')} />
          <div id="small-text" className="text-inbtn"> 今天的梦是怎样的呢<br/>记录下来吧 ？ </div>
        </div>
        <div className="title">
          <img className="titleimg" src={require('./record.png')} />
          <div className="titletext"> 梦境记录 </div>
        </div>
        <textarea ref="text" onChange={() => this.handleTyped()} placeholder="欢迎尝试更快捷的语音智能输入..." required />
        <Moyomoyo ref="checker" onConfirmed={() => this.handleConfirmed()} />
      </div>
    )
  }

}

export default RecordPage
