# unified-scheduler
Single solution for scheduling Rooms, Equipment for Checkout, and Equipment located in a room.

## Organization Planning (DRAFT)

```
HOME PAGE/
  │   ├── Landing Page :  Boxed Images that link descriptions for each service area below
  │   |  ├── Unified Announcement Pages
  │   |  ├── Unified Event Page
  │   |  ├── Unified Gallery
  │   |  ├── Description Page with Contact Information.

SIDE MENU/
  |   ├── Reserve a Room (Service Area)/
  │   |  ├── For each room, a boxed image that allows reservation to be made, view calendar of
             reservations and availability, link to description of the room /
  │   |  ├── Announcements
  │   |  ├── Calendar with Operating Hours (so you can mark holidays and closings as well as operating hours)
  │   |  ├── Events
  │   |  ├── Policies
  │   |  ├── Gallery
  │   |  ├── Description Page with Support Information and Operating Hours.
  |   ├── Checkout Equipment (Service Area)/
  │   |  ├── For each piece of equipment, a boxed image that allows a check out reservation to be made, view
             calendar that shows when it was checked out and when it will be returned and add to waitlist if checked out, link to description of the equipment /
  │   |  ├── Announcements
  │   |  ├── Calendar with Operating Hours for pickups anbd returns (so you can mark holidays and closings
             as well as operating hours)
  │   |  ├── Events
  │   |  ├── Policies
  │   |  ├── Gallery
  │   |  ├── Description Page with Support Information and Operating Hours.
  |   ├── Lab #1 (Service Area: Allow appointments to be made on a machine in a Lab)
  │   |  ├── For each piece of equipment, a boxed image that allows a reservation to be made on the equipment,
             view calendar that shows current reservations and availabilty, link to description of the equipment /
  │   |  ├── Announcements
  │   |  ├── Calendar with Operating Hours (so you can mark holidays and closings as well as operating hours)
  │   |  ├── Events
  │   |  ├── Policies
  │   |  ├── Gallery
  │   |  ├── Description Page with Support Information and Operating Hours.

        ... allow for multiple Labs to be created, each independent of the others.
### Database design
[Database ER diagram](/documentation/database-design.png 'Database ER diagram')

/* We will want to allow for Global Announcements
 
