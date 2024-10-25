export const backgroundSelector = (condition) => {
  switch (condition) {
    case 'Clear':
      return 'https://source.unsplash.com/featured/?clear-sky';
    case 'Clouds':
      return 'https://source.unsplash.com/featured/?cloudy';
    case 'Rain':
      return 'https://source.unsplash.com/featured/?rain';
    case 'Snow':
      return 'https://source.unsplash.com/featured/?snow';
    case 'Thunderstorm':
      return 'https://source.unsplash.com/featured/?thunderstorm';
    default:
      return 'https://source.unsplash.com/featured/?weather';
  }
};

/*
// utils/backgroundSelector.js
export const backgroundSelector = (condition) => {
  switch (condition) {
    case 'Clear':
      return 'https://source.unsplash.com/featured/?clear-sky'; // Example image for clear weather
    case 'Clouds':
      return 'https://source.unsplash.com/featured/?cloudy'; // Example image for cloudy weather
    case 'Rain':
      return 'https://source.unsplash.com/featured/?rain'; // Example image for rainy weather
    case 'Snow':
      return 'https://source.unsplash.com/featured/?snow'; // Example image for snowy weather
    case 'Thunderstorm':
      return 'https://source.unsplash.com/featured/?thunderstorm'; // Example image for thunderstorms
    default:
      return 'https://source.unsplash.com/featured/?weather'; // Default image if no conditions match
  }
};
*/
