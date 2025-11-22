import { Footer, Header } from "./components"
import { AppRoutes } from "./routes"

function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App
