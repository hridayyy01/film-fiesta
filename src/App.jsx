import { Footer, Header } from "./components"
import { AppRoutes } from "./routes"
import './App.css'
// import Skeleton from "../components/Skeleton";

function App() {
  return (
    <div className="flex min-h-screen flex-col dark:bg-slate-700">
      <Header />
      <main className="min-h-0 flex-1 pb-20 dark:bg-slate-700">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App


