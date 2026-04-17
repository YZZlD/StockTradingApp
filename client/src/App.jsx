
import './App.css'
import Navbar from './components/ui/Navbar/Navbar'
import Landing from './pages/LandingPage/Landing'
import { Routes, Route} from 'react-router-dom'
import StockDetailsPage from './pages/StockDetailsPage/StockDetails'
import Watchlist from './pages/WatchlistPage/Watchlist'
import WatchlistProvider from './contexts/WatchlistProvider'
import PortfolioProvider from './contexts/PortfolioProvider'
import Portfolio from './pages/PortfolioPage/Portfolio'
import Chat from './pages/ChatPage/Chat'

function App() {
  return (
    <>
      <WatchlistProvider>
        <PortfolioProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/stocks/:symbol" element={<StockDetailsPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/chat/:symbol" element={<Chat />} />
          </Routes>
        </PortfolioProvider>
      </WatchlistProvider>
    </>
  )
}

export default App
