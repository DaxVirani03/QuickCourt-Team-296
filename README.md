# 🏸 QuickCourt – Your Local Sports Booking Buddy

QuickCourt helps you **find and book sports facilities nearby**—from badminton courts to turf grounds or ping pong tables. We make it **easy, fun, and hassle-free** to play your favorite sport with friends or join the local community.

## 🎯 Who Uses QuickCourt?
- **Players:** Book and play at venues.
- **Facility Owners:** Manage courts and bookings.
- **Admins:** Keep everything fair and running smoothly.

## 🚀 What Can You Do?

### For Players
- **Find Venues:** Search and filter by sport, price, location, or rating.
- **Venue Info:** See photos, amenities, reviews, and click “Book Now.”
- **Easy Booking:** Pick a court and time, check the price, pay (simulated), and you’re done.
- **My Bookings:** Track upcoming games and cancel if needed.
- **Edit Profile:** Update your details anytime.

### For Facility Owners
- **Dashboard:** View all bookings, active courts, and earnings.
- **Manage Facilities:** Add or edit venues, courts, and set availability.
- **Block Time Slots:** Reserve time for maintenance or special events.
- **Booking Overview:** See who’s playing and when.

### For Admins
- **Global Overview:** Monitor users, facilities, bookings, and sports stats with charts.
- **Approval Workflow:** Review and approve/reject new facility requests.
- **User Management:** Search, filter, ban/unban users, and check booking histories.

---

## 🛠 Tech Stack
- **Frontend:** React.js + Tailwind CSS for a beautiful, responsive design.
- **Backend:** Node.js + Express.js (REST API).
- **Database:** MongoDB (using MongoDB Compass).
- **Authentication:** JWT + bcrypt for secure logins.
- **Charts:** Chart.js / Recharts for analytics.
- **Image Uploads:** Multer.
- **Payments:** Simulated (no real transactions).

---

## 🗃 Database Overview
- **Users:** Name, Email, Password, Role, Avatar, OTP status
- **Facilities:** Name, Location, Sports, Amenities, Photos, Owner
- **Courts:** Name, Sport, Price, Availability, Linked Facility
- **Bookings:** User, Facility, Court, Date/Time, Status, Payment Info
- **Reviews:** User, Facility, Rating, Comment

---

> **QuickCourt makes booking and playing sports nearby fun and simple—for everyone!**
