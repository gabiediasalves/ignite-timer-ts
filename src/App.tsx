import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default.ts';
import { GlobalStyle } from './styles/global.ts';
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router.tsx';
import { CyclesContextProvider } from './contexts/CyclesContext'


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}