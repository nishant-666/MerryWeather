import React from 'react';
import './Result.sass';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from 'semantic-ui-react'
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from '../responsive/Device';
import ForecastHour from './ForecastHour';
import ResultFadeIn from './ResultFadeIn';
import SmallLabel from './SmallLabel';
import MediumLabel from './MediumLabel'
import Text from './Text';
import './style.css'

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    pressure,
    forecast,
  } = weather;

  const forecasts = forecast.map(item => (
    <ForecastHour
      key={item.dt}
      highestTemp={Math.floor(item.main.temp_max * 1) / 1}
      humidity={item.main.humidity}
      lowestTemp={Math.floor(item.main.temp_min * 1) / 1}
      pressure={item.main.pressure}
      icon={item.weather[0].icon}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ));

  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <Results>
      <ForecastWrapper>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
      <CurrentWeatherWrapper>
      <Grid divided='vertically' id="content-mobile">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Temperature style={{fontFamily:'Itim'}}>{Math.floor(temp)}&#176;</Temperature>
          </Grid.Column>
          <Grid.Column>
            <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherIcon}</WeatherIcon>
          </Grid.Column>
        </Grid.Row>
      </Grid> 

      <Grid centered id="content-desktop">
          <Grid.Column style={{marginTop:-40}}>
            <Temperature style={{fontFamily:'Itim'}}>{Math.floor(temp)}&#176;<WeatherIcon style={{fontSize:50,marginTop:-90,position:'absolute',left:180}}>{weatherIcon}</WeatherIcon></Temperature>
            <MediumLabel style={{marginTop:-30,fontFamily:'Itim'}}>
              {city}, {country}
            </MediumLabel>
            <SmallLabel weight="400" style={{marginTop:-20,fontFamily:'Itim'}}>{date}</SmallLabel>
          </Grid.Column>
      </Grid>
      </CurrentWeatherWrapper>
      
      <LocationWrapper id="content-mobile">
        <MediumLabel style={{marginTop:-30,fontFamily:'Itim'}}>
          {city}, {country}
        </MediumLabel>
        <SmallLabel weight="400" style={{marginTop:-20,fontFamily:'Itim'}}>{date}</SmallLabel>
      </LocationWrapper>
      
      <WeatherDetailsWrapper id="content-desktop"> 
      <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Pressure</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {Math.floor(pressure)} hpa
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Humidity</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {humidity} %
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} style={{marginTop:-30}}>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Sunrise</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {sunrise}
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Sunset</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                  {sunset}
                </SmallLabel>
              </WeatherDetail>
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </WeatherDetailsWrapper>

      <WeatherDetailsWrapper id="content-mobile">
      <Grid centered>
          <Grid.Row columns={2}>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Pressure</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {Math.floor(pressure)} hpa
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Humidity</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {humidity} %
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2} style={{marginTop:-30}}>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Sunrise</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                {sunrise}
              </SmallLabel>
            </WeatherDetail>
            </Grid.Column>
            <Grid.Column>
            <WeatherDetail>
              <Text align="center" style={{fontSize:20}}><b style={{fontFamily:'Itim'}}>Sunset</b></Text>
              <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',marginTop:10}}>
                  {sunset}
                </SmallLabel>
              </WeatherDetail>
            </Grid.Column>
          </Grid.Row>
      </Grid>
      </WeatherDetailsWrapper>
      
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
