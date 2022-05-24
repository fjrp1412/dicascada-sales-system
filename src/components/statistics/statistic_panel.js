import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const StatisticPanel = ({ title, value }) => {
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
            color="textSecondary"
            gutterBottom
            variant="overline"
            sx={{ fontSize: '1rem' }}
          >
          { title }
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            sx={{ fontSize: '1.5rem' }}
          >
           { value } 
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </Box>
    </CardContent>
  </Card>
);
}
