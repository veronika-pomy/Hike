import React, { useState, useEffect } from 'react';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

import { fetchWeather } from '../utils//weatherAPI';

async function getWeatherData () {
  try {
    const resultWeather = await fetchWeather();
    console.log(resultWeather);
  } catch (err) {
    console.log(err);
  }
};

getWeatherData();

function Weather() {

  // date and time data
    // TODO: fix bug with displaying weekday for Sunday
  const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];

  let time;
  let hour;
  let minutes;

  const [ timeData, setTimeData ] = useState({
    month: '',
    date: '',
    day: '',
    hour: '',
    minutes: '',
    hour12: '',
    ampm: '',
    min: '',
  });

  useEffect(() => {
    setInterval(() => {

      time = new Date();
      hour =  time.getHours();

      setTimeData({
        month: time.getMonth(),
        date: time.getDate(),
        day: time.getDay(),
        hour: time.getHours(),
        minutes: time.getMinutes(),
        hour12: hour >= 13 ? hour%12: hour,
        ampm: hour >= 12 ? 'pm' : 'am',
        min: minutes < 10? '0' : '' + minutes,
      });
    }, 1000);
  }, []);

  // change weather based on users choice 

  return (
    <div className='weather-container'>
      <div className='weather-content-wrapper'>
        <p className='weather-title'>Weather Forecast</p>
        <div className='weather-items-wrapper'>
          <Card className='weather-item-today' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
              <CardHeader>
                <Heading size='md' color='primary.txt'>
                  {weekDays[timeData.day] + ', ' + timeData.date + ' ' + months[timeData.month]}
                </Heading>
              </CardHeader>
                <CardBody color='primary.txt'>
                  <Container align='center'pb={5} >
                  <Text color='primary.txt' pb={5} fontSize='md'>
                    {timeData.hour12 + ':' + timeData.minutes + ' ' +timeData.ampm}
                  </Text>
                  <Icon boxSize='30px' >
                    <FontAwesomeIcon icon={faSun} />
                  </Icon>
                  </Container>
                  <Container fontSize='lg'>
                    <Text>
                      Temp
                    </Text>
                    <Text>
                      Wind
                    </Text>
                    <Text>
                      Humidity
                    </Text>
                  </Container>
              </CardBody>
          </Card>
          <div className='weather-items'>
            <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                  <Heading size='md' color='primary.txt'>
                    Weekday, Date
                  </Heading>
                </CardHeader>
                  <CardBody color='primary.txt'>
                    <Container align='center' pb={5}>
                    <Icon boxSize='30px'>
                      <FontAwesomeIcon icon={faSun} />
                    </Icon>
                    </Container>
                    <Container fontSize='lg'>
                      <Text>
                        Temp
                      </Text>
                      <Text>
                        Wind
                      </Text>
                      <Text>
                        Humidity
                      </Text>
                    </Container>
                </CardBody>
            </Card>
            <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                  <Heading size='md' color='primary.txt'>
                    Weekday, Date
                  </Heading>
                </CardHeader>
                  <CardBody color='primary.txt'>
                    <Container align='center' pb={5}>
                    <Icon boxSize='30px'>
                      <FontAwesomeIcon icon={faSun} />
                    </Icon>
                    </Container>
                    <Container fontSize='lg'>
                      <Text>
                        Temp
                      </Text>
                      <Text>
                        Wind
                      </Text>
                      <Text>
                        Humidity
                      </Text>
                    </Container>
                </CardBody>
            </Card>
            <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                  <Heading size='md' color='primary.txt'>
                    Weekday, Date
                  </Heading>
                </CardHeader>
                  <CardBody color='primary.txt'>
                    <Container align='center' pb={5}>
                    <Icon boxSize='30px'>
                      <FontAwesomeIcon icon={faSun} />
                    </Icon>
                    </Container>
                    <Container fontSize='lg'>
                      <Text>
                        Temp
                      </Text>
                      <Text>
                        Wind
                      </Text>
                      <Text>
                        Humidity
                      </Text>
                    </Container>
                </CardBody>
            </Card>
            <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                  <Heading size='md' color='primary.txt'>
                    Weekday, Date
                  </Heading>
                </CardHeader>
                  <CardBody color='primary.txt'>
                    <Container align='center' pb={5}>
                    <Icon boxSize='30px'>
                      <FontAwesomeIcon icon={faSun} />
                    </Icon>
                    </Container>
                    <Container fontSize='lg'>
                      <Text>
                        Temp
                      </Text>
                      <Text>
                        Wind
                      </Text>
                      <Text>
                        Humidity
                      </Text>
                    </Container>
                </CardBody>
            </Card>
            <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                  <Heading size='md' color='primary.txt'>
                    Weekday, Date
                  </Heading>
                </CardHeader>
                  <CardBody color='primary.txt'>
                    <Container align='center' pb={5}>
                    <Icon boxSize='30px'>
                      <FontAwesomeIcon icon={faSun} />
                    </Icon>
                    </Container>
                    <Container fontSize='lg'>
                      <Text>
                        Temp
                      </Text>
                      <Text>
                        Wind
                      </Text>
                      <Text>
                        Humidity
                      </Text>
                    </Container>
                </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;
