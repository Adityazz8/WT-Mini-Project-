# Local Storage Implementation Guide

## Overview
This document explains how user registration and booking data are stored and persisted using browser localStorage in the Veluxe Motors application.

---

## localStorage Keys

### 1. `registeredUsers`
Stores all registered user accounts with their details and bookings.

**Structure:**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "dob": "1990-01-15",
    "password": "hashedPassword123",
    "registeredAt": "2026-04-22T10:30:00.000Z",
    "bookings": [
      {
        "id": "9876543210",
        "vehicle": "BMW X7",
        "vehicleType": "car",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1 (555) 123-4567",
        "pickupDate": "2026-05-01",
        "dropoffDate": "2026-05-05",
        "license": "DL12345678",
        "requirements": "Extra GPS",
        "status": "confirmed",
        "bookedAt": "2026-04-22T10:30:00.000Z"
      }
    ]
  }
]
```

**Fields:**
- `id`: Unique user identifier (timestamp-based)
- `name`: User's full name
- `email`: User's email address (unique)
- `phone`: User's contact number
- `dob`: Date of birth (YYYY-MM-DD format)
- `password`: User's password (stored as plain text for demo - encrypt in production)
- `registeredAt`: Registration timestamp (ISO 8601 format)
- `bookings`: Array of booking objects for this user

### 2. `bookings`
Stores all bookings made by any user (registered or guest).

**Structure:**
```json
[
  {
    "id": "9876543210",
    "vehicle": "Mercedes-Benz E-Class",
    "vehicleType": "car",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1 (555) 987-6543",
    "pickupDate": "2026-05-10",
    "dropoffDate": "2026-05-15",
    "license": "DL98765432",
    "requirements": "Child seat needed",
    "status": "confirmed",
    "bookedAt": "2026-04-22T11:00:00.000Z"
  }
]
```

### 3. `currentUser`
Stores the currently logged-in user's session information.

**Structure:**
```json
{
  "id": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "role": "customer",
  "loginTime": "2026-04-22T10:30:00.000Z"
}
```

**For Admin:**
```json
{
  "id": "admin",
  "name": "Admin User",
  "email": "admin@veluxe.com",
  "role": "admin",
  "loginTime": "2026-04-22T10:30:00.000Z"
}
```

---

## Flow Diagrams

### Registration Flow
```
User fills registration form
         ↓
handleRegister() validates data
         ↓
Check if email already exists in registeredUsers
         ↓
Create new user object with empty bookings array
         ↓
Add user to registeredUsers array
         ↓
Save to localStorage['registeredUsers']
         ↓
Redirect to login page
```

### Login Flow
```
User enters email and password
         ↓
Select role (Customer/Admin)
         ↓
If Admin: Check hardcoded admin credentials
If Customer: Search registeredUsers for matching email/password
         ↓
Create currentUser object
         ↓
Save to localStorage['currentUser']
         ↓
Redirect to dashboard
```

### Booking Flow
```
User selects vehicle and fills booking form
         ↓
submitBooking() validates dates
         ↓
Create booking object with unique ID
         ↓
Add to general bookings array
         ↓
Save to localStorage['bookings']
         ↓
If user is logged in: Also add to user's bookings in registeredUsers
         ↓
Update localStorage['registeredUsers']
         ↓
Show success message
```

### Admin Dashboard Flow
```
Admin logs in
         ↓
loadAdminDashboard() checks admin access
         ↓
Load all registeredUsers from localStorage
         ↓
For each user: Display user card with their bookings
         ↓
calculateStats() counts total users and bookings
         ↓
Display statistics cards
```

---

## Data Persistence

All data persists automatically because:
1. **localStorage** is a browser API that persists data across sessions
2. Data remains even after:
   - Page refresh (`F5`)
   - Browser close and reopen
   - Navigating to different URLs within the same domain
3. Data is cleared only if:
   - User manually clears browser cache/history
   - Developer calls `localStorage.clear()`
   - User logs out (only `currentUser` is removed)

---

## Demo Credentials

### Customer Login
- **Email:** customer@veluxe.com
- **Password:** password123

### Admin Login
- **Email:** admin@veluxe.com
- **Password:** admin123

**Note:** Customer credentials are hardcoded for demo. Register new customers through the registration page.

---

## Key Features

✅ **User Registration** - Stores full user details with unique ID
✅ **Password Storage** - Validates against stored password on login
✅ **Booking Linkage** - Bookings are linked to registered users
✅ **Dual Storage** - Bookings stored both globally and per-user
✅ **Data Persistence** - All data survives page refresh and browser restart
✅ **Admin Dashboard** - Displays all users and their bookings
✅ **Search Functionality** - Filter users by name or email
✅ **Statistics** - Real-time counting of users and bookings (cars vs bikes)

---

## Testing Checklist

1. **Registration**
   - [ ] Register a new user and verify data appears in admin dashboard
   - [ ] Try registering with duplicate email (should show error)
   - [ ] Refresh page and verify user is still there
   - [ ] Close and reopen browser, user should persist

2. **Login**
   - [ ] Login with registered user credentials
   - [ ] Verify current user name appears in navbar
   - [ ] Try wrong password (should show error)
   - [ ] Login as admin

3. **Booking**
   - [ ] Book a vehicle as logged-in user
   - [ ] Check admin dashboard - booking should appear under user
   - [ ] Refresh page and verify booking is still there
   - [ ] Make another booking and verify both appear

4. **Admin Dashboard**
   - [ ] Verify total users count is correct
   - [ ] Verify total bookings count includes all bookings
   - [ ] Test search by user name
   - [ ] Test search by email
   - [ ] Verify statistics update in real-time

5. **Data Persistence**
   - [ ] Make a booking, refresh page - booking still there
   - [ ] Close browser completely, reopen and navigate to admin - all data still there
   - [ ] Open browser DevTools → Application → Local Storage → verify all keys exist

---

## localStorage Inspection

To view stored data in browser DevTools:

1. Open DevTools (`F12`)
2. Go to **Application** tab
3. Click **Local Storage** in left sidebar
4. Select your domain
5. View all stored data in JSON format

**Example to view in console:**
```javascript
// View all users
console.log(JSON.parse(localStorage.getItem('registeredUsers')));

// View all bookings
console.log(JSON.parse(localStorage.getItem('bookings')));

// View current logged-in user
console.log(JSON.parse(localStorage.getItem('currentUser')));
```

---

## Notes for Production

⚠️ **Security Considerations:**
- Never store passwords in plain text (use encryption/hashing)
- Use HTTPS for all communications
- Implement server-side validation
- Use secure session tokens instead of localStorage for sensitive data
- Consider IndexedDB for large datasets
- Implement data encryption for sensitive user information

---

## File References

- **Registration:** `frontend/register.html`
- **Login:** `frontend/login.html`
- **Booking:** `frontend/booking.html`
- **Admin Dashboard:** `admin-dashboard.html`
- **Main Script:** `script.js`
