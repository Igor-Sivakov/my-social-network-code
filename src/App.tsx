import React, { FC, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { Layout, theme } from 'antd'
import 'antd/dist/reset.css'
import { initializeApp, showGlobalError } from './redux/reducers/appReducer'
import { getInitialized, getGlobalError } from './redux/selectors/appSelectors'
import { SideBar } from './componets/SideBar/SideBar'
import { Header } from './componets/Header/Header'
import Preloader from './componets/common/preloader/preloader'
import ProfilePage from './componets/Profile/ProfilePage'
import GlobalErrorMessage from './componets/GlobalErrorMessage/GlobalErrorMessage'
import Music from './componets/Music/Music'
import News from './componets/News/News'
import Settings from './componets/Settings/Settings'
import './componets/SideBar/SideBar.css'
import './App.css'

const Dialogs = React.lazy(() => import('./componets/Dialogs/Dialogs'))
const ChatPage = React.lazy(() => import('./componets/Chat/ChatPage'))
const UsersPage = React.lazy(() => import('./componets/Users/UsersPage'))
const LoginPage = React.lazy(() => import('./componets/Login/LoginPage'))

export const App: FC = () => {
  const { Content, Footer } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const setCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const globalError = useSelector(getGlobalError)
  const initialized = useSelector(getInitialized)

  const dispatch = useDispatch()

  useEffect(() => {
    const catchAllUnhandledErrors = (
      promiseRejectionEvent: PromiseRejectionEvent
    ) => {
      dispatch(
        showGlobalError(
          promiseRejectionEvent.reason.message
        ) as unknown as AnyAction
      )
    }

    dispatch(initializeApp() as unknown as AnyAction)
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors)

    return function cleanup() {
      window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
    }
  }, [dispatch])
  if (!initialized) return <Preloader />
  return (
    <HashRouter>
      <Layout className='app-wrapper'>
        <SideBar collapsed={collapsed} />
        <Layout className='site-layout'>
          <Header
            collapsed={collapsed}
            colorBgContainer={colorBgContainer}
            setCollapsed={setCollapse}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {globalError && <GlobalErrorMessage error={globalError} />}
            <React.Suspense
              fallback={
                <div>
                  <Preloader />
                </div>
              }
            >
              <Routes>
                <Route
                  path='/'
                  element={<ProfilePage router={undefined as any} />}
                />
                <Route
                  path='/Profile'
                  element={<ProfilePage router={undefined as any} />}
                />
                <Route
                  path='/Profile/:userId'
                  element={<ProfilePage router={undefined as any} />}
                />
                <Route path='/Dialogs' element={<Dialogs />} />
                <Route path='/Chat' element={<ChatPage />} />
                <Route path='/News' element={<News />} />
                <Route path='/Music' element={<Music />} />
                <Route path='/Users' element={<UsersPage />} />
                <Route path='/Settings' element={<Settings />} />
                <Route path='/Login' element={<LoginPage />} />
                <Route path='*' element={<div>404 NOT FOUND</div>} />
              </Routes>
            </React.Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            My network ©2023 Created by Sivakov Igor
          </Footer>
        </Layout>
      </Layout>
    </HashRouter>
  )
}
