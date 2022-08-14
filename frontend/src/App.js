import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Signup />} />
					
					<Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
						/>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
