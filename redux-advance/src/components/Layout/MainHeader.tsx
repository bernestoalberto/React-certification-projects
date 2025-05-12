import CartButton from '../Cart/CartButton.tsx';
import classes from './MainHeader.module.css';
import uiActions from '../../store/ui-toggle.ts';
import { useDispatch } from 'react-redux';

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const toggleShoppingCartModal = () => {
    dispatch(uiActions.actions.toggle());
  }

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={toggleShoppingCartModal} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
