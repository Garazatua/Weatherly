import './styles.css';
const weatherIconContainer = document.querySelector('#weather-icon-container');
const errorMessage = document.querySelector('.error-message');
const cityName = document.querySelector('#city');
const weatherTime = document.querySelector('.weather-time');
const weatherTemp = document.querySelector('.weather-temp');
const weatherCondition = document.querySelector('.weather-condition');
const feelslikeDisplay = document.querySelector('#feelslike');
const windspeedDisplay = document.querySelector('#windspeed');
const humidityDisplay = document.querySelector('#humidity');
const cloudcoverDisplay = document.querySelector('#cloud-cover');
const hero = document.querySelector('#hero');

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=4N9A823J7548KZTAJBG65V3ZT&contentType=json`
    );
    if (!response.ok) {
      if (response.status === 400) {
        errorMessage.textContent =
          "City not Found. Please enter a valid city with this format 'City, Country'";
        return null;
      }
    }
    const weather = await response.json();
    console.log(weather);
    const attributes = {
      city: weather.resolvedAddress,
      temp: weather.currentConditions.temp,
      feelslike: weather.currentConditions.feelslike,
      windspeed: weather.currentConditions.windspeed,
      humidity: weather.currentConditions.humidity,
      cloudcover: weather.currentConditions.cloudcover,
      datetime: weather.currentConditions.datetime,
      icon: weather.currentConditions.icon,
      conditions: weather.currentConditions.conditions,
    };
    console.log(attributes);
    return attributes;
  } catch (error) {
    console.error('Failed to fetch weather data:', error.message);
  }
}

async function updateWeatherCard(city) {
  const attributes = await getWeather(city);
  if (!attributes) return;
  let backgroundClass = getBackgroundClass(attributes.icon);
  hero.className = '';
  hero.classList.add('hero', backgroundClass);
  weatherIconContainer.innerHTML = iconSVGs[attributes.icon];
  cityName.textContent = attributes.city;
  const fullTime = attributes.datetime;
  const shortTime = fullTime.slice(0, 5);
  weatherTime.textContent = shortTime;
  weatherTemp.innerHTML = `${attributes.temp}°<span class="unit">C</span>`;
  weatherCondition.textContent = attributes.conditions;
  feelslikeDisplay.textContent = `${attributes.feelslike}°`;
  windspeedDisplay.textContent = `${attributes.windspeed} km/h`;
  humidityDisplay.textContent = `${attributes.humidity}%`;
  cloudcoverDisplay.textContent = `${attributes.cloudcover}%`;
}

function getBackgroundClass(icon) {
  if (icon.includes('clear-day')) return 'sunny';
  if (icon.includes('clear-night')) return 'clear-night';
  if (icon.includes('cloudy')) return 'cloudy';
  if (icon.includes('rain')) return 'rainy';
  if (icon.includes('snow')) return 'snowy';
  if (icon.includes('fog') || icon.includes('wind')) return 'foggy';

  return 'cloudy';
}

const iconSVGs = {
  'clear-day': `<svg class="weather-icon" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M17.66 17.66l1.41 1.41M4.93 4.93l1.41 1.41" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#000000" fill-opacity=".16" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10"/></svg>`,
  'clear-night': `<svg class="weather-icon" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19.524 14.721h.008c.644 0 1.275-.059 1.886-.172l-.063.01c-1.146 4.122-4.866 7.098-9.281 7.098-.019 0-.039 0-.058 0h.003c-5.343-.006-9.673-4.336-9.678-9.679v-.001c.026-4.418 2.986-8.138 7.029-9.312l.069-.017c-.103.547-.162 1.176-.162 1.819v.007c.005 5.658 4.59 10.243 10.247 10.248h.001zm-7.518-14.251c-.214-.286-.552-.47-.933-.47-.037 0-.074.002-.11.005h.005c-6.155.591-10.934 5.719-10.968 11.971v.003c.008 6.635 5.385 12.012 12.019 12.021h.001.06c6.243 0 11.367-4.786 11.905-10.889l.003-.045c.003-.031.005-.068.005-.104 0-.365-.167-.691-.428-.905l-.002-.002c-.2-.164-.458-.264-.74-.264-.12 0-.235.018-.344.051l.008-.002-.524.156c-.727.244-1.565.385-2.435.385-.002 0-.005 0-.007 0-4.363-.005-7.898-3.54-7.903-7.903 0-.005 0-.012 0-.018 0-1.03.198-2.014.558-2.915l-.019.053c.051-.127.081-.274.081-.428 0-.265-.088-.51-.236-.706l.002.003z"/></svg>`,
  cloudy: `<svg class="weather-icon" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M17.894 6.945c3.969 0 7.197 3.228 7.197 7.197 0 0.022-0.003 0.045-0.004 0.067-0.003 0.053-0.007 0.106-0.008 0.16l-0.027 1.088 1.090 0.004c2.637 0.007 4.783 2.16 4.783 4.797 0 2.63-2.141 4.782-4.773 4.796l-0.233 0.001h-19.517c-2.937-0.003-5.327-2.394-5.327-5.33 0-2.275 1.448-4.3 3.603-5.040l0.6-0.205 0.106-0.625c0.261-1.542 1.586-2.661 3.149-2.661 0.498 0 0.98 0.116 1.431 0.343l0.972 0.488 0.469-0.981c1.192-2.491 3.739-4.1 6.488-4.1zM17.894 5.878c-3.288 0-6.12 1.925-7.45 4.705-0.575-0.29-1.223-0.456-1.911-0.456-2.111 0-3.859 1.536-4.2 3.55-2.514 0.862-4.324 3.24-4.324 6.048 0 3.531 2.862 6.393 6.392 6.396l19.756-0.001c3.225-0.017 5.834-2.634 5.834-5.862 0-3.233-2.615-5.854-5.846-5.863 0.002-0.085 0.012-0.168 0.012-0.253 0-4.564-3.7-8.263-8.263-8.263v0z" fill="white"></path></svg>`,
  'partly-cloudy-day': `<svg fill="white" class="weather-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 488 488" style="enable-background:new 0 0 488 488;" xml:space="preserve">
<g transform="translate(0 -540.36)">
	<g>
		<g>
			<path d="M336,658.96c5.5,0,10-4.5,10-10v-30.3c0-5.5-4.5-10-10-10s-10,4.5-10,10v30.3C326,654.46,330.5,658.96,336,658.96z"/>
			<path d="M417.7,690.06c2.6,0,5.2-1,7.1-3l19.9-20.2c3.9-3.9,3.8-10.2-0.1-14.1c-3.9-3.9-10.2-3.8-14.1,0.1l-19.9,20.2
				c-3.9,3.9-3.8,10.2,0.1,14.1C412.6,689.06,415.2,690.06,417.7,690.06z"/>
			<path d="M424.7,839.66c-3.8-3.9-10.2-4-14.1-0.1c-3.9,3.8-4,10.2-0.1,14.1l19.9,20.2c1.9,2,4.5,3,7.1,3c2.6,0,5.1-1,7-2.9
				c3.9-3.8,4-10.2,0.1-14.1L424.7,839.66z"/>
			<path d="M478,743.26h-29.8c-5.5,0-10,4.5-10,10s4.5,10,10,10H478c5.5,0,10-4.5,10-10S483.5,743.26,478,743.26z"/>
			<path d="M247.2,687.06c1.9,2,4.5,3,7.1,3c2.5,0,5.1-0.9,7-2.9c3.9-3.8,4-10.2,0.1-14.1l-19.8-20.2c-3.8-3.9-10.2-4-14.1-0.1
				c-3.9,3.8-4,10.2-0.1,14.1L247.2,687.06z"/>
			<path d="M360.5,683.76L360.5,683.76l-0.1,0c-34.7-10.7-72.1,5.3-90.6,37.4c-14.2-5.8-29.7-9.1-46-9.1c-23.7,0-46.6,6.9-66.4,20
				c-17.2,11.4-31.2,26.9-41,45.3c-9.2-2.5-18.1-3.1-24.7-3.1c-24.5,0-47.5,9.6-64.8,27C9.6,818.66,0,841.96,0,866.76
				c0,51.4,41.1,93.3,91.7,93.3h132.1c64.2,0,117-50.6,121.9-114.8c16.5-1.6,32.1-8.5,44.5-20c14.2-13,23.4-31,26-50.6
				C422.1,734.46,398.7,696.16,360.5,683.76z M223.8,940.06L223.8,940.06l-132.1,0c-39.5,0-71.7-32.9-71.7-73.3
				c0-40,32.2-72.5,71.7-72.5c9.6,0,18.8,1.7,25.9,4.7c5,2.1,10.8-0.2,13-5.1c16.7-37.5,53.2-61.8,93.2-61.8
				c56.4,0,102.2,46.5,102.2,103.6C326,893.26,280.1,940.06,223.8,940.06z M396.3,771.96c0,0.1,0,0.1,0,0.2
				c-3.6,27.9-24.8,49.6-50.8,53c-3.4-40.1-25.7-74.9-58-94.9c14-23.5,41.5-35.2,66.8-27.5C383.3,712.26,400.9,741.36,396.3,771.96z
				"/>
		</g>
	</g>
</g>
</svg>`,
  'partly-cloudy-night': `<svg class="weather-icon" fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 449.934 449.934" style="enable-background:new 0 0 449.934 449.934;" xml:space="preserve">
<g>
	<g>
		<path d="M447.9,191.462c-2.3-3.1-6.2-4.6-10-3.9c-2.9,0.6-6.3,0.6-9.8,0.6c-40.9,0-74.1-34-74.1-75.7c0-13.2,3.3-25.9,9.8-37.6
			c1.8-3.3,1.6-7.4-0.6-10.6c-2.2-3.1-6-4.7-9.7-4.2c-22.5,3.5-43.1,14.9-57.9,32.3c-12.2,14.4-19.9,32-22.2,50.7
			c-13.5-5.1-28.2-7.8-43.4-7.8c-24.3,0-47.9,7.1-68.2,20.6c-17.7,11.7-32.2,27.8-42.2,46.8c-9.5-2.6-18.8-3.3-25.5-3.3
			c-25.2,0-48.8,9.8-66.5,27.7c-17.8,17.9-27.6,41.8-27.6,67.2c0,52.8,42.2,95.7,94.1,95.7h136c69.2,0,125.6-57.3,125.6-127.8
			c0-4-0.2-7.9-0.5-11.7c3.8,0.5,7.7,0.9,11.8,0.9c34.4,0,65-18.4,81.9-49.2C450.5,198.862,450.3,194.662,447.9,191.462z
			 M230,370.062H94c-40.9,0-74.1-34-74.1-75.7c0-41.3,33.2-74.9,74.1-74.9c9.9,0,19.4,1.7,26.8,4.8c5,2.1,10.8-0.2,13-5.1
			c17.2-38.7,55-63.8,96.2-63.8c58.2,0,105.6,48,105.6,107C335.6,321.762,288.2,370.062,230,370.062z M366.8,231.462L366.8,231.462
			c-5.1,0-10.5-0.8-15.4-1.8c-8.7-32.9-30.1-60.6-58.6-77.3c1-30,18.9-55.6,45.1-67c-2.6,8.8-3.9,17.9-3.9,27.2
			c0,50.1,38,91.3,86.2,95.4C406.5,222.862,387.5,231.462,366.8,231.462z"/>
	</g>
</g>
</svg>`,
  rain: `<svg class="weather-icon" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.316 21H5.212l.935-2h1.105zm2.065 2l1.871-4H9.147l-1.87 4zm3.468-1l1.403-3h-1.105l-1.403 3zm3.298-3l-2.339 5h1.105l2.339-5zm3 0l-.935 2h1.104l.936-2zm-11.28-1h-1.43a3.438 3.438 0 0 1 0-6.875l.012.001A3.369 3.369 0 0 1 9.4 9.24a5.494 5.494 0 0 1 10.548-.521A4.807 4.807 0 0 1 18.187 18zM3 14.562A2.44 2.44 0 0 0 5.438 17h12.75a3.807 3.807 0 0 0 1.394-7.351l-.429-.17-.15-.436a4.494 4.494 0 0 0-8.629.426l-.232.99-.986-.25a2.407 2.407 0 0 0-.594-.084 2.443 2.443 0 0 0-2.206 1.42l-.268.581h-.715A2.442 2.442 0 0 0 3 14.563z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`,
  snow: `<svg class="weather-icon" fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 489 489" style="enable-background:new 0 0 489 489;" xml:space="preserve">
<g transform="translate(0 -540.36)">
	<g>
		<g>
			<path d="M461.95,628.16c-17.2-17.1-40.1-26.6-64.5-26.6c-9.2,0-17.6,1.1-25.1,3.2c-21.1-39.4-62.3-64.4-107.6-64.4
				c-50.3,0-94.8,30.1-113.2,75.7c-9.6-2.4-19.7-3.7-29.9-3.7c-67,0-121.5,55-121.5,122.5c0,67.1,54.5,121.7,121.5,121.7h132.7
				c43.7,0,80.3-30.8,89.3-71.9h53.8c50.4,0,91.4-41.1,91.4-91.5C488.75,668.46,479.25,645.36,461.95,628.16z M254.25,836.66h-132.6
				c-56,0-101.5-45.6-101.5-101.7c0-56.5,45.5-102.5,101.5-102.5c40.5,0,77.2,23.9,93.4,60.9c1.1,2.4,3.1,4.4,5.6,5.3
				c2.5,1,5.3,0.9,7.7-0.2c6.9-3.1,15.9-4.8,26-4.8c39.4,0,71.4,32.1,71.4,71.5C325.65,804.56,293.65,836.66,254.25,836.66z
				 M397.35,764.66L397.35,764.66l-51.7,0c-0.2-50.3-41.1-91.1-91.4-91.1c-9.2,0-17.6,1.1-25.1,3.2c-13.1-24.5-34-43.4-58.8-54.2
				c15.7-37.5,52.6-62.1,94.3-62.1c40.5,0,77.2,23.9,93.4,60.9c1.1,2.4,3.1,4.4,5.6,5.3c2.5,1,5.3,0.9,7.7-0.2
				c6.9-3.1,15.9-4.8,26-4.8c39.4,0,71.4,32.1,71.4,71.5S436.75,764.66,397.35,764.66z"/>
			<path d="M120.05,964.56c-2.5-4.9-8.5-6.9-13.4-4.5l-15.6,7.8v-19.3c0-5.5-4.5-10-10-10s-10,4.5-10,10v19.3l-15.8-7.9
				c-4.9-2.5-10.9-0.5-13.4,4.5c-2.5,4.9-0.5,10.9,4.5,13.4l12.3,6.1l-12.3,6.1c-4.9,2.5-6.9,8.5-4.5,13.4c1.8,3.5,5.3,5.5,8.9,5.5
				c1.5,0,3-0.3,4.5-1.1l15.6-7.8v19.3c0,5.5,4.5,10,10,10s10-4.5,10-10v-19.3l15.6,7.8c1.4,0.7,3,1.1,4.5,1.1c3.7,0,7.2-2,8.9-5.5
				c2.6-4.8,0.6-10.9-4.3-13.3l-12.3-6.1l12.3-6.1C120.45,975.46,122.45,969.46,120.05,964.56z"/>
			<path d="M232.25,923.76c-2.4-5-8.4-7-13.4-4.5l-16.1,8v-19.4c0-5.5-4.5-10-10-10s-10,4.5-10,10v19.4l-16.1-8
				c-5-2.4-10.9-0.4-13.4,4.5c-2.4,5-0.4,10.9,4.5,13.4l12.4,6.1l-12.4,6.1c-5,2.4-7,8.4-4.5,13.4c1.7,3.5,5.3,5.6,9,5.6
				c1.5,0,3-0.3,4.4-1l16.1-8v19.4c0,5.5,4.5,10,10,10s10-4.5,10-10v-19.4l16.1,8c1.4,0.7,2.9,1,4.4,1c3.7,0,7.2-2,9-5.6
				c2.5-5,0.5-11-4.5-13.4l-12.4-6.1l12.4-6.1C232.75,934.76,234.75,928.76,232.25,923.76z"/>
			<path d="M343.85,964.56c-2.5-4.9-8.5-6.9-13.4-4.5l-15.6,7.8v-19.3c0-5.5-4.5-10-10-10s-10,4.5-10,10v19.3l-15.6-7.8
				c-4.9-2.5-10.9-0.5-13.4,4.5c-2.5,4.9-0.5,10.9,4.5,13.4l12.1,6l-12.3,6.1c-4.9,2.5-6.9,8.5-4.5,13.4c1.8,3.5,5.3,5.5,8.9,5.5
				c1.5,0,3-0.3,4.5-1.1l15.6-7.8v19.3c0,5.5,4.5,10,10,10s10-4.5,10-10v-19.3l15.6,7.8c1.4,0.7,3,1.1,4.5,1.1c3.7,0,7.2-2,8.9-5.5
				c2.6-4.8,0.6-10.9-4.3-13.3v0l-12.3-6.1l12.3-6.1C344.25,975.46,346.25,969.46,343.85,964.56z"/>
			<path d="M456.15,923.76c-2.4-5-8.4-7-13.4-4.5l-16.1,8v-19.4c0-5.5-4.5-10-10-10s-10,4.5-10,10v19.4l-16.1-8
				c-5-2.4-10.9-0.4-13.4,4.5s-0.4,10.9,4.5,13.4l12.4,6.1l-12.4,6.1c-5,2.4-7,8.4-4.5,13.4c1.7,3.5,5.3,5.6,9,5.6
				c1.5,0,3-0.3,4.4-1l16.1-8v19.4c0,5.5,4.5,10,10,10s10-4.5,10-10v-19.4l16.1,8c1.4,0.7,2.9,1,4.4,1c3.7,0,7.2-2,9-5.6
				c2.4-5,0.4-11-4.5-13.4l-12.4-6.1l12.4-6.1C456.65,934.76,458.65,928.76,456.15,923.76z"/>
		</g>
	</g>
</g>
</svg>`,
  fog: `<svg class="weather-icon" fill="white"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.95 8.719A5.494 5.494 0 0 0 9.4 9.24a3.369 3.369 0 0 0-3.951 1.886l-.011-.001a3.438 3.438 0 0 0 0 6.875h12.75a4.807 4.807 0 0 0 1.761-9.281zM18.187 17H5.438a2.438 2.438 0 0 1-.066-4.874h.716l.268-.58a2.443 2.443 0 0 1 2.207-1.421 2.41 2.41 0 0 1 .593.085l.986.248.232-.99a4.494 4.494 0 0 1 8.63-.425l.149.436.43.17A3.807 3.807 0 0 1 18.187 17zM7 15h7v1H7zm4 5h10v1H11zm-9 2h6v1H2zm8 0h3v1h-3zm5-7h2v1h-2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`,
  wind: `<svg fill="white" class="weather-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<path d="M437.313,189.201c-7.88-83.684-78.535-149.379-164.246-149.379S116.702,105.518,108.82,189.201
			c-42.422,7.72-74.687,44.94-74.687,89.555h34.133c0-31.369,25.52-56.889,56.889-56.889h17.067V204.8
			c0-72.148,58.697-130.844,130.844-130.844S403.911,132.652,403.911,204.8v17.067h17.067c31.369,0,56.889,25.52,56.889,56.889
			s-25.52,56.889-56.889,56.889h-85.333v34.133h85.333c50.19,0,91.022-40.833,91.022-91.022
			C512,234.141,479.735,196.921,437.313,189.201z"/>
	</g>
</g>
<g>
	<g>
		<path d="M204.8,347.022H0v34.133h204.8c15.684,0,28.444,12.76,28.444,28.444c0,15.684-12.76,28.444-28.444,28.444
			s-28.444-12.76-28.444-28.444h-34.133c0,34.505,28.072,62.578,62.578,62.578s62.578-28.072,62.578-62.578
			C267.378,375.095,239.305,347.022,204.8,347.022z"/>
	</g>
</g>
<g>
	<g>
		<path d="M273.067,210.489c-34.505,0-62.578,28.072-62.578,62.578h34.133c0-15.684,12.76-28.444,28.444-28.444
			s28.444,12.76,28.444,28.444s-12.76,28.444-28.444,28.444H0v34.133h273.067c34.505,0,62.578-28.072,62.578-62.578
			C335.644,238.561,307.572,210.489,273.067,210.489z"/>
	</g>
</g>
</svg>`,
};

window.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input');

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      errorMessage.textContent = '';
      const value = input.value.trim();
      const parts = value.split(',').map((part) => part.trim());
      if (parts.length !== 2 || parts[0] === '' || parts[1] === '') {
        errorMessage.textContent =
          'Invalid format. Please enter the city AND country code, e.g "Lima, PE" or "Tokyo, JP"';
        return;
      }
      const city = `${parts[0]},${parts[1]}`;
      updateWeatherCard(city);
    }
  });
});
