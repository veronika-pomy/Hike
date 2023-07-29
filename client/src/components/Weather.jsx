import React from 'react';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  return (
    <div className='weather-container'>
      <div className='weather-content-wrapper'>
        <p className='weather-title'>Weather Forecast</p>
        <div className='weather-items-wrapper'>
          <Card className='weather-item-today' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
              <CardHeader>
                <Heading size='md' color='primary.txt'>
                  Today
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
