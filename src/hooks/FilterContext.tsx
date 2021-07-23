import React, { createContext, useCallback, useContext, useState } from 'react';

interface FilterContextData {
  specieFilter: SpecieProps;
  genderFilter: GenderProps;
  distance: number;
  page: number;
  handleSetSpecieFilter: (specie: SpecieProps) => void;
  handleSetGenderFilter: (gender: GenderProps) => void;
  handleSetDistanceFilter: (distance: number) => void;
  handleSetPage: (page: number) => void;
}

type SpecieProps = 'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others' | null;
type GenderProps = 'male' | 'female' | null;

export const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider: React.FC = ({ children }) => {
  const [specieFilter, setSpecieFilter] = useState<SpecieProps>(null);
  const [genderFilter, setGenderFilter] = useState<GenderProps>(null);
  const [distance, setDistance] = useState(50);
  const [page, setPage] = useState(1);

  const handleSetSpecieFilter = useCallback((specie: SpecieProps) => {
    setPage(1);
    setSpecieFilter(specie);
  }, []);

  const handleSetGenderFilter = useCallback((gender: GenderProps) => {
    setPage(1);
    setGenderFilter(gender);
  }, []);

  const handleSetDistanceFilter = useCallback((distance: number) => {
    setPage(1);
    setDistance(distance);
  }, []);

  const handleSetPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <FilterContext.Provider value={{
      specieFilter,
      genderFilter,
      distance,
      page,
      handleSetSpecieFilter,
      handleSetGenderFilter,
      handleSetDistanceFilter,
      handleSetPage,
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


