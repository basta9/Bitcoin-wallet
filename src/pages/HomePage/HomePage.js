import React, { Component } from 'react';
import MoveList from '../../components/MovesList/MovesList'
import coinsImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'
import './HomePage.scss'
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import exchange from '../../assets/icons/exchange.png'

@inject('store')
@observer
class HomePage extends Component {

  userStore = this.props.store.UserStore
  state = { animation: 'animated bounce' }

  @observable
  user = null
  @observable
  bitcoinRate = 0
  @observable
  transactions = []

  componentDidMount() {
    this.userStore.fetchUser()
    this.user = this.userStore.user
    this.updateBitcoinRate()
    this.interval = setInterval(this.updateBitcoinRate.bind(this), 5000)
  }

  async updateBitcoinRate() {
    this.setState({ animation: '' })
    await this.props.store.UserStore.fetchBitcoinRate(this.user.coins)
    this.bitcoinRate = this.props.store.UserStore.bitcoinRate
    this.setState({ animation: 'animated wobble' })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      this.user && <div className="home-page">
        <section className="user-details">
          <div>
            <div className="user-name">Hello {this.user.name}!</div>
            <div className="user-coins-count">
              <img src={coinsImg} alt="coins" width="24px" height="24px" /> <b>Your Balance:</b> {this.user.coins}$
            </div>
            <div className="user-coins-rate">
              <img className={this.state.animation} src={bitcoinImg} alt="bitcoin" width="24px" height="24px" /> <b>In BTC:</b> {this.bitcoinRate}
            </div>
          </div>
          <img className="profile-img" src={exchange} />
        </section>
        <b>
          {(this.user.transactions.length === 0) ? 'You Still Dont Have Any Transaction History' : 'Your Last Transaction: '}
        </b>
        <MoveList isShown={true} transaction={(this.user.transactions.length < 4) ? this.user.transactions : this.user.transactions.slice(this.user.transactions.length - 3)} />
      </div>
    );
  }
}

export default HomePage;
