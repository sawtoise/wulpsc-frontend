import './App.css';
import './index.css';
import Main from "./pages/Main.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Gallery from './pages/Gallery.jsx'
import DetailedPhoto from './pages/DetailedPhoto.jsx'

function App() {
    return (
        <div className="App">
        <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes>
                <Route exact path="/main" element = {<Main/>}/>
                <Route exact path="*" element = {<Main/>}/>
                <Route exact path="/gallery" element = {<Gallery/>}/>
                <Route path="/photos/:id" element={<DetailedPhoto />} />
            </Routes>
        </LocalizationProvider>
        </Router>
        </div>
    );
}

export default App;
