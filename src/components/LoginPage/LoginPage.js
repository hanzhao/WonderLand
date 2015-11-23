/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'
import withStyles from '../../decorators/withStyles'
import styles from './LoginPage.css'
import Link from '../Link'

@withStyles(styles)
class LoginPage extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      error: null
    }
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  }

  async register() {
    let qwest = require('qwest')
    try {
      let res = await qwest.post('/api/user/signin', {
        name: this.refs.name.value,
        password: this.refs.password.value
      })
      if (res.status == 200) {
        localStorage.name = this.refs.name.value
        window.location = '/'
      }
    } catch (err) {
      this.setState({
        error: '用户名与密码不匹配'
      })
      setTimeout(() => {
        this.setState({
          error: null
        })
      }, 3000)
      console.error(err)
    }
  }

  render() {
    const title = '注册新用户';
    this.context.onSetTitle(title);
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <img className="RegisterPage-header" src={require('./header.png')} />
          <div className="RegisterPage-title">WonderLand</div>
          <div className="RegisterPage-title">欢迎新的记梦者</div>
          <div className="Register-textfield">
            <div>
              <input ref="name" name="name" type="text" placeholder="用户名" />
            </div>
            <div>
              <input ref="password" name="password" type="password" placeholder="密码" />
            </div>
          </div>
          <button className="RegisterPage-button" onClick={() => this.register()}>
            { this.state.error || '登录' }
          </button>
          <div className="Register-hinter">
            <Link to='/register'>
              注册 WonderLand 帐号
            </Link>
          </div>
          <div className="Register-divider_l"></div>
          <div className="Register-title2">社交账号登录</div>
          <div className="Register-divider_r"></div>
          <div className="Register-clean"></div>
          <div className="Register-icon-container">
            <div className="Register-icon">
              <img src={require('./qq.png')} />
            </div>
            <div className="Register-icon">
              <img src={require('./weixin.png')} />
            </div>
            <div className="Register-icon">
              <img src={require('./weibo.png')} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default LoginPage
