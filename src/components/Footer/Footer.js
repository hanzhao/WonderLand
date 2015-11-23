/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withViewport
@withStyles(styles)
class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props, context) {
    super(props, context)
    this.state = {
      hidden: true
    }
  }

  componentDidMount() {
    if (window.location.pathname !== '/register' &&
        window.location.pathname !== '/login')
      return this.setState({
        hidden: false
      })
  }

  render() {
    // This is just an example how one can render CSS
    const { width, height } = this.props.viewport;
    this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);
    if (this.state.hidden)
      return (<div></div>)
    return (
      <div className="Footer">
      <div className="Footer-item">
        <Link to="/record"><img src={require('./record.png')} /></Link>
      </div>
      <div className="Footer-item">
        <Link to="/timeline"><img src={require('./timeline.png')} /></Link>
      </div>
      <div className="Footer-item">
        <Link to="/router"><img src={require('./my.png')} /></Link>
      </div>
      </div>
    );
  }

}

export default Footer;
