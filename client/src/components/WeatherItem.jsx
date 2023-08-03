import React from 'react';
import moment from 'moment';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WeatherItem({ date, icon, temp, wind, humidity }) {
  return (
    <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
        <CardHeader>
        <Heading size='md' color='primary.txt'>
            {moment(date*1000).format('ddd, D MMM')}
        </Heading>
        </CardHeader>
        <CardBody color='primary.txt'>
            <Container align='center' pb={5}>
            <Icon boxSize='30px'>
            <FontAwesomeIcon icon={icon} />
            </Icon>
            </Container>
            <Container fontSize='lg'>
            <Text>
                Temp: {temp} °F
            </Text>
            <Text>
                Wind: {wind} mph
            </Text>
            <Text>
                Humidity: {humidity} %
            </Text>
            </Container>
        </CardBody>
    </Card>
  );
};

export default WeatherItem;
