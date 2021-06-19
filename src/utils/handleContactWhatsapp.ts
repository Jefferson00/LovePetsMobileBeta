import { Linking, Alert } from 'react-native';

export default function handleContactWhatsapp(name: string, phone:string | null){
  let msg = `Oi, vi seu anúncio no Love pets, estou interessado em adotar o ${name}`
  if(phone){
    let url = `whatsapp://send?text=${msg}&phone=55${phone}`;
    Linking.openURL(url).then(data => {
      console.log("WhatsApp Opened successfully " + data);
    })
    .catch(() => {
      Alert.alert('Tenha o whatsapp instalado em seu dispositivo.');
    });
  }else{
    Alert.alert('O usuário não possui um número válido cadastrado.');
  }
}
