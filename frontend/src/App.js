import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import './App.css';
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
 
    <>
    <Toaster />
    <div>
      <Header />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh - 4rem)]"> {/* Adjusted min-h value */}
        <Outlet />
      </main>
    </div>
  </>
  );
}

export default App;
