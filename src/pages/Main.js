import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { Calendar } from "../components/calendar/Calendar";
import Todofeed from 'components/todo/Todofeed';
import RecentlyBoards from 'components/board/RecentlyBoards';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  return (
    <>
      <Helmet>
        <title> main | 펫구름 </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          펫구름
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Calendar/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Todofeed/>
          </Grid>
          

          <Grid item xs={12} md={6} lg={8}>
            <RecentlyBoards />
            {/* <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
