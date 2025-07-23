/////////////////////////////////////////////
//Dépendances
import { Routes, Route } from "react-router-dom";

/////////////////////////////////////////////
//Components
import ScrollToTop from "./utils/ScrollToTop";
// import ProtectedRoute from "./utils/ProtectedRoute";

// import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Setup from "./pages/Setup";

import Summarize from "./pages/Summarize";


// import Page404 from "./pages/Page404";
// import Notification from "./components/Notification";

//////////////////////////////////////////////////////////////////////////////////////////


export default function App() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      {/* <Notification /> */}

      <div className="flex flex-col flex-grow">
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>


            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />

            <Route path="/summarize" element={<Summarize />} />

            {/* <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } /> */}


            {/* <Route path="*" element={<Page404 />} /> */}

          </Routes>
        </main>
      </div>
    </div>
  );
}