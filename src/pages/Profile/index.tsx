import React from 'react';

import {
  Container,
} from './styles';

import TabMenu from '../../components/TabMenu';
import { useAuth } from '../../hooks/AuthContext';
import { Text, TouchableOpacity } from 'react-native';

const Profile: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <>
    <Container>
      <TouchableOpacity onPress={signOut}>
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
    </Container>
    <TabMenu/>
    </>
  )
}

export default Profile;
