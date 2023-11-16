import React from 'react';

import Card from '@mui/material/Card';
import { BarChart } from '@mui/x-charts';

// a card of graph calculating host's profits
const ChartCard = (props) => {
  return (
    <Card>
      <BarChart
        xAxis={[{
          scaleType: 'band',
          data: Array.from({ length: 31 }, (_, index) => index),
          label: 'number of days ago',
        }]}
        yAxis={[{
          label: '$$ made',
        }]}
        series={[
          {
            data: props.profitData,
          },
        ]}
        width={350}
        height={200}
      >
      </BarChart>
    </Card>
  );
}

export default ChartCard;
