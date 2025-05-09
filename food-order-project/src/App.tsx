import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/shoppingCart";
import { CartContextProvider } from "./store/cartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";


function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;