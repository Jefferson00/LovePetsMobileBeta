import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

import { IPetsData, IPetImages } from '../@types/Pets/IPetsData';

interface FavsData {
  id: string;
  user_id: string;
  pet_id: string;
  pet: IPetsData;
}

interface PetsContextData {
  favPets: FavsData[];
  myPets: IPetsData[];
  loadFavs: () => Promise<void>;
  loadMyPets: () => Promise<void>;
  handleSelectMyPet: (pet: IPetsData) => void;
  handleUnselectMyPet: () => void;
  resetPetsStates: () => void;
  handleDeleteMyPet: () => Promise<void>;
  handleDeleteFavPet: (id: string) => Promise<void>;
}

export const PetsContext = createContext<PetsContextData>({} as PetsContextData);

export const PetsProvider: React.FC = ({ children }) => {
  const [myPets, setMyPets] = useState<IPetsData[]>([]);
  const [pet, setPet] = useState<IPetsData>({} as IPetsData);

  const [favPets, setFavPets] = useState<FavsData[]>([]);

  let pets: IPetsData[] = [];
  const loadMyPets = useCallback(async () => {
    try {
      const response = await api.get('/pets/me');

      pets = response.data;
      pets = await setMyPetImages(pets);

      if (JSON.stringify(pets) !== JSON.stringify(myPets)) {
        setMyPets(pets);
      }
    } catch (error) {

    }
  }, [myPets, pets]);

  const resetPetsStates = () => {
    setMyPets([]);
    setFavPets([]);
  }

  const setMyPetImages = useCallback(async (petsArr: IPetsData[]): Promise<IPetsData[]> => {
    const mapPromises = petsArr.map(async (pet) => {
      let petsWithImages = Object.assign({}, pet)
      petsWithImages.images = await findPetImages(pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

  const handleSelectMyPet = useCallback((pet: IPetsData) => {
    setPet(pet);
  }, []);

  const handleDeleteMyPet = useCallback(async () => {
    try {
      await api.delete(`pets/${pet?.id}`);

      setMyPets(myPets.filter(mypets => mypets.id !== pet.id));
    } catch (error) {

    }
  }, [pet]);

  const handleUnselectMyPet = useCallback(() => {
    setPet({} as IPetsData);
  }, [pet]);

  let favs: FavsData[];
  const loadFavs = useCallback(async () => {
    const response = await api.get('/favs');

    favs = response.data;
    favs = await setFavPetImages(favs);

    setFavPets(favs);
  }, []);

  const setFavPetImages = useCallback(async (favsArr: FavsData[]): Promise<FavsData[]> => {
    const mapPromises = favsArr.map(async (fav) => {
      let petsWithImages = Object.assign({}, fav)
      petsWithImages.pet.images = await findPetImages(fav.pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

  const findPetImages = useCallback(async (pet_id: string): Promise<IPetImages[]> => {
    let images: IPetImages[] = []
    try {
      const response = await api.get(`/images/${pet_id}`);
      images = response.data;
    } catch (error) {
    }
    return images;
  }, []);

  const handleDeleteFavPet = useCallback(async (id: string) => {
    try {
      await api.delete(`favs/${id}`);

      setFavPets(favPets.filter(favs => favs.id !== id));

    } catch (error) {
    }
  }, [favPets]);

  return (
    <PetsContext.Provider value={{
      favPets,
      myPets,
      loadFavs,
      loadMyPets,
      handleDeleteMyPet,
      handleSelectMyPet,
      handleUnselectMyPet,
      resetPetsStates,
      handleDeleteFavPet,
    }}>
      {children}
    </PetsContext.Provider>
  )
}

export function usePets(): PetsContextData {
  const context = useContext(PetsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


