export interface IPetImages{
  id:string | null;
  pet_id:string;
  image:string;
  image_url:string | null;
}

export type Specie = 'dog' | 'cat' | 'rodent' | 'rabbit' | 'fish' | 'others';
export type Age = '- 1 ano' | '1 ano' | '2 anos' | '3 anos' | '4 anos' | '+ 4 anos';
export type Gender = 'male' | 'female';

export interface IPetsData{
  id:string;
  name: string;
  user_id: string;
  species:Specie;
  is_adopt: boolean;
  age:Age;
  gender:Gender;
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
  images: IPetImages[];
}
