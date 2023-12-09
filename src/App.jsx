import './App.css';
import './index.css';
import Main from "./pages/Main.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <Main></Main>
            </div>
        </LocalizationProvider>
    );
}

export default App;
