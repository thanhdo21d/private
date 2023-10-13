import { createContext, useState } from 'react'
import { IuserContext } from '~/types/users/userContext'
import { getProfileFromLS } from '~/utils/utils'
export interface AppContextInterface {
  isAuthenticated?: boolean
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
  profile: IuserContext | null
  setProfile: React.Dispatch<React.SetStateAction<IuserContext | null>>
  reset: () => void
}
export const initialAppContext: AppContextInterface = {
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<IuserContext | null>(initialAppContext.profile)
  const reset = () => {
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}