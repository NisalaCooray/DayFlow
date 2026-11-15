# DayFlow – Daily Task Management App

DayFlow is a simple and user-friendly daily task management application developed using React Native and Expo. It helps users organize their daily activities, manage tasks, track progress, and maintain productivity.

## Features

### 1. Home Screen
- View a summary of daily tasks.
- See completed and pending task counts.
- Track daily completion progress.

### 2. Add and Edit Tasks
- Create new tasks with a title and description.
- Select a category and priority.
- Set a date and time for each task.
- Edit existing tasks.
- Set tasks to repeat daily or weekly.

### 3. Works Screen
- View and manage tasks.
- Search tasks by title.
- Filter tasks by completion status.
- Filter tasks by category.
- Mark tasks as completed or undo completion.
- Delete unwanted tasks.
- View recurring task information.

### 4. Daily and Weekly Progress Reports
- View daily task statistics.
- Track weekly task completion.
- See completed and pending task counts.
- View a daily breakdown of weekly progress.

### 5. Settings Screen
- Manage reminder and alarm preferences.

## Screenshots

### Home Screen
![Home Screen](screenshots/home.png)

### Add Work Screen
![Add Work Screen](screenshots/add-work.png)

### Works Screen
![Works Screen](screenshots/works.png)

### Progress Report
![Progress Report](screenshots/report.png)

### Settings Screen
![Settings Screen](screenshots/settings.png)

## Technologies Used

- React Native
- Expo
- JavaScript
- AsyncStorage
- React Hooks
- DateTimePicker
- Visual Studio Code
- Git and GitHub

## Installation and Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/NisalaCooray/DayFlow.git
```

**2. Navigate to the project folder**

```bash
cd DayFlow
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the Expo development server**

```bash
npx expo start
```

Follow the Expo instructions to open the application on your preferred platform.

## Project Structure

```text
DayFlow/
│
├── screens/
│   ├── HomeScreen.js
│   ├── AddWorkScreen.js
│   ├── WorksScreen.js
│   ├── ReportScreen.js
│   └── SettingsScreen.js
│
├── ScreenShots/
│   ├── HomeScreen.png
│   ├── AddWorkScreen.png
│   ├── WorksScreen.png
│   ├── ReportScreen.png
│   ├── ReportScreen2.png
│   └── SettingsScreen.png
│
├── App.js
├── app.json
├── package.json
└── README.md
```

## Data Storage

DayFlow uses AsyncStorage to store task information and application settings locally on the device. This allows saved data to remain available when the application is restarted.

## Future Improvements

- Actual push notifications and reminders.
- Additional progress reports.
- More task organization options.

## Author

**Nisala Cooray**

Developed as an academic software development project.

---

© 2026 DayFlow. All Rights Reserved.
