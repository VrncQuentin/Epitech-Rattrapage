import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "../Auth/context";
import * as back from "../API/back";

const DbUserContext = createContext()
export const useDbUser = () => useContext(DbUserContext)

export const DbUserProvider = ({children}) => {
    const [dbUser, setDbUser] = useState()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const data = await back.getUser(user.uid)
                setErr('')
                setDbUser(data.data)
            } catch (e) {
                setErr('failure to find user: ' + e.message)
                try {
                    const data = await back.newUser(user.uid)
                    setErr('')
                    setDbUser(data.data)
                } catch (e) {
                    setErr('failure to create user: ' + e.message)
                }
            }
            setLoading(false)
        })()
    }, [user.uid, setDbUser])

    return (
        <DbUserContext.Provider value={{
            dbUser,
            setDbUser,
            dbUserErr: err
        }}>
            {!loading && children}
        </DbUserContext.Provider>
            )
}