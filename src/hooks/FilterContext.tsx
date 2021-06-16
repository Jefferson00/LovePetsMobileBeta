import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';


interface FilterContextData{
  specieFilter: SpecieProps;
  genderFilter: GenderProps;
  distance: number;
  handleSetSpecieFilter: (specie: SpecieProps) => void;
  handleSetGenderFilter: (gender: GenderProps) => void;
  handleSetDistanceFilter: (distance: number) => void;
}

type SpecieProps =  'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others' | null ;
type GenderProps = 'male' | 'female' | null;

export const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider : React.FC = ({children}) => {
  const [specieFilter, setSpecieFilter] = useState<SpecieProps>(null);
  const [genderFilter, setGenderFilter] = useState<GenderProps>(null);
  const [distance, setDistance] = useState(50);

  const handleSetSpecieFilter = useCallback((specie: SpecieProps)=> {
      setSpecieFilter(specie);
  }, []);

  const handleSetGenderFilter = useCallback((gender: GenderProps)=> {
    setGenderFilter(gender);
  }, []);

  const handleSetDistanceFilter = useCallback((distance: number)=> {
    setDistance(distance);
  }, []);

  useEffect(() => {

  },[]);

  return(
    <FilterContext.Provider value={{
      specieFilter,
      genderFilter,
      distance,
      handleSetSpecieFilter,
      handleSetGenderFilter,
      handleSetDistanceFilter,
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter(): FilterContextData {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


