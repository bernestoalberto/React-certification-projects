import './TabButton.css';


export function TabButton({children, isSelected, ...props}: {children: string, isSelected: boolean, onClick: () => void}) {
  return(
  <li>
    <button className={isSelected ? 'active' : ''} {...props}>{children} </button>
  </li>
  );
}