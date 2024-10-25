# Real-Time Weather Dashboard

This is a **Real-Time Weather Dashboard** application developed as part of an assignment given by **Zeotap**. The app allows users to view current weather data, daily rollups, alerts, and a visual temperature chart for selected cities.

## Features

- **Weather Cards**: Displays current weather information in a user-friendly card format.
- **Daily Rollups**: Provides summarized weather data for the upcoming days.
- **Alerts**: Displays any relevant weather alerts for the selected city.
- **Temperature Chart**: Visual representation of temperature.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js (Express), Weather API (e.g., OpenWeatherMap)
- **Data Handling**: Axios for API calls
- **State Management**: React hooks

## Getting Started

To run the Real-Time Weather Dashboard application, you need to set up both the client and the server. Follow the instructions below for each.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A Weather API key (if using a service like OpenWeatherMap)
- mongodb

### Start mongodb

on Linux

```bash
sudo systemctl start mongodb.service
```

### Server Setup

1. **Navigate to the server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create an .env file**
Copy the .env.example to .env and replace `YOUR_API_KEY` with your actual Weather API key.

4. **Start the start:**
```bash
npm start
```

### Client Setup

1. **Navigate to the client directory:**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```
3. **Start the client:**
```bash
npm start
```

