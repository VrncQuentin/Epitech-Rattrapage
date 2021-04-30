import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "../Auth/context";
import * as back from "../API/back";

const DbUserContext = createContext()
export const useDbUser = () => useContext(DbUserContext)

export const DbUserProvider = ({children}) => {
    const [dbUser, setDbUser] = useState()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(true)
    const {user, token} = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const data = await back.getUser(user.uid)
                setErr('')
                setDbUser(data.data)
            } catch (e) {
                try {
                    const data = await back.newUser(user.uid, token !== '' ? token : 'NOT')
                    setErr('')
                    setDbUser(data.data)
                } catch (e) {
                    setErr('failure to load user: ' + e.message)
                }
            }
            setLoading(false)
        })()
    }, [user.uid, token, setDbUser, setErr])

    return (
        <DbUserContext.Provider value={{
            dbUser,
            dbUserErr: err,
        }}>
            {!loading && children}
        </DbUserContext.Provider>
    )
}