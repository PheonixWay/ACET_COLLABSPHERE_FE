import { AppRouter } from './routes/Router'
import { AuthProvider } from './context/AuthContext'
import { UIProvider } from './context/UIContext'
import { DataProvider } from './context/DataContext'

export default function App(){
  return (
    <AuthProvider>
      <UIProvider>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </UIProvider>
    </AuthProvider>
  )
}
