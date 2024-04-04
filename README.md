# TC-Weather App

Welcome to the TC-Weather App, a React project written in TypeScript. This application allows users to search for any location using the Google Places API, providing information such as the location name, an image, and the current weather state information using the OpenWeather API.

## Getting Started

Follow the instructions below to get the TC-Weather App up and running on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Akram11/TC-WeatherApp

   ```

2. Navigate to the project directory:

   ```bash
   cd TC-Weather-App

   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Setting up API Keys

1. Create a .env file in the root directory of the project.

2. Add your API keys for the Google Places API and OpenWeather API to the .env file:

REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key

Replace your_google_maps_api_key and your_openweather_api_key with your actual API keys.

### Running the App

1. Start the application:

```bash
 npm start
```

2. Open your browser and go to http://localhost:3001 to view the TC-Weather App.

### Usage:

1. Use the search bar to look up a location using the Google Places API.
2. The app will display information about the location, including its name and an image.
3. Additionally, the current weather state information for the location will be retrieved from the OpenWeather API.

Feel free to explore and enjoy using the TC-Weather App!
