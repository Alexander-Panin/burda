import React from 'react'
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const SCROLL_INTERVAL = 75;
const SCROLL_DELAY_END = 150;

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      headerCls: 'visible',
    }
    this.onScrollGuarded = this.onScrollGuarded.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  componentDidMount() {
    this.scrollPosition = 0;
    this.nowForOnScroll = Date.now();
    this.timerForScrollEnd = null;
    window.addEventListener('scroll', this.onScrollGuarded)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollGuarded)
    if (this.timerForScrollEnd !== null) {
      window.clearTimeout(this.timerForScrollEnd);
    }
  }

  onScrollGuarded() {
    if (Date.now() < this.nowForOnScroll + SCROLL_INTERVAL) { return; }
    this.nowForOnScroll = Date.now();
    this.onScroll();
  }

  onScroll() {
    const topPosition = document.body.getBoundingClientRect().top;
    const down = this.scrollPosition > topPosition;
    this.setState({ headerCls: down ? 'hidden' : 'visible' })
    this.scrollPosition = topPosition;
    this.onScrollEndGuarded();
  }

  onScrollEndGuarded() {
    if (this.timerForScrollEnd !== null) {
      window.clearTimeout(this.timerForScrollEnd);
    }
    this.timerForScrollEnd = window.setTimeout(this.onScrollEnd, SCROLL_DELAY_END);
  }

  onScrollEnd() { this.setState({ headerCls: 'visible' }); }

  render() {
    return (
      <React.Fragment>
        <Header cls={this.state.headerCls} />
        <Content className="content" paragraphs={this.props.paragraphs || []} />
        <Footer />
      </React.Fragment>
    );
  }
}
