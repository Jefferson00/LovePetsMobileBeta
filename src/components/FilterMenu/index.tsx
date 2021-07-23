import React, { useCallback, useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useFilter } from '../../hooks/FilterContext';

import Icon from 'react-native-vector-icons/Feather';
import GenderIcon from 'react-native-vector-icons/Ionicons';
import PetIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

import {
  Container,
  FilterMenuButton,
  Content,
  SpecieFilterContainer,
  SpecieList,
  Title,
  SpecieButton,
  GenderButton,
  GenderFilterContainer,
  GenderList,
  RadiusContainer,
} from './styles';


const FilterMenu: React.FC = () => {
  const {
    distance,
    genderFilter,
    specieFilter,
    handleSetDistanceFilter,
    handleSetGenderFilter,
    handleSetSpecieFilter,
  } = useFilter();
  const widthRef = useRef(new Animated.Value(62)).current;
  const heightRef = useRef(new Animated.Value(60)).current;

  const [expandFilterMenu, setExpandFilterMenu] = useState(true);


  const handleShow = useCallback(() => {
    setExpandFilterMenu(!expandFilterMenu);

    if (expandFilterMenu) {
      Animated.timing(widthRef, {
        toValue: 259,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(heightRef, {
        toValue: 480,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(widthRef, {
        toValue: 62,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(heightRef, {
        toValue: 60,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [widthRef, heightRef, expandFilterMenu]);

  return (
    <Container style={{
      height: heightRef,
      width: widthRef,
    }}>
      <FilterMenuButton
        onPress={handleShow}
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <Icon name="menu" size={20} color="#FFF" />
      </FilterMenuButton>

      <Content>
        <SpecieFilterContainer>
          <Title>
            Filtrar por especie
          </Title>
          <SpecieList horizontal showsHorizontalScrollIndicator={false}>
            <SpecieButton
              isSelected={specieFilter === 'dog'}
              onPress={() => handleSetSpecieFilter('dog')}
            >
              <PetIcons
                name="dog"
                size={25}
                color={specieFilter === "dog" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
            <SpecieButton
              isSelected={specieFilter === 'cat'}
              onPress={() => handleSetSpecieFilter('cat')}
            >
              <PetIcons
                name="cat"
                size={25}
                color={specieFilter === "cat" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
            <SpecieButton
              isSelected={specieFilter === 'rodent'}
              onPress={() => handleSetSpecieFilter('rodent')}
            >
              <PetIcons
                name="rodent"
                size={25}
                color={specieFilter === "rodent" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
            <SpecieButton
              isSelected={specieFilter === 'rabbit'}
              onPress={() => handleSetSpecieFilter('rabbit')}
            >
              <PetIcons
                name="rabbit"
                size={25}
                color={specieFilter === "rabbit" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
            <SpecieButton
              isSelected={specieFilter === 'fish'}
              onPress={() => handleSetSpecieFilter('fish')}
            >
              <PetIcons
                name="fish"
                size={25}
                color={specieFilter === "fish" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
            <SpecieButton
              isSelected={specieFilter === 'others'}
              onPress={() => handleSetSpecieFilter('others')}
            >
              <PetIcons
                name="paw"
                size={25}
                color={specieFilter === "others" ? "#FFF" : "#C4C4C4"}
              />
            </SpecieButton>
          </SpecieList>

          <TouchableOpacity onPress={() => handleSetSpecieFilter(null)}>
            <Title>
              Limpar filtro
            </Title>
          </TouchableOpacity>
        </SpecieFilterContainer>

        <GenderFilterContainer>
          <Title>
            Filtrar por genêro
          </Title>

          <GenderList>
            <GenderButton
              isSelected={genderFilter === 'male'}
              onPress={() => handleSetGenderFilter('male')}
            >
              <GenderIcon
                name="male"
                size={20}
                color={genderFilter === "male" ? "#FFF" : "#C4C4C4"}
              />
            </GenderButton>
            <GenderButton
              isSelected={genderFilter === 'female'}
              onPress={() => handleSetGenderFilter('female')}
            >
              <GenderIcon
                name="female"
                size={20}
                color={genderFilter === "female" ? "#FFF" : "#C4C4C4"}
              />
            </GenderButton>
            <GenderButton
              isSelected={genderFilter === null}
              onPress={() => handleSetGenderFilter(null)}
            >
              <GenderIcon
                name="male"
                size={15}
                color={genderFilter === null ? "#FFF" : "#C4C4C4"}
              />
              <GenderIcon
                name="female"
                size={15}
                color={genderFilter === null ? "#FFF" : "#C4C4C4"}
              />
            </GenderButton>
          </GenderList>
        </GenderFilterContainer>

        <RadiusContainer>
          <Title>
            Filtrar distancia de alcance dos anúncios
          </Title>
          <Slider
            style={{ width: '100%', height: 50 }}
            minimumValue={10}
            maximumValue={90}
            minimumTrackTintColor="#12BABA"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#12BABA"
            step={1}
            value={distance}
            onSlidingComplete={value => handleSetDistanceFilter(value)}
          />
        </RadiusContainer>
        <Title>
          {distance + ' km'}
        </Title>
      </Content>
    </Container>
  )
}

export default FilterMenu;
