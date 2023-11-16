import React from 'react';

import Card from '@mui/material/Card';
import { BarChart } from '@mui/x-charts';

// a card of graph calculating host's profits
const ChartCard = (props) => {
  return (
    <Card>
      <div className="flex justify-center mt-5">
        Profit for the past month
      </div>

      <BarChart
        xAxis={[{
          scaleType: 'band',
          data: Array.from({ length: 31 }, (_, index) => index),
          label: 'Number of how many days ago',
        }]}
        yAxis={[{
          label: 'Profit made ($)',
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
