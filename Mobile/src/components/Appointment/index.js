import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const Appointment = ({ data, onCancel }) => {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri:
              data.provider?.avatar?.url ||
              `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
};

Appointment.propTypes = {
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.shape({
    cancelable: PropTypes.bool.isRequired,
    canceled_at: PropTypes.instanceOf(Date),
    date: PropTypes.string,
    past: PropTypes.bool.isRequired,
    provider: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default Appointment;
