import '../App.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="main-page">FootLiveScores</Link>
            <ul>
                <li>
                    <Link to="/ucl">UCL</Link>
                </li>
                <li>
                    <Link to="/uel">UEL</Link>
                </li>
                <li>
                    <Link to="/epl">EPL</Link>
                </li>
                <li>
                    <Link to="/laliga">La Liga</Link>
                </li>
            </ul>
        </nav>
    );
}