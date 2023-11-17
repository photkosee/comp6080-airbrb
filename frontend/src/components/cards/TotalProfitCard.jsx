import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// a card showing total profit made and total online time
const TotalProfitCard = (props) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant="body3" component="div">
          {
            localStorage.getItem('postedOn') !== 'null'
              ? <div>
                  Up online: {props.timeDiff(null, localStorage.getItem('postedOn'))} Days
                </div>
              : <div>
                  Currently not publishing
                </div>
          }
        </Typography>
        <Typography gutterBottom variant="body5" component="div" className='break-all'>
          Total booked time this year: {props.sumBooking} Days
        </Typography>
        <Typography variant="body5" className='break-all'>
          Total profits this year: {props.sumBooking * localStorage.getItem('price')} $
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalProfitCard;
