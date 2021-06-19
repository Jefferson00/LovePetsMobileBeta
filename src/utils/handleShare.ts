import { Share, Alert } from 'react-native';

export default async function handleShare(){
  try {
    const result = await Share.share({
      message: 'Compartilhar',
      title: 'Compartilhar'
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
