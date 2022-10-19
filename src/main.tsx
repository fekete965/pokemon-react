import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { FavouritesProvider } from 'context/FavouritesContext'

import { router } from './router'
import './styles/app.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <RouterProvider router={router} />
      </FavouritesProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
