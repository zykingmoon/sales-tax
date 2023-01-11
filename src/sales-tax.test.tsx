/* eslint-disable testing-library/await-async-query */

import {create, act} from 'react-test-renderer';
import PriceDetails from "./sales-tax"
import { ProductCategories, ProductProps } from './emuns';


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

const input2: ProductProps[] = [{
  id: 221,
  isImported: true,
  amount: 1,
  name: 'imported box of chocolates',
  price: 10.00,
  category: ProductCategories['FOOD']
}, {
  id: 222,
  isImported: true,
  amount: 1,
  name: 'imported bottle of perfume',
  price: 47.50,
  category: ProductCategories['PERFUME']
}];

const input3: ProductProps[] = [{
  id: 331,
  isImported: true,
  amount: 1,
  name: 'imported bottle of perfume',
  price: 27.99,
  category: ProductCategories['PERFUME']
}, {
  id: 332,
  isImported: false,
  amount: 1,
  name: 'bottle of perfume',
  price: 18.99,
  category: ProductCategories['PERFUME']
}, {
  id: 333,
  isImported: false,
  amount: 1,
  name: 'packet of headache pills',
  price: 9.75,
  category: ProductCategories['MEDICAL']
}, {
  id: 334,
  isImported: true,
  amount: 1,
  name: 'imported box of chocolates',
  price: 11.25,
  category: ProductCategories['FOOD']
}];

it('changes the class when hovered', () => {

  let root; 
  act(() => {
    root = create(<PriceDetails goods={input1} />)
  });

  // 对根元素进行断言
  expect(root.toJSON()).toMatchSnapshot();

  const testInstance = root.root;
  
  // 
  let priceItems = testInstance.findAllByProps({className: "priceItem"});
  expect(priceItems[0].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'book', ': ']);
  expect(priceItems[0].findByProps({className: "itemPrice"}).children).toEqual(['12.49']);
  expect(priceItems[1].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'music CD', ': ']);
  expect(priceItems[1].findByProps({className: "itemPrice"}).children).toEqual(['16.49']);
  expect(priceItems[2].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'chocolate bar', ': ']);
  expect(priceItems[2].findByProps({className: "itemPrice"}).children).toEqual(['0.85']);

  expect(testInstance.findByProps({className: "priceTax"}).findByProps({className: "itemPrice"}).children).toEqual(['1.50']);
  expect(testInstance.findByProps({className: "priceTotal"}).findByProps({className: "itemPrice"}).children).toEqual(['29.83']);

  // 更新 props
  act(() => {
    root.update(<PriceDetails goods={input2} />);
  })
  priceItems = testInstance.findAllByProps({className: "priceItem"});
  expect(priceItems[0].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'imported box of chocolates', ': ']);
  expect(priceItems[0].findByProps({className: "itemPrice"}).children).toEqual(['10.50']);
  expect(priceItems[1].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'imported bottle of perfume', ': ']);
  expect(priceItems[1].findByProps({className: "itemPrice"}).children).toEqual(['54.65']);

  expect(testInstance.findByProps({className: "priceTax"}).findByProps({className: "itemPrice"}).children).toEqual(['7.65']);
  expect(testInstance.findByProps({className: "priceTotal"}).findByProps({className: "itemPrice"}).children).toEqual(['65.15']);


  // 更新 props
  act(() => {
    root.update(<PriceDetails goods={input3} />);
  })
  priceItems = testInstance.findAllByProps({className: "priceItem"});
  expect(priceItems[0].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'imported bottle of perfume', ': ']);
  expect(priceItems[0].findByProps({className: "itemPrice"}).children).toEqual(['32.19']);
  expect(priceItems[1].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'bottle of perfume', ': ']);
  expect(priceItems[1].findByProps({className: "itemPrice"}).children).toEqual(['20.89']);
  expect(priceItems[2].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'packet of headache pills', ': ']);
  expect(priceItems[2].findByProps({className: "itemPrice"}).children).toEqual(['9.75']);
  expect(priceItems[3].findByProps({className: "itemTitle"}).children).toEqual(['1', ' ', 'imported box of chocolates', ': ']);
  expect(priceItems[3].findByProps({className: "itemPrice"}).children).toEqual(['11.85']);

  expect(testInstance.findByProps({className: "priceTax"}).findByProps({className: "itemPrice"}).children).toEqual(['6.70']);
  expect(testInstance.findByProps({className: "priceTotal"}).findByProps({className: "itemPrice"}).children).toEqual(['74.68']);

});

