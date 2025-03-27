import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

// screens
import Home from './screens/NewEntry/NewEntry'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import ListOfEntries from './screens/ListOfEntries/ListOfEntries'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomeLayout />} >
        <Route path='/' element={<ListOfEntries />} />
        <Route path="/createEntry" element={<Home />}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
