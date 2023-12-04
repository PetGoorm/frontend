import './App.css';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { RecoilRoot } from 'recoil';

function App() {


  return (

    <div>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </div>

  );
}

export default App;
