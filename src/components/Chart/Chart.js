import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import './Chart.scss'

const Chart = (props) => {
  
    const {title, data, description, color} = props
    
    return (
        <div className="chart">
          <div className="chart-name">{title}</div>
          <Sparklines data={data} >
              <SparklinesLine color={color} />
          </Sparklines>
          <div className="chart-desc">{description}</div>
        </div>
      );
}

export default Chart;
