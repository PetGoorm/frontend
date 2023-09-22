import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
} from '../sections/@dashboard/app';

import { Calendar } from "../components/calendar/Calendar";
import Todofeed from 'components/todo/Todofeed';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜를 저장할 상태 추가

  // Calendar 컴포넌트에서 선택한 날짜를 받아와서 상태 업데이트
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

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
            <Calendar onDateSelect={handleDateSelect}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Todofeed selectedDate={selectedDate}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          
        </Grid>
      </Container>
    </>
  );
}
