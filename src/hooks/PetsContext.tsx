import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import api from '../services/api';

interface PetImages{
  id:string;
  pet_id:string;
  image:string;
  image_url:string | null;
}

interface FavsData{
  id:string;
  user_id:string;
  pet_id:string;
  pet:PetsData;
}

interface PetsData{
  id:string;
  name: string;
  user_id: string;
  species:string;
  is_adopt: boolean;
  age:string;
  gender:string;
  description:string;
  location_lat:string;
  location_lon:string;
  city:string;
  state:string;
  created_at: Date;
  updated_at: Date;
  user_name: string;
  user_phone: string;
  user_avatar: string;
  images: PetImages[];
}

interface PetsContextData{
  favPets:FavsData[];
  loadFavs:() => Promise<void>;
}

export const PetsContext = createContext<PetsContextData>({} as PetsContextData);

export const PetsProvider : React.FC = ({children}) => {
  const [favPets, setFavPets] = useState<FavsData[]>([]);
  const [fav, setFav] = useState<FavsData>({} as FavsData);

  let favs: FavsData[];
  const loadFavs = useCallback( async() => {
    const response = await api.get('/favs');

    favs = response.data;
    favs = await setPetImages(favs);

    setFavPets(favs);
  }, []);

  const setPetImages = useCallback(async(favsArr: FavsData[]): Promise<FavsData[]> => {
    const mapPromises = favsArr.map(async (fav) => {
      let petsWithImages = Object.assign({}, fav)
      petsWithImages.pet.images = await findPetImages(fav.pet.id);

      return petsWithImages;
    });
    return await Promise.all(mapPromises);
  }, []);

    const findPetImages = useCallback(async(pet_id:string) : Promise<PetImages[]> => {
      let images: PetImages[] = []
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
    loadFavs();
  },[]);

  return(
    <PetsContext.Provider value={{
      favPets,
      loadFavs,
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


