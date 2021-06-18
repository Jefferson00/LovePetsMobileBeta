import React from 'react';

import {
  Container,
  Column,
  SpeciePicker
} from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Specie = 'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others';

interface SpecieContainerProps {
  specie: Specie;
  setSpecie: (specie: Specie) => void;
}

const SpecieContainer: React.FC<SpecieContainerProps> = ({ specie, setSpecie }) => {

  return (
    <Container>
      <Column>
        <SpeciePicker
          isSelected={specie === 'dog'}
          onPress={() => setSpecie('dog')}
        >
          <Icon
            name="dog"
            size={25}
            color={specie === "dog" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
        <SpeciePicker
          isSelected={specie === 'rodent'}
          onPress={() => setSpecie('rodent')}
        >
          <Icon
            name="rodent"
            size={25}
            color={specie === "rodent" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
        <SpeciePicker
          isSelected={specie === 'fish'}
          onPress={() => setSpecie('fish')}
        >
          <Icon
            name="fish"
            size={25}
            color={specie === "fish" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
      </Column>
      <Column>
        <SpeciePicker
          isSelected={specie === 'cat'}
          onPress={() => setSpecie('cat')}
        >
          <Icon
            name="cat"
            size={25}
            color={specie === "cat" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
        <SpeciePicker
          isSelected={specie === 'rabbit'}
          onPress={() => setSpecie('rabbit')}
        >
          <Icon
            name="rabbit"
            size={25}
            color={specie === "rabbit" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
        <SpeciePicker
          isSelected={specie === 'others'}
          onPress={() => setSpecie('others')}
        >
          <Icon
            name="paw"
            size={25}
            color={specie === "others" ? "#FFF" : "#C4C4C4"}
          />
        </SpeciePicker>
      </Column>
    </Container>
  )
}

export default SpecieContainer;
