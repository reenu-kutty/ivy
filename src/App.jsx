import './App.css'
import Header from "./components/Header.jsx";
import Calendar from "./pages/Calendar.jsx";
import DayView from "./pages/DayView.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<><Header/> <Calendar/></>} />
                    <Route path="/day/:date" element={<><Header/><DayView/></>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
