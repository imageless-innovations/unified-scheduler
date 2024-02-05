import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { OverviewBudget } from 'src/sections/overview/overview-budget';
// import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
// import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
// import { OverviewSales } from 'src/sections/overview/overview-sales';
// import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
// import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
// import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
// import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Home | Fab Lab
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
      <Grid
          container
          spacing={3}
        >
          {[
            {image:"https://demonstration.fab-manager.com/uploads/space_image/47/large_space_image.jpeg",
            title:"Multimedia conference room",
          _id:"1"
          },
          {image:"https://demonstration.fab-manager.com/uploads/space_image/953/large_space_image.jpg",
            title:"Salle MNP",
          _id:"2"
          },
          {image:"https://demonstration.fab-manager.com/uploads/space_image/46/large_space_image.jpeg",
            title:"Meeting room - CEADS",
          _id:"3"
          },
          {image:"https://demonstration.fab-manager.com/uploads/space_image/48/large_space_image.jpg",
            title:"Salle 119 - DigiHub",
          _id:"4"
          },
          ].map((item,idx)=>{
            return <Grid
            xs={12}
            sm={6}
            lg={3}
            key={item._id}
          >
            <img src={item.image} style={{width:"100%",height:"200px"}} />
            <h3>{item.title}</h3>

            </Grid>

          })        }
            </Grid>
        </Container>
     
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
