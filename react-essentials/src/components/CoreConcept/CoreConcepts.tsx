import { CORE_CONCEPTS } from '../../data';
import Section from '../Section';
import CoreConcept from './CoreConcept';
import './CoreConcepts.css';
const CoreConcepts = function () {
    return (
              <Section id="core-concepts" title='Core Concepts'>
              <h2>Core Concepts</h2>
              <ul>
                {
                  CORE_CONCEPTS.map((conceptItem) => (
                    <CoreConcept key={conceptItem.title} {...conceptItem} />
                  ))
                }
              </ul>
              </Section>
    );
};

export default CoreConcepts;