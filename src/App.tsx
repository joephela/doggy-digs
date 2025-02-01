import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainLayout } from './MainLayout'
import { Home } from './routes/Home'
import { Search } from './routes/Search'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Error } from './routes/Error'
import './App.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

function App() {
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      children: [
        {
          Component: Home,
          index: true,
          path: '/',
        },
        {
          Component: Search,
          path: '/search',
        },
        {
          Component: Error,
          path: '*',
        },
      ],
      element: <MainLayout />,
      path: '/',
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="grass">
        <RouterProvider router={router} />
      </Theme>
    </QueryClientProvider>
  )
}

export default App
