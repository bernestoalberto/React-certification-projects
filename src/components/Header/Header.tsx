import './Header.css';
import reactIm from '../../assets/react-core-concepts.png';
const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}



export default function Header() {
  const description = reactDescriptions[genRandomInt(2)];
  return (
    <header>
      <img src={reactIm} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are going to build!
      </p>
    </header>
  );
}