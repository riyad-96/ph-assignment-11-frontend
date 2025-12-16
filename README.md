# TicketBari 🎫

**Live Site:** [https://ticketbari.vercel.app](https://ticketbari.vercel.app)

### 📋 Project Purpose

TicketBari is a comprehensive ticket booking platform designed to demonstrate advanced web development skills. It features a robust multi-role system (User, Vendor, and Admin) to handle complex workflows, including booking management, ticket creation, and platform-wide moderation.

### 🌟 Key Features

#### 👤 User Role

- **Account Management:** Secure signup and login functionality.
- **Ticket Booking:** Search for destinations and book tickets in real-time.
- **History:** Track booking status and personal travel details.

#### 🏢 Vendor Role

- **Inventory Management:** Create and list new tickets for travel destinations.
- **Order Management:** Manage consumer bookings with the ability to **Accept** or **Reject** requests.

#### 🛡️ Admin Role

- **User Oversight:** Manage user permissions and assign roles (User, Vendor, or Admin).
- **Content Moderation:** Approve or decline tickets listed by vendors to maintain quality.
- **Security:** Identify and mark fraudulent vendors to ensure platform safety.

### 🛠️ Tech Stack & Dependencies

#### Core

- **React 19 & React Router Dom:** For building the UI and handling routing.
- **Firebase:** Authentication and backend services.
- **Tanstack React Query:** Efficient server-state management.
- **Axios:** Handling HTTP requests.

#### UI & Animation

- **Motion:** High-performance animations.
- **Recharts:** Data visualization for the dashboard(vendor).
- **React Icons:** Modern iconography.
- **Kitzo:** _(Own)Custom library used specifically for toast notifications._

#### Form & Data Handling

- **React Hook Form:** For performance-optimized form management.
- **Date-fns:** Comprehensive date manipulation.

### 📦 Dependencies List

```json
{
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "date-fns": "^4.1.0",
  "firebase": "^12.6.0",
  "kitzo": "^2.1.29",
  "motion": "^12.23.25",
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "react-hook-form": "^7.68.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.10.1",
  "recharts": "^3.5.1"
}
```
