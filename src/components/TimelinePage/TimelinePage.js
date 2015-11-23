/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'
import styles from './TimelinePage.css'
import withStyles from '../../decorators/withStyles'

@withStyles(styles)
class TimelinePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context)
    this.state = {
      dreams: []
    }
  }

  async componentDidMount() {
    let qwest = require('qwest')
    let xhr = await qwest.get('/api/dream/all')
    let dreams = JSON.parse(xhr.response)
    return this.setState({ dreams })
  }

  renderRandomPhoto() {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return <img src={require('./0.png')} className="photo"/>
        break
      case 1:
        return <img src={require('./1.png')} className="photo"/>
        break
      case 2:
        return <img src={require('./2.png')} className="photo"/>
        break
      case 3:
        return <img src={require('./3.png')} className="photo"/>
        break
      case 4:
        return <img src={require('./4.png')} className="photo"/>
        break
    }
  }

  renderDream(dream) {
    return (
      <div className="sqr-container" key={dream._id}>
        <div className="dream-bd">
          <div className="dairy-box">
            { this.renderRandomPhoto() }
            <div className="text-bd">
              <div className="from-ca">来自 {dream.createdBy.name}</div>
              <div className="text-omit">{dream.text}</div>
            </div>
          </div>
          <div className="btm-list">
            <div className="follow"> 关注 </div>
            <img src={require('./zan.png')} className="zan-img"/>
            <div className="zan-num"> <strong> 110 </strong> </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const title = '发现'
    this.context.onSetTitle(title);
    return (
      <div className="TimelinePage">
        <div className="search">
          <input type="text" placeholder="搜索梦境或人" className="input-board"/>
          <button type="submit" className="input-btn">
            <span className="input-img"></span>
          </button>
          <img src={require('./dh.png')} className="dh-btn" />
        </div>
        { this.state.dreams.map((dream) => this.renderDream(dream)) }
      </div>
    )
  }

}

export default TimelinePage
