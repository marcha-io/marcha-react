import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './home/Home'
import Navbar from './navbar/Navbar'

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <Content>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
