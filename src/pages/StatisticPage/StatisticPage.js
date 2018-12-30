import React, { Component } from 'react';
import Chart from '../../components/Chart';
import loader from '../../assets/icons/loader.gif';
import bitcoinService from '../../services/BitcoinService'
import './StatisticPage.scss'

class StatisticPage extends Component {

  state = {
    chartsData: [],
    loading: true
  }

  async componentDidMount() {
    this.setState({ loading: true })

    const chartsData = await Promise.all([
      bitcoinService.getMarketPrice(),
      bitcoinService.getConfirmedTransactions()
    ])
    this.setState({ chartsData, loading: false })
  }

  renderChart(chart, color) {
    const { title, data, description } = chart

    return (
      <Chart title={title}
        data={data}
        description={description}
        color={color} />
    )
  }

  render() {
    if (this.state.loading) return <img className="loader" src={loader} />

    const colors = ['blue', 'green']
    return (
      <div className="statistic-page">
        <ul>
          {
            this.state.chartsData.map((chart, idx) =>
              <li className="statistic-chart" key={idx}>{this.renderChart(chart, colors[idx])}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default StatisticPage;
