import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import {  createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// AUTH PROVIDER
export const AuthProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //  RESGISTER A USER
    const registerUser = async (email, password) => {

        return  await createUserWithEmailAndPassword(auth, email, password)
    }

    // LOGIN USER
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    //SIGN UP WITH GMAIL
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // LOG OUT
    const logout = () => {
        return signOut(auth)
    }

    //MANAGE USER SESSION
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
                const{email,displayName,photoUrl } = user;
                const userData = {
                    email,
                    username:displayName,
                    phtot: photoUrl,
                }

            }
        })
        return() => unsubscribe;
    })

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    }

    return(
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
    )
}


