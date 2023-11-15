import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, Chip } from '@mui/material';

const StatusCard = (props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          User: {props.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From: {props.dateRange.start}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        To: {props.dateRange.end}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip label={props.status} variant="outlined" />
      </CardActions>
    </Card>
  );
}

export default StatusCard;
