import React from 'react';
import moment from 'moment';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container, Flex } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WeatherItem({ date, icon, temp, wind, humidity }) {
  return (
    <Card 
        className='weather-item' 
        align='center' 
        size='sm' 
        bg='none' 
        border='1px' 
        borderColor='primary.txt' 
        borderRadius='md'
    >
        <CardHeader>
        <Heading size='sm' align='center' color='primary.txt'>
            <Text
                align='center'
            >
                {moment(date*1000).format('ddd')}
            </Text>
            <Text
                align='center'
            >
                {moment(date*1000).format('D MMM')}
            </Text>
        </Heading>
        </CardHeader>
        <CardBody 
            color='primary.txt' 
            className='weather-info-card'
        >
            <Container 
                align='center' 
                pb={5} 
                className='weather-icon'
            >
            <Icon boxSize='30px'>
            <FontAwesomeIcon icon={icon} />
            </Icon>
            </Container>
            <Container 
                fontSize='sm' 
                className='weather-info-box'
            >

                    <Text className='weather-text'>
                        Temp: 
                    </Text>
                    <Text className='weather-text'>
                        {temp} °F
                    </Text>
                <Text className='weather-text'>
                    Wind: {wind} mph
                </Text>
                <Text className='weather-text'>
                    Humidity: {humidity} %
                </Text>
            </Container>
        </CardBody>
    </Card>
  );
};

export default WeatherItem;