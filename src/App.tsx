import React, { FC, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { AnyAction } from 'redux'

import {
  useAppSelector,
  useAppDispatch,
} from './types/typedDispatch&Selector.types'

import {
  initializeApp,
  showGlobalError,
} from './redux/slices/app-slice/appAsyncActions'

import {
  getInitialized,
  getGlobalError,
} from './redux/slices/app-slice/appSelectors'

import { Layout, theme } from 'antd'

import { SideBar } from './components/SideBar/SideBar'
import { Header } from './components/Header/Header'
import Preloader from './components/common/preloader/preloader'
import ProfilePage from './components/Profile/ProfilePage'
import GlobalErrorMessage from './components/GlobalErrorMessage/GlobalErrorMessage'
import Music from './components/Music/Music'
import News from './components/News/News'
import Settings from './components/Settings/Settings'

import 'antd/dist/reset.css'
import './components/SideBar/SideBar.css'
import './App.css'

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'))
const LoginPage = React.lazy(() => import('./components/Login/LoginPage'))

export const App: FC = () => {
  const { Content, Footer } = Layout
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const setCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const globalError = useAppSelector(getGlobalError)
  const initialized = useAppSelector(getInitialized)

  const dispatch = useAppDispatch()

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
            My network ©2022 Created by Sivakov Igor
          </Footer>
        </Layout>
      </Layout>
    </HashRouter>
  )
}
