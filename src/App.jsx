import { MainLayout } from './components/layouts/main-layout'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { ProtectedRoute } from './components/layouts/protected-route'
import { GeneralLayout } from './components/layouts/general-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { Login } from './pages/login'
import { GeneralTabsLayout } from './components/layouts/general-tabs-layout'
import { GeneralSectores } from './pages/general/sectores'
import { Dependencias } from './pages/general/dependencias'
import { Puestos } from './pages/general/puestos'
import 'react-toastify/dist/ReactToastify.css'
import { Modulos } from './pages/general/modulos'
import { Roles } from './pages/usuarios/roles'
import { Permisos } from './pages/usuarios/permisos'
import { Usuarios } from './pages/usuarios/usuarios'
import { Tipo } from './pages/oferta-academica/unidad-academica/tipo'
import { Unidad } from './pages/oferta-academica/unidad-academica/unidad'
import { Extension } from './pages/oferta-academica/extension/extension'
import { Nivel } from './pages/oferta-academica/carrera/nivel'
import { Carrera } from './pages/oferta-academica/carrera/carrera'
import { TipoRecurso } from './pages/oferta-academica/carrera/tipo-recurso'
import { Recurso } from './pages/oferta-academica/carrera/recurso'
import { Reportes } from './pages/reportes/reportes'
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

          <Route element={ <GeneralLayout><Outlet /></GeneralLayout> }>
            <Route element={ <GeneralTabsLayout tabsName='general'><Outlet /></GeneralTabsLayout> }>

              <Route path='/general/sectores' element={
                <ProtectedRoute>
                  <GeneralSectores />
                </ProtectedRoute>
                }
              />
              <Route path='/general/dependencias' element={
                <ProtectedRoute>
                  <Dependencias />
                </ProtectedRoute>
                }
              />
              <Route path='/general/puestos' element={
                <ProtectedRoute>
                  <Puestos />
                </ProtectedRoute>
              } />
              <Route path='/general/modulos' element={
                <ProtectedRoute>
                  <Modulos />
                </ProtectedRoute>
              } />
            </Route>

            <Route element={<GeneralTabsLayout tabsName='usuarios'><Outlet /></GeneralTabsLayout>}>

              <Route path='/usuarios/roles' element={
                <ProtectedRoute>
                  <Roles />
                </ProtectedRoute>
              }/>
              <Route path='/usuarios/permisos' element={
                <ProtectedRoute>
                  <Permisos />
                </ProtectedRoute>
              }/>
              <Route path='/usuarios/usuarios' element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              }/>

            </Route>

            <Route element={<GeneralTabsLayout tabsName='oferta-academica-unidad'><Outlet /></GeneralTabsLayout>}>
              <Route path='/oferta-academica/unidad/tipo' element={
                <ProtectedRoute>
                  <Tipo />
                </ProtectedRoute>
              }/>
              <Route path='/oferta-academica/unidad/unidad' element={
                <ProtectedRoute>
                  <Unidad />
                </ProtectedRoute>
              }/>
            </Route>

            <Route element={<GeneralTabsLayout noTabs><Outlet /></GeneralTabsLayout>}>
              <Route path='/oferta-academica/extension' element={
                <ProtectedRoute>
                  <Extension />
                </ProtectedRoute>
              } />
            </Route>

            <Route element={<GeneralTabsLayout tabsName='oferta-academica-carrera'><Outlet /></GeneralTabsLayout>}>
              <Route path='oferta-academica/carrera/nivel' element={
                <ProtectedRoute>
                  <Nivel />
                </ProtectedRoute>
              } />
              <Route path='oferta-academica/carrera/carrera' element={
                <ProtectedRoute>
                  <Carrera />
                </ProtectedRoute>
              } />
              <Route path='oferta-academica/carrera/tipo-recurso' element={
                <ProtectedRoute>
                  <TipoRecurso />
                </ProtectedRoute>
              } />
              <Route path='oferta-academica/carrera/recurso' element={
                <ProtectedRoute>
                  <Recurso />
                </ProtectedRoute>
              } />
            </Route>

          </Route>

          <Route path='reportes' element={
            <GeneralLayout text={'Reportes'}>
              <GeneralTabsLayout noTabs>
                <Reportes />
              </GeneralTabsLayout>
            </GeneralLayout>
          }>

          </Route>

        </Routes>

      </MainLayout>

    </Router>
  )
}

export default App
