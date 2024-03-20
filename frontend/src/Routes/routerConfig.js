
import Home from '../pages/Home';

import RoomReserve from '../pages/Rooms/Rooms';
import RoomAdd from '../pages/Rooms/AddRoom';
import Resources from '../pages/Resources/Resources';
import ResourcePolicy from '../pages/Resources/Policy/ResourcePolicy';
import CreatePolicy from '../pages/Resources/Policy/Create';

const commonRoutes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/resources',
    component: Resources,
    subRoutes: [
      {
        path: '/resources/policy/',
        component: ResourcePolicy,
      },
      {
        path: '/resources/policy/create/',
        component: CreatePolicy,
      },
    ],
  },
  {
    path: '/rooms',
    component: RoomReserve,
    subRoutes: [
      {
        path: '/rooms/add/',
        component: RoomAdd,
      }
    ],
  }
 

  // Add more top-level routes as needed
];

export { commonRoutes };