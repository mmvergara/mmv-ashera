import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "70px", height: "100vh" }}>
        <Routes>
          {<Route path='/' element={<HomePage />} />}
          {<Route path='/tasks' element={<TasksPage />} />}
          {<Route path='/notes' element={<NotesPage />} />}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
