import logo from '../assets/quiz-logo.png';


export default function Header() {
    return (
        <header className='header'>
            <img src={logo} />
            <h1 >REACTQUIZ</h1>
        </header>
    );
}