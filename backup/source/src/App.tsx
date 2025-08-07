import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Technology from './pages/Technology';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNewsList from './pages/admin/NewsList';
import AdminNewsCreate from './pages/admin/NewsCreate';
import NewsEdit from './pages/admin/NewsEdit';
import NewsPreview from './pages/admin/NewsPreview';
import Categories from './pages/admin/Categories';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <AuthProvider>
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
            <Route path="/technology" element={
              <>
                <Header />
                <main className="flex-1">
                  <Technology />
                </main>
                <Footer />
              </>
            } />
            <Route path="/news" element={
              <>
                <Header />
                <main className="flex-1">
                  <News />
                </main>
                <Footer />
              </>
            } />
            <Route path="/news/:id" element={
              <>
                <Header />
                <main className="flex-1">
                  <NewsDetail />
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
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="news" element={<AdminNewsList />} />
              <Route path="news/create" element={<AdminNewsCreate />} />
              <Route path="news/edit/:id" element={<NewsEdit />} />
              <Route path="news/preview" element={<NewsPreview />} />
              <Route path="categories" element={<Categories />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  )
}

export default App
