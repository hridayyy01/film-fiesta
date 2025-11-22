import { Footer, Header } from "./components"
import { AppRoutes } from "./routes"
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="dark:bg-slate-700">
        <AppRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App


