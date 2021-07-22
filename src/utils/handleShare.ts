import { Share, Alert } from 'react-native';

export default async function handleShare(pet_id: string) {
  try {
    const result = await Share.share({
      message: `Olha só, esse pet fofinho precisa de um novo lar. 😍🥺 https://lovepets.vercel.app/pets/${pet_id}`,
      title: 'Love Pets: amor aos animais',
      url: `https://lovepets.vercel.app/pets/${pet_id}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
}
