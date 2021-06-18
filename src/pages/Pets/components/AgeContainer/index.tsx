import React from 'react';

import {
  Container,
  AgeButton,
  AgeText,
} from './styles';

type AgeProps = '- 1 ano' | '1 ano' | '2 anos' | '3 anos' | '4 anos' | '+ 4 anos';

interface AgeContainerProps {
  age: AgeProps;
  setAge: (age: AgeProps) => void;
}

const AgeContainer: React.FC<AgeContainerProps> = ({ age, setAge}) => {

  return (
    <Container horizontal showsHorizontalScrollIndicator={false}>
      <AgeButton isSelected={age === '- 1 ano'} onPress={() => setAge('- 1 ano')}>
        <AgeText isSelected={age === '- 1 ano'}>
          - 1 ano
        </AgeText>
      </AgeButton>
      <AgeButton isSelected={age === '1 ano'} onPress={() => setAge('1 ano')}>
        <AgeText isSelected={age === '1 ano'}>
          1 ano
        </AgeText>
      </AgeButton>
      <AgeButton isSelected={age === '2 anos'} onPress={() => setAge('2 anos')}>
        <AgeText isSelected={age === '2 anos'}>
          2 anos
        </AgeText>
      </AgeButton>
      <AgeButton isSelected={age === '3 anos'} onPress={() => setAge('3 anos')}>
        <AgeText isSelected={age === '3 anos'}>
          3 anos
        </AgeText>
      </AgeButton>
      <AgeButton isSelected={age === '4 anos'} onPress={() => setAge('4 anos')}>
        <AgeText isSelected={age === '4 anos'}>
          4 anos
        </AgeText>
      </AgeButton>
      <AgeButton isSelected={age === '+ 4 anos'} onPress={() => setAge('+ 4 anos')}>
        <AgeText isSelected={age === '+ 4 anos'}>
          + 4 anos
        </AgeText>
      </AgeButton>
    </Container>
  )
}

export default AgeContainer;
