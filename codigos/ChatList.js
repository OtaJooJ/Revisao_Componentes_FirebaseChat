// Importações
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

// Função que exporta o componente "ChatList" para ser a interface que será renderizada na tela
export default function ChatList({users, currentUser}) {
    // Hook do expo-router para rotear a tela
    const router = useRouter();
  return (
    // View que será renderizada, sendo uma lista
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        keyExtractor={item=> Math.random()}
        
        // Oculta a barra de rolagem vertical
        showsVerticalScrollIndicator={false}

        // Função para renderizar os items da lista
        renderItem={({item, index})=> <ChatItem 
            noBorder={index+1 == users.length} 
            router={router} 
            currentUser={currentUser}
            item={item} 
            index={index} 
        />}
      />
    </View>
  )
}
