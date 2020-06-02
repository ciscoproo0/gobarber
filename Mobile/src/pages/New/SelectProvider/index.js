import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

const SelectProvider = ({ navigation }) => {
  const [providers, setProviders] = useState('');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const { data } = await api.get('providers');

        setProviders(data);
      } catch (err) {
        Alert.alert(
          'Erro na listagem',
          'Erro ao listar prestadores, contate o administrador do sistema.'
        );
      }
    };

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }>
              <Avatar
                source={{
                  uri:
                    provider.avatar?.url ||
                    `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />

              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
};

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  // headerTitleStyle: { alignSelf: 'center' },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SelectProvider;
