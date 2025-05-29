// Importações
import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import {doc, getDoc, setDoc} from 'firebase/firestore'

// Cria o contexto da autenticação, que irá ser utilizado em toda a aplicação
export const AuthContext = createContext();

// Cria uma váriavel que define o Provider do contexto da autenticação, permitindo que seja possivel ter acesso aos dados que vão ser passados. É uma forma de compartilhar estados pela aplicação
export const AuthContextProvider = ({children})=>{
    // Declaração de user e isAuthenticated, que estão sendo declaradas como se o usuário estivese deslogado
    const [user, setUser] = useState(null); // user irá guardar os dados do usuário logado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); //Indica se ele está autenticado

    // Hook que detecta alterações no estado da autenticação
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            // console.log('got user: ', user);  

            // Se o usuário se autenticar, salvar os dados com o "setUser" e atualiza dados extras com o "updateUserData"
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                // Senão, define como não autenticado e declara o setUser como nulo
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        // Cancela o listener
        return unsub; 
    },[]);

    // Função para atualizar os dados do usuário
    const updateUserData = async (userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        // Busca os dados no FireStore
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId}) // e atualiza eles
        }
    }

    // Função de login
    const login = async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        }catch(e){
            let msg = e.message;
            // Traduz mensagens técnicas do Firebase
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/invalid-credential)')) msg='E-mail ou Senha errada'
            return {success: false, msg};
        }
    }

    // Função de logout
    const logout = async ()=>{
        try{
            await signOut(auth);
            return {success: true}
        }catch(e){
            return {success: false, msg: e.message, error: e};
        }
    }

    // Função de registro de conta
    const register = async (email, password, username, profileUrl)=>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            // setUser(response?.user);
            // setIsAuthenticated(true);

            // Adiciona novo usuário no banco de dados
            await setDoc(doc(db, "users", response?.user?.uid),{
                username, 
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        }catch(e){
            let msg = e.message;
            // Traduz mensagens técnicas do Firebase
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/email-already-in-use)')) msg='Esse e-mail já está em uso'
            return {success: false, msg};
        }
    }

    // Retorna todos os dados e funções para o app, fazendo com que qualquer componente dentro do AuthContextProvider pode acessar isso com useAuth().
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    // Avisa que o useAuth deve estar dentro do AuthContextProvider
    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}
