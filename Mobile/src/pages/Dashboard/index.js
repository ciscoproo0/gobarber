import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import { Container, Title, List } from './styles';

const Dashboard = ({ isFocused }) => {
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (id) => {
    try {
      const {
        data: { canceled_at },
      } = await api.delete(`appointments/${id}`);

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                canceled_at,
              }
            : appointment
        )
      );
    } catch (err) {
      Alert.alert(
        'Erro no cancelamento',
        'Houve um erro ao cancelar este agendamento, contate o administrador.'
      );
    }
  };

  const loadAppointments = async () => {
    try {
      const { data } = await api.get('appointments');

      setAppointments(data);
    } catch (err) {
      Alert.alert(
        'Erro na listagem',
        'Não foi possível carregar a lista de agendamentos'
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
};

const tabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
export default withNavigationFocus(Dashboard);
