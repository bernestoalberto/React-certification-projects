
interface HeaderProps {
    title: string;
    subtitle?: string;
    src?: string,
    alt?: string
}

function Header({ title, subtitle, src = "/investment-calculator-logo.png", alt = "Investment Calculator Logo" }: HeaderProps) {
    return (
        <header id="header">
            <img
                src={src}
                alt={alt}
            />
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
        </header>
    );
}

export default Header;