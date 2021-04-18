import {createContext, useContext, useEffect, useState} from 'react'
import {auth, github} from './firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
        })
    })

    const signupWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password)
    const loginWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password)
    const signupWithGithub = () => auth.signInWithPopup(github)
    const loginWithGithub = () => auth.signInWithPopup(github)
    const logout = () => auth.signOut()

    return (
        <AuthContext.Provider value={{
            user,
            signupWithEmailAndPassword,
            loginWithEmailAndPassword,
            signupWithGithub,
            loginWithGithub,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}