# Atividade - Revisão de Código

**ETEC Antônio Furlan**

**Nome:** Otávio Pinheiro Roque

---

## **1. AuthContext.js**

### *Boas práticas:*
- uso do "return unsub;" no hook de estado de autenticação, o que cancela o listener e evita o vazamento de memória
- Tradução de mensagens do Firebase para português, facilitando a compreensão do usuário
- "useAuth()" como um hook personalizado, o que facilita o acesso ao contexto
- Aviso de erro caso o useAuth esteja fora do AuthCOntextProvider

### *Sugestões:*
- Remover o "console.log" comentado da linha 15, já que serve apenas para debug
- Remover o "setUser(response?.user);" e  "setIsAuthenticated(true);" comentados das linhas 69 e 70, pois o listener onAuthStateChanged já faz isso automaticamente
- Adicionar suporte para login com Gmail, Facebook e etc
- Adicionar persistência de login/sessão

## **2. ChatList.js**

### *Boas práticas:*
- Separação da exibição da lista de chats como um componente, o que permite que seja reutilizado e sem depender de outra parte do código
- Uso de NativeWind. Por ser um projeto pequeno atualmente, já é suficiente
- Uso do "Flatlist", que é melhor projetado para lista de items grandes (o que pode ser o caso num aplicativo de chat)

### *Sugestões:*
- Remover import de "text" que não está sendo utilizado
- Importar e usar o "StyleSheet" para facilitar a leitura do código. Além de ajudar futuramente qualquer edição ou reutilização do estilo para caso haja necessidade de maior escalabilidade do código
- Trocar o uso de Math.random() como keyExtractor, que acaba criando uma nova chave a cada renderização, para utilizar um identificador único e estável de cada item (como por exemplo um email)

## **3. CustomMenusItems.js**

### *Boas práticas:*
- Utilização do heightPercentageToDP para uma interface mais responsiva
- heightPercentageToDP renomeado/encurtado para hp, o que evita a repetição do nome longo

### *Sugestões:*
- Ajustar importação do "MenuOption", retirando a virgula dentro das chaves e deixando em uma única linha
- Remover widthPercentageToDP das importações, pois não está sendo usado

## **4. ChatRoomHeader.js**

### *Boas práticas:*
- Uso do Stack, que é extremamente personalizável
- Uso de NativeWind para rápida estilização
- Utilização do "expo-image", que carrega imagens mais rapidamente
- Importação de Entypo e Ionicons para fonte e ícones
- Uso de encadeamento opcional na linha de código "source={user?.profileUrl}" e "{user?.username}" da imagem de perfil, que em caso do valor ser nulo (por exemplo, quando não estiver logado), irá retornar "undefined"
- Uso do heightPercentageToDP para tamanhos de imagem e textos mais adaptaveis.
- Encurtamento de heightPercentageToDP como "hp", o que agiliza o uso. Além de ter sido utilizado várias vezes

### *Sugestões:*

- Remover widthPercentageToDP das importações, pois não está sendo usado. Também colocar espaço entre as chaves para melhor leitura


