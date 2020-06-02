import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';

import Background from '../../../components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ navigation }) => {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(() =>
    formatRelative(parseISO(time), new Date(), { locale: pt })
  );

  const handleAddAppointment = async () => {
    try {
      await api.post(
        'appointments',
        {
          provider_id: provider.id,
          date: time,
        },
        navigation.navigate('Dashboard')
      );
    } catch (err) {
      Alert.alert(
        'Erro ao agendar',
        'Ocorreu um erro ao efetuar o agendamento, contate o administrador do sistema.'
      );
    }
  };

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri:
              provider.avatar?.url ||
              `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

Confirm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Confirm;
