export default function Button({ children, onClick, className = 'button', textOnly = false, ...props }: { children: string, textOnly: boolean, className: string, onClick?: () => void }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return (
        <button className={cssClasses} {...props} onClick={onClick}>
            {children}
        </button>
    );
}