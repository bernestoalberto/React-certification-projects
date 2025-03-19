import './CoreConcept.css';

interface CoreConceptType {
  title: string;
  description: string;
  image: string;
}

export default function CoreConcept({title, description, image}: CoreConceptType) {
 return (
  <li>
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </li>
 )
}