
import { ProductCategories, ProductProps } from './emuns';
import PriceDetails from './sales-tax';

const input1: ProductProps[] = [{
  id: 111,
  isImported: false,
  amount: 1,
  name: 'book',
  price: 12.49,
  category: ProductCategories['BOOK']
}, {
  id: 112,
  isImported: false,
  amount: 1,
  name: 'music CD',
  price: 14.99,
  category: ProductCategories['MUSIC']
}, {
  id: 113,
  isImported: false,
  amount: 1,
  name: 'chocolate bar',
  price: 0.85,
  category: ProductCategories['FOOD']
}];

function App () {
  return (
    <div className="App">
      <PriceDetails goods={input1} />
    </div>
  );
}

export default App;
