#  Dynamic Themed Calendar App

A modern and interactive calendar application built with **React** and **Tailwind CSS**, featuring **dynamic theme switching**, date range selection, and holiday-aware interactions.

---

##  Features

###  Dynamic Theme Switching
- Select from multiple background images  
- UI theme (colors & gradients) updates automatically  
- Hero banner and calendar stay visually synchronized  
- Smooth transitions for a polished experience  

---

###  Calendar Functionality
- Monthly calendar view with navigation  
- Select single date or date range  
- Visual highlighting of selected range  
- Persistent state using **localStorage**  

---

###  Holiday Support
- Displays holidays with indicators  
- Tooltip on hover showing holiday name  
- Click on holiday → modal popup with details  
- Supports multiple years (2026, 2027)  

---

###  Animations & UX
- Hover and click animations on date cells  
- Smooth scaling and shadow effects  
- Subtle pulse animation for holidays  
- Clean and responsive layout  

---

###  Notes System
- Add notes for selected dates  
- Automatically updates based on selected range  
- Organized side panel view  

---

##  Tech Stack

- **Frontend:** React.js  
- **Styling:** Tailwind CSS  
- **Date Handling:** date-fns  
- **Color Extraction:** colorthief  

---

##  Project Structure

```bash
CALENDAR-APP/
│
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarGrid.jsx
│   │   │   ├── DayCell.jsx
│   │   │   ├── HolidayModal.jsx
│   │   │
│   │   ├── Notes/
│   │   │   └── NotesPanel.jsx
│   │
│   ├── hooks/
│   │   └── useImageTheme.js
│   │
│   ├── utils/
│   │   └── isHoliday.js
│   │
│   ├── data/
│   │   └── holidays.js
│   │
│   └── layout/
│       └── CalendarLayout.jsx

```
# Installation

git clone https://github.com/your-username/Calender-Poject.git
cd CALENDAR-APP
npm install
npm start

---
## Usage
Click on a thumbnail image to change theme
Navigate between months using arrows
Click on a date to select range
Click on a holiday to view details
Add and manage notes

## Key Concepts
State lifting
Custom hooks (useImageTheme)
Dynamic UI updates
Component-based architecture
Local storage persistence

## Future Improvements
API-based holiday fetching
Drag-to-select date ranges
Dark/light mode toggle
Framer Motion animations

## Live Demo
[View Live Project](https://calendar-project1.vercel.app)
```


