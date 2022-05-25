import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const TasksProgress = (props) => {
  const { task, goal, current } = props;
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
          { task }
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {Math.round((current * 100 / goal) * 100) / 100}%
          </Typography>
          <Typography
            color="textPrimary"
            variant="h6"
          >
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={Math.round((current * 100 / goal) * 100) / 100}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
)};
