import React from 'react';

import {
  Container,
  InputContainer,
  Map,
  Label,
  CalloutContainer,
  CalloutText,
} from './styles';

import MarkerImg from '../../../../assets/marker.png';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

interface LocationContainerProps {
  latitude: number;
  longitude: number;
  onSelectLocation: (lat: string, lon: string) => void;
}

const LocationContainer: React.FC<LocationContainerProps> = ({ latitude, longitude, onSelectLocation }) => {

  return (
    <Container>
      <Label>
        Localização
      </Label>
      <InputContainer>
        {/*<Input
          name="location"
          icon="search"
          placeholder="buscar..."
        />*/}
      </InputContainer>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={(e) => {
          onSelectLocation(
            String(e.nativeEvent.coordinate.latitude),
            String(e.nativeEvent.coordinate.longitude),
          )
        }}
      >
        <Marker
          hitSlop={{
            top: 6,
            bottom: 6,
            left: 6,
            right: 6,
          }}
          icon={MarkerImg}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
        >
          <Callout tooltip>
            <CalloutContainer>
              <CalloutText>teste</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </Map>
    </Container>
  )
}

export default LocationContainer;
