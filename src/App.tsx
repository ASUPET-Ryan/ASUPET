import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import UserCenter from './pages/UserCenter';
import ProductTechnology from './pages/ProductTechnology';
import Products from './pages/Products';
import Technology from './pages/Technology';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cats from './pages/Cats';
import Dogs from './pages/Dogs';
import NutritionGuide from './pages/NutritionGuide';
import FeedingReport from './pages/FeedingReport';


function App() {
  return (
    <div className="min-h-screen bg-white">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Header />
                <main className="flex-1">
                  <Home />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <main className="flex-1">
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Header />
                <main className="flex-1">
                  <Products />
                </main>
                <Footer />
              </>
            } />

            <Route path="/user-center" element={
              <>
                <Header />
                <main className="flex-1">
                  <UserCenter />
                </main>
                <Footer />
              </>
            } />
            <Route path="/feeding-report/:petId" element={
              <>
                <Header />
                <main className="flex-1">
                  <FeedingReport />
                </main>
                <Footer />
              </>
            } />
            <Route path="/technology" element={
              <>
                <Header />
                <main className="flex-1">
                  <Technology />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cats" element={
              <>
                <Header />
                <main className="flex-1">
                  <Cats />
                </main>
                <Footer />
              </>
            } />
            <Route path="/dogs" element={
              <>
                <Header />
                <main className="flex-1">
                  <Dogs />
                </main>
                <Footer />
              </>
            } />
            <Route path="/nutrition-guide" element={
              <>
                <Header />
                <main className="flex-1">
                  <NutritionGuide />
                </main>
                <Footer />
              </>
            } />

            <Route path="/contact" element={
              <>
                <Header />
                <main className="flex-1">
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/privacy" element={
              <>
                <Header />
                <main className="flex-1">
                  <Privacy />
                </main>
                <Footer />
              </>
            } />
            <Route path="/terms" element={
              <>
                <Header />
                <main className="flex-1">
                  <Terms />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </Suspense>
    </div>
  )
}

export default App
