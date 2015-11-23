/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react'
import withStyles from '../../decorators/withStyles'
import styles from './RegisterPage.css'
import Link from '../Link'

@withStyles(styles)
class RegisterPage extends Component {

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
      let res = await qwest.post('/api/user/signup', {
        name: this.refs.name.value,
        password: this.refs.password.value
      })
      if (res.status == 201) {
        localStorage.name = this.refs.name.value
        window.location = '/'
      }
    } catch (err) {
      this.setState({
        error: '用户名或密码不合法'
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
              <input ref="name" name="name" type="text" placeholder="用户名（请使用邮箱或手机号）" />
            </div>
            <div>
              <input ref="password" name="password" type="password" placeholder="密码（不少于6位）" />
            </div>
          </div>
          <button className="RegisterPage-button" onClick={() => this.register()}>
            { this.state.error || '注册' }
          </button>
          <div className="Register-hinter">
            <Link to='/login'>
              登录 WonderLand 帐号
            </Link>
          </div>
          <div className="Register-divider_l"></div>
          <div className="Register-title2">社交账号注册</div>
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

export default RegisterPage
