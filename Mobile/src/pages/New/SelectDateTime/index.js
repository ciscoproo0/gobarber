import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  const handleSelectHour = (time) => {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  };

  useEffect(() => {
    const loadAvailable = async () => {
      try {
        const { data } = await api.get(`providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          },
        });

        setHours(data);
      } catch (err) {
        Alert.alert(
          'Erro ao carregar lista',
          'Não foi possível carregar horários, contate o administrador do sistema.'
        );
      }
    };

    loadAvailable();
  }, [date, provider.id]);

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

SelectDateTime.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default SelectDateTime;
