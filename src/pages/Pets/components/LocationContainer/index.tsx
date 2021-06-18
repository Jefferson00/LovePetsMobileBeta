import React from 'react';

import {
  Container,
  InputContainer,
  Map,
  Label,
} from './styles';

import MarkerImg from '../../../../assets/marker.png';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Input from '../../../../components/Input';

interface LocationContainerProps {
  latitude: number;
  longitude: number;
}

const LocationContainer: React.FC<LocationContainerProps> = ({ latitude, longitude}) => {

  return (
    <Container>
      <Label>
        Localização
      </Label>
      <InputContainer>
        <Input
          name="location"
          icon="search"
          placeholder="buscar..."
        />
      </InputContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={MarkerImg}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </Map>
    </Container>
  )
}

export default LocationContainer;
