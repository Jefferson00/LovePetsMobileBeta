import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

import { IPetsData , IPetImages, Age, Gender, Specie} from '../@types/Pets/IPetsData';

interface FavsData{
  id:string;
  user_id:string;
  pet_id:string;
  pet:IPetsData;
}



interface PetsContextData{
  favPets:FavsData[];
  myPets: IPetsData[];
  loadFavs:() => Promise<void>;
  loadMyPets:() => Promise<void>;
  handleSelectMyPet:(pet: IPetsData) =>void;
  handleUnselectMyPet:() =>void;
  handleDeleteMyPet:() => Promise<void>;
}

export const PetsContext = createContext<PetsContextData>({} as PetsContextData);

export const PetsProvider : React.FC = ({children}) => {
  const [myPets, setMyPets] = useState<IPetsData[]>([]);
  const [pet, setPet] = useState<IPetsData>({} as IPetsData);

  const [favPets, setFavPets] = useState<FavsData[]>([]);
  const [fav, setFav] = useState<FavsData>({} as FavsData);

  const { user } = useAuth();

  let pets: IPetsData[] = [];
  const loadMyPets = useCallback( async() => {
    const response = await api.get('/pets/me');

    pets = response.data;
    pets = await setMyPetImages(pets);

    console.log(myPets);

    if(JSON.stringify(pets) !== JSON.stringify(myPets)){
      setMyPets(pets);
    }
  }, [myPets]);

  const setMyPetImages = useCallback(async(petsArr: IPetsData[]): Promise<IPetsData[]> => {
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

  const handleDeleteMyPet = useCallback(async() => {
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
  const loadFavs = useCallback( async() => {
    const response = await api.get('/favs');

    favs = response.data;
    favs = await setFavPetImages(favs);

    setFavPets(favs);
  }, []);

  const setFavPetImages = useCallback(async(favsArr: FavsData[]): Promise<FavsData[]> => {
    const mapPromises = favsArr.map(async (fav) => {
      let petsWithImages = Object.assign({}, fav)
      petsWithImages.pet.images = await findPetImages(fav.pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

    const findPetImages = useCallback(async(pet_id:string) : Promise<IPetImages[]> => {
      let images: IPetImages[] = []
        try {
          const response = await api.get(`/images/${pet_id}`);
          images = response.data;
        } catch (error) {
        }
        return images;
  }, []);

  const handleDeletePet = useCallback(async() => {
    try {
      await api.delete(`favs/${fav?.id}`);

      setFavPets(favPets.filter(favs => favs.id !== fav.id));

    } catch (error) {
    }
  }, [fav]);

  useEffect(() => {
    if(user){
      loadMyPets();
      loadFavs();
    }
  },[user]);

  return(
    <PetsContext.Provider value={{
      favPets,
      myPets,
      loadFavs,
      loadMyPets,
      handleDeleteMyPet,
      handleSelectMyPet,
      handleUnselectMyPet,
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


