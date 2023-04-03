import { useContext, createContext } from "react";
import { IUser } from "../../models/userInterface"

interface ApplicationContextInterface {
    isLoading: boolean,
    user?: IUser,
    error?: Error
}

export const ApplicationContext = createContext<ApplicationContextInterface>({ isLoading: true })

export const useApplicationContext = () => {
    return useContext(ApplicationContext)
}

export default function ApplicationProvider({ children }: { children: any }) {
    const value = { isLoading: true }
    return <ApplicationContext.Provider value={value}>
        {children}
    </ApplicationContext.Provider>
}