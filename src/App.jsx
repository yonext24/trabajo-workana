import { MainLayout } from './components/layouts/main-layout'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/layouts/protected-route'
import { GeneralLayout } from './components/layouts/general-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { Login } from './pages/login'
import { GeneralTabsLayout } from './components/layouts/general-tabs-layout'
import { GeneralSectores } from './pages/general/sectores'
import { Dependencias } from './pages/general/dependencias'
import { Puestos } from './pages/general/puestos'
import 'react-toastify/dist/ReactToastify.css'
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
import { CentrosEducativos } from './pages/centros-educativos/centros-educativos'
import { Geografia } from './pages/geografia/geografia'
import { Perfil } from './pages/perfil'
import { CambiarContrasena } from './pages/cambiar-contraseña'
import { useAuth } from './hooks/useAuth'
import { Modulos } from './pages/general/modulos'

function App () {
  useAuth()

  return (
    <Router>

      <MainLayout>

        <Routes>

          <Route exact path='/' element={<Navigate to='perfil' />} />

          <Route path='/login' element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
          />

          <Route element={<GeneralLayout text='General'><Outlet /></GeneralLayout>}>
            <Route element={
              <ProtectedRoute name='GENERAL' parsedName='General'>
                <GeneralTabsLayout tabsName='general'>
                  <Outlet />
                </GeneralTabsLayout>
              </ProtectedRoute>
            }>
              <Route path='/general/sectores' element={
                <GeneralSectores />
              }
              />
              <Route path='/general/dependencias' element={
                <Dependencias />
              }
              />
              <Route path='/general/puestos' element={
                <Puestos />
              } />
              <Route path='/general/modulos' element={
                <Modulos />
              } />
            </Route>

            <Route element={
              <ProtectedRoute name='USUARIOS' parsedName={'Usuarios'}>
                <GeneralTabsLayout tabsName='usuarios'>
                  <Outlet />
                </GeneralTabsLayout>
              </ProtectedRoute>
            }>
              <Route path='/usuarios/roles' element={
                <Roles />
              } />
              <Route path='/usuarios/permisos' element={
                <Permisos />
              } />
              <Route path='/usuarios/usuarios' element={
                <Usuarios />
              } />
            </Route>

            <Route element={
              <ProtectedRoute name='OFERTA_ACADEMICA' parsedName={'Oferta Académica'}>
                <Outlet/>
              </ProtectedRoute>
            }>
              <Route element={
                <GeneralTabsLayout tabsName='oferta-academica-unidad'>
                  <Outlet />
                </GeneralTabsLayout>
              }>
                <Route path='/oferta-academica/unidad/tipo' element={
                  <Tipo />
                } />
                <Route path='/oferta-academica/unidad/unidad' element={
                  <Unidad />
                } />
              </Route>

              <Route element={<GeneralTabsLayout noTabs><Outlet /></GeneralTabsLayout>}>
                <Route path='/oferta-academica/extension' element={
                    <Extension />
                } />
              </Route>

              <Route element={<GeneralTabsLayout tabsName='oferta-academica-carrera'><Outlet /></GeneralTabsLayout>}>
                <Route path='oferta-academica/carrera/nivel' element={
                  <Nivel />
                } />
                <Route path='oferta-academica/carrera/carrera' element={
                  <Carrera />
                } />
                <Route path='oferta-academica/carrera/tipo-recurso' element={
                  <TipoRecurso />
                } />
                <Route path='oferta-academica/carrera/recurso' element={
                  <Recurso />
                } />
              </Route>

            </Route>
          </Route>

          <Route path='reportes' element={
            <GeneralLayout text={'Reportes'}>
              <ProtectedRoute name={'REPORTES'}>
                <GeneralTabsLayout noTabs>
                    <Reportes />
                </GeneralTabsLayout>
              </ProtectedRoute>
            </GeneralLayout>
          } />

          <Route path='centros' element={
            <GeneralLayout text={'Centros Educativos'}>
              <ProtectedRoute name={'CENTROS_EDUCATIVOS'}>
                <GeneralTabsLayout noTabs>
                    <CentrosEducativos />
                </GeneralTabsLayout>
              </ProtectedRoute>
            </GeneralLayout>
          } />

          <Route path='geografia' element={
            <GeneralLayout text={'Geografía'}>
              <ProtectedRoute name={'GEOGRAFICO'}>
                <GeneralTabsLayout noTabs>
                    <Geografia />
                </GeneralTabsLayout>
              </ProtectedRoute>
            </GeneralLayout>
          } />
          <Route path='perfil' element={
            <GeneralLayout text={'Perfil de usuario'}>
              <GeneralTabsLayout noTabs>
                <ProtectedRoute isProfile>
                  <Perfil />
                </ProtectedRoute>
              </GeneralTabsLayout>
            </GeneralLayout>
          } />
          <Route path='cambiar-contraseña' element={
            <GeneralLayout text={'Cambiar contraseña'}>
              <GeneralTabsLayout noTabs>
                <ProtectedRoute isProfile>
                  <CambiarContrasena />
                </ProtectedRoute>
              </GeneralTabsLayout>
            </GeneralLayout>
          } />

        </Routes>

      </MainLayout>

    </Router>
  )
}

export default App
