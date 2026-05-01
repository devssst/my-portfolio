# 📚 SLIMS - School Library Inventory Management System
### 🔰 ALPHA 1.3 - The Readable Hotfix
![Library Background](assets/images/pack_icon.png)

A modern, web-based library management system designed for **Dalubhasaang Politekniko ng Lungsod ng Baliwag**. Built with vanilla HTML, CSS, and JavaScript, featuring a sleek dark theme with glass morphism design.

---

## 🎯 Overview

SLIMS (School Library Inventory Management System) is a comprehensive solution for managing library operations including book inventory, borrower records, transaction tracking, and violation monitoring. The system provides administrators with real-time statistics and streamlined workflows for borrowing and returning books.

### 🏫 Institution
**Dalubhasaang Politekniko ng Lungsod ng Baliwag** 

---

## ✨ Key Features

### 🔐 Authentication System
- Administrator login with email and password validation
- Social login placeholders (Google & Microsoft)
- Password visibility toggle
- Account recovery system (placeholder)
- Animated error feedback

### 📊 Dashboard Overview
- **Real-time Statistics**: Total books, active borrowers, pending returns, violations
- **Instant Borrow**: Quick transaction processing with book suggestions
- **Instant Return**: Streamlined return workflow
- **Report Book**: Mark books as lost or damaged

### 👥 Borrower Management
- Add, view, and delete borrower records
- **Structured name fields**: Separate Last Name, First Name, and Middle Initial fields
- **Email validation**: Enforces @btech.ph.education domain format
- Student status indicators (New, Regular)
- Search and filter functionality
- Detailed borrower profiles with:
  - Active borrowed books
  - Transaction history
  - Violation records
  - Color-coded status indicators

### 📖 Book Management
- Add, view, update, and delete book records
- **Quantity tracking**: Specify book quantities when adding new books
- Real-time status tracking:
  - 🟢 Available
  - 🟠 Borrowed
  - 🟤 Overdue
  - ⚫ Lost
- Search and filter by status
- Book details including ISBN, author, description
- Inventory count tracking
- **Duplicate detection**: Alerts when adding books with same title but different ISBN

### 📝 Transaction Logs
- Comprehensive system activity logging
- Real-time tracking of all operations including:
  - Administrator logins
  - Book additions and deletions
  - Borrower registrations and removals
  - Book borrowing transactions
  - Book returns (with overdue tracking)
  - Book damage/loss reports
  - Notifying Overdue Borrowers
  - Updating book status
- Detailed log entries with timestamps and action details
- Automatic logging for all system actions

### ⚙️ Settings
- *Coming soon: System configuration options*

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **Design**: Glass Morphism, Dark Theme (a concept from hype4.academy)
- **Font**: Plus Jakarta Sans
- **Icons**: Font Awesome (implied by CSS icon references)
- **Grids**: CSS Grid Generator (by Netlify)

🔗 ***Links***:
- **Design Tool**: [Glass Morphism Generator](https://hype4.academy/tools/glassmorphism-generator)
- **Icons**: [Font Awesome Icons](https://fontawesome.com/v4/icons/)
- **Grid Generator**: [CSS Grid Generator](https://cssgrid-generator.netlify.app/)

---

## 📁 Project Structure

```
SLIMS_Web/
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── login.css           # Login page styling
│   │   └── dashboard.css       # Dashboard styling (glass morphism)
│   │
│   ├── 📂 js/
│   │   ├── auth.js             # Authentication logic
│   │   └── dashboard.js        # Dashboard functionality & data
│   │
│   └── 📂 images/
│       ├── btech_logo.PNG      # School logo
│       ├── google.png          # Google SSO icon
│       ├── library_bg.png      # Background image
│       └── microsoft.png       # Microsoft SSO icon
│
├── 📂 pages/
│   └── dashboard.html          # Main dashboard page
│   
├── index.html                  # Login page (entry point)
├── README.md                   # Project documentation                
└── LICENSE.md                  # MIT License
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)


### Default Login Credentials

For testing purposes, use these credentials:

- **Email**: `admin@btech.ph.education`
- **Password**: `12345678`
- **Admin Key**: `admin123`

> ⚠️ **Security Note**: These are dummy credentials for development. Replace with secure authentication before deployment.

---

## 🎨 Design Features

### Color Scheme
- **Primary**: `#000000` (Black)
- **Accent**: `#763ff7` (Purple)
- **Background**: Dark with overlay
- **Status Colors**:
  - 🟢 Available/Success: `#00c853`
  - 🟠 Borrowed: `#ffb74d`
  - 🟤 Overdue: `#e65100`
  - 🔴 Lost/No Record: `#ff4d4d`
  - 🔵 New: `#2979ff`

### UI/UX Highlights
- Glass morphism panels with backdrop blur
- Smooth transitions and animations
- Responsive hover effects
- Shake animation for error states
- Fade-in animations for screen transitions
- Custom scrollbar styling

---

## 📋 Usage Guide

### Logging In
1. Navigate to the login page (`index.html`)
2. Click "GO TO LOGIN →"
3. Enter valid credentials
4. Click "AUTHORIZE"

### Managing Books
1. Navigate to "Book Management" from sidebar
2. Use search bar to find specific books
3. Filter by status using dropdown
4. Click "View Details" to see full book information
5. Update status or delete as needed

### Processing Transactions
1. Go to "Dashboard Overview"
2. **To Borrow**:
   - Click "Instant Borrow"
   - Select borrower
   - Start typing book title for suggestions
   - Confirm transaction
3. **To Return**:
   - Click "Instant Return"
   - Select borrower with active loans
   - Select book to return
   - Confirm return

### Managing Borrowers
1. Navigate to "Borrower Management"
2. Add new borrowers with student details
3. View detailed profiles showing:
   - Currently borrowed books
   - Borrowing history
   - Any violations or overdue items
4. Color-coded status indicators for quick assessment

---

## 🔧 Configuration

### Modifying Dummy Credentials
Edit `assets/js/auth.js`:
```javascript
const dummyEmail = "your@email.here";
const dummyPass = "yourpassword";
```

### Customizing Colors
Edit CSS variables in `assets/css/dashboard.css` or `login.css`:
```css
:root {
    --primary: #000000;
    --accent: #763ff7;
    /* ... modify as needed ... */
}
```

---

## 🚧 Roadmap / Coming Soon

- [x] **Complete Logs Screen**: Full transaction history with filters ✅ (Alpha 1.1)
- [x] **Data Validation Improvements**: Email validation, quantity tracking, structured names ✅ (Alpha 1.2)
- [ ] **Settings Screen**: Theme customization, user preferences
- [ ] **Backend Integration**: Connect to database (MySQL/PostgreSQL)
- [ ] **Real Authentication**: JWT tokens, session management
- [ ] **Email Notifications**: Overdue reminders, reservation alerts
- [ ] **Reporting System**: Generate PDF reports
- [ ] **Barcode Scanning**: QR/Barcode integration for books
- [ ] **Android Application for Borrowers**: Borrower account management, and easier transaction and reporting books
- [ ] **Multi-user Roles**: Librarian, Admin, Read-only access
- [ ] **Advanced Search**: Filters by genre, publication year, etc.
- [ ] **Reservation System**: Allow students to reserve books

---

## 📋 Update Logs
### Version: Alpha 1.3 - The Readable Hotfix (March 25, 2026)
**Improvements:**
- Reading friendly font size

**Technical Updates:**
- Changed font family from Courier New to Plus Jakarta Sans
---

### Version: Alpha 1.2 - The Core Hotfix (February 20, 2026)
**New Features:**
- **Quantity Field on Book Addition**: Added quantity input field when adding new books to specify initial inventory count
- **Enhanced Email Validation**: Borrower email addresses must now follow the format `localpart@btech.ph.education` to ensure institutional email usage
- **Structured Name Fields**: Borrower names are now separated into three distinct fields:
  - Last Name
  - First Name
  - Middle Initial (optional)
  This provides better data organization and standardization
- **Duplicate Book Detection**: System now displays a popup notification when attempting to add a book with the same title but different ISBN, helping prevent accidental duplicates while allowing legitimate variations

**Improvements:**
- Better data validation for borrower registration
- Logs now show the quantity of the recently added book 
- Enhanced data integrity with structured name fields
- User-friendly alerts for potential data inconsistencies

**Technical Updates:**
- Added quantity field validation in book creation modal
- Implemented email domain validation for @btech.ph.education
- Split name input into separate Last Name, First Name, and Middle Initial fields
- Added duplicate title detection logic with ISBN comparison

---

### Version: Alpha 1.1 - The Core Add-Ons (February 14, 2026)
**New Features:**
- **System Activity Logs**: Complete logging system for all operations
  - Login tracking with timestamps
  - Book management operations (add, delete, update status)
  - Borrower management operations (add, delete)
  - Transaction logging (borrow, return with overdue tracking)
  - Book damage/loss reporting
  - Notification tracking
- **Color-Coded Log Actions**: Visual distinction for different action types
  - 🟢 Green badges: LOGIN, RETURN
  - 🟠 Orange badges: ADD_BOOK, ADD_BORROWER, BORROW
  - 🔴 Red badges: DELETE_BOOK, DELETE_BORROWER, REPORT_BOOK
  - 🔵 Blue badges: UPDATE_BOOK_STATUS, NOTIFY_BORROWERS
- **Real-time Log Updates**: All actions are automatically logged with timestamp and details
- **Comprehensive Activity Tracking**: Detailed records of database operations and user actions
- **Reorganized Log Display**: ACTION | DETAILS | TIMESTAMP column order for better readability

**Improvements:**
- Enhanced user interface with color-coded action badges
- Automatic timestamp generation for all logged activities
- Detailed log entries with action type and relevant information
- Improved log visibility and categorization

**Technical Updates:**
- Added `addLog()` function for automatic logging
- Added `renderLogs()` function with color-coded badges
- Integrated logging into all major functions
- Updated logs screen UI with proper table layout

---

### Version: Alpha 1.0 - The Core (February 6, 2026)
**Initial Release:**
- Dashboard with real-time statistics
- Book inventory management
- Borrower management system
- Instant borrow and return functionality
- Book damage reporting
- Violation tracking
- Glass morphism UI design
- Dark theme interface

### Note: I forgot to add the update logs on Alpha 1.0 so that's why it is just a quick bullet summary.
---


## 📄 License

This project is licensed under the PROPRIETARY SOFTWARE LICENSE AGREEMENT - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👨‍💻 Developer

**Developer VIEN**

- Fullname: Vien Fritzgerald V. Calderon
- Course & Section: Bachelor of Science in Information Technology - 1I
- Institution: Dalubhasaang Politekniko ng Lungsod ng Baliwag
- Project: School Library Inventory Management System
- Year: 2026

---

## 📞 Support

For questions, issues, or suggestions, please:
- Contact the institution's IT department
- Email: viencalderon15@gmail.com

---

## 🙏 Acknowledgments

- Dalubhasaang Politekniko ng Lungsod ng Baliwag
- Groupmates and also Testers
   - BUNGAY, ADRIAN A.   
   - ECONAR III, DON EMERICO D. 
   - LOPEZ, MARVIN D.G. 
   - PACHECO, KENDALL D. 
   - SARSABA, MATT JERMAINE D.V. 
   - SOURHOU, MAHDI M. 


---


## ©️ Copyright Credits
- **Background Image**: [The Uncensored Library](https://www.uncensoredlibrary.com/en)


---

**Made with ❤️ for educational purposes**

*"The only thing that you absolutely have to know is the location of the library."* — Albert Einstein
