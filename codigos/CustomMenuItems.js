// Importações
import { Text, View } from 'react-native';
import {
    MenuOption,
  } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Função que exporta o componente MenuItem para ser renderizado
export const MenuItem = ({text, action, value, icon})=>{
    return (
        // A função action usa o value (do hook personalizado lá do authContext.js) como argumento ao ser selecionado.
        <MenuOption onSelect={()=> action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">
                    {text}
                </Text>
                {/* Icone que aparecerá no lado esquerdo */}
                {icon} 
            </View>
        </MenuOption>
    )
}
