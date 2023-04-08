import { useContext, createContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { UserCredentials } from "../../models/userInterface"

interface ApplicationContextInterface {
    isLoading: boolean,
    user?: UserCredentials,
    error?: Error | string,
    setLoading?: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<Error | undefined | string>>,
    setUser?: Dispatch<SetStateAction<UserCredentials | undefined>>
}

const ApplicationContext = createContext<ApplicationContextInterface>({ isLoading: true })

export const useApplicationContext = () => {
    return useContext(ApplicationContext)
}

export default function ApplicationProvider({ children }: { children: any }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | undefined | string>()
    const [user, setUser] = useState<UserCredentials | undefined>(undefined)

    useEffect(() => {
        setLoading(true)
        let u: UserCredentials | null = null

        let y = localStorage.getItem("userCredentials")
        if (y) {
            u = JSON.parse(y) as UserCredentials
            setUser(u)
        }

        if (u != null) {
            setUser(u)
            localStorage.setItem("userCredentials", JSON.stringify(u))
        }
        setLoading(false)
        return () => {
            if (user) {
                localStorage.setItem("userCredentials", JSON.stringify(user))
            }
            else {
                localStorage.removeItem("userCredentials")
            }
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem("userCredentials", JSON.stringify(user))
        }
        else {
            localStorage.removeItem("userCredentials")
        }
    }, [user])

    useEffect(() => {
        setTimeout(() => {
            setError(undefined)
        }, 5000)
    }, [error])

    const value: ApplicationContextInterface = { isLoading: loading, error, user, setLoading, setError, setUser }

    return <ApplicationContext.Provider value={value}>
        {children}
    </ApplicationContext.Provider>
}