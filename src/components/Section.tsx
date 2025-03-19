import React from 'react';

interface SectionProps {
    children?: React.ReactNode;
}

function Section({ title, id,  children, ...props }: SectionProps & { title: string; id: string }) {
    return (
        <section id={id} {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default Section;

