import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const StatisticPanel = ({ title, value, subTitle, valueSubTitle }) => {
return (
  <Card
    sx={{ height: '100%' }}
  >
    <CardContent>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: '1rem' }}
          >
          { title }
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           { value } 
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: '1rem' }}
          >
          { subTitle }
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           { valueSubTitle } 
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
}
