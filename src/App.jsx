import { MainLayout } from './components/layouts/main-layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/layouts/protected-route'
import { GeneralLayout } from './components/layouts/general-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { Login } from './pages/login'
import { GeneralTabsLayout } from './components/layouts/general-tabs-layout'
import { GeneralSectores } from './pages/general/sectores'
import { Dependencias } from './pages/general/dependencias'

function App () {
  return (

    <Router>

      <MainLayout>

        <Routes>

          <Route path='/login' element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          <Route path='/general/sectores' element={
              <ProtectedRoute>
                <GeneralLayout text={'General'}>
                  <GeneralTabsLayout>
                    <GeneralSectores />
                  </GeneralTabsLayout>
                </GeneralLayout>
              </ProtectedRoute>
            }
          />
          <Route path='/general/dependencias' element={
              <ProtectedRoute>
                <GeneralLayout text={'General'}>
                  <GeneralTabsLayout>
                    <Dependencias />
                  </GeneralTabsLayout>
                </GeneralLayout>
              </ProtectedRoute>
            }
          />

        </Routes>

      </MainLayout>

    </Router>
  )
}

export default App
