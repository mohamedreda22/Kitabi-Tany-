/*
  Router Component:
  - Sets up routing for the application using `react-router-dom`.
  - Imports:
      - `Router`, `Routes`, and `Route` from `react-router-dom` to define client-side routing.
      - `Suspense` and `lazy` from React to enable lazy loading of components.
  - Lazy Loading:
      - The `Home` component is lazy-loaded, which means it will be loaded only when needed, improving initial load performance.
  - Component Structure:
      - `Suspense` is used to wrap routes with a fallback UI ("Loading .. ") displayed while the  component is being loaded.
  - Export:
      - The `Router` component is exported as default for use in other parts of the app.
*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from 'react'

const Home = lazy(() => import("../../Pages/Home/Home"))

const Router = () => {
    return (
        <Router>
            <Suspense fallback="Loading .. ">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default Router
