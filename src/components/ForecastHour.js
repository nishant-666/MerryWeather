import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from './SmallLabel';
import Text from './Text';
import device from '../responsive/Device';
import { Grid } from 'semantic-ui-react'


const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastHour = props => {
  const { highestTemp, lowestTemp, month, day, hour, icon } = props;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <Text align="center" style={{marginBottom:5,fontFamily:'PT Sans',fontSize:18}}>
        {day}/{month}
      </Text>
      <Text align="center" style={{fontFamily:'PT Sans',fontSize:16}}>{hour}:00</Text>
      <WeatherIcon src={iconUrl} />
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column style={{color:'white'}}>
          <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',fontSize:15}}>
            Max
          </SmallLabel> 
          <SmallLabel align="center" weight="400" style={{marginTop:-20,fontFamily:'Itim'}} >
            {highestTemp}&#176;
          </SmallLabel>
          </Grid.Column>
          <Grid.Column style={{color:'white'}}>
          <SmallLabel align="center" weight="400" style={{fontFamily:'Itim',fontSize:15}}>
            Min
          </SmallLabel>
          <SmallLabel align="center" weight="400" style={{marginTop:-20,fontFamily:'Itim'}}>
            {lowestTemp}&#176;
          </SmallLabel>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  highestTemp: PropTypes.number.isRequired,
  lowestTemp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastHour;
