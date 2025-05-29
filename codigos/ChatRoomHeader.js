//Importações
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';

// Função que exporta o header para ser renderizado, usando como argumento o user e router
export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
    // Define as configurações do header
        options={{
            title: '',
            headerShadowVisible: false,
            // Estiliza o conteúdo do lado esquerdo
            headerLeft: ()=>(
                <View className="flex-row items-center gap-4">
                    {/* Botão de retorno a tela anterior */}
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                    </TouchableOpacity>
                    {/* View para a imagem de perfil e nome do usuário */}
                    <View className="flex-row items-center gap-3">
                        {/* Imagem de perfil */}
                        <Image 
                            source={user?.profileUrl}
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                        />
                        {/* Nome do usuário */}
                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                            {user?.username}
                        </Text>
                    </View>
                </View>
            ),
            // Estiliza o conteúdo do lado direito
            headerRight: ()=>(
                // View com o botão de chamada e chamada de video
                <View className="flex-row items-center gap-8">
                    <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
                    <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />
                </View>
            )
        }}
    />
  )
}
