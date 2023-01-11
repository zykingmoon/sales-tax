// Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt. Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.
// When I purchase items I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
// Write an application that prints out the receipt details for these shopping baskets...

// OUTPUT

// Output 1:

// 1 book : 12.49
// 1 music CD: 16.49
// 1 chocolate bar: 0.85
// Sales Taxes: 1.50
// Total: 29.83

// Output 2:

// 1 imported box of chocolates: 10.50
// 1 imported bottle of perfume: 54.65
// Sales Taxes: 7.65
// Total: 65.15

// Output 3:

// 1 imported bottle of perfume: 32.19
// 1 bottle of perfume: 20.89
// 1 packet of headache pills: 9.75
// 1 imported box of chocolates: 11.85
// Sales Taxes: 6.70
// Total: 74.68

import React, { useState, useEffect } from 'react';
import { ProductProps, PriceProps, salesTaxExceptionCategoris, salesTaxRate, importDutyRate } from './emuns';
import './sales-tax.css';
/**
 * The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
 *
 * @param {string} tax 未取整的税额
 * @return {number} 取整后税额
 */
const roundToPercent5 = (tax: string): number => {
  const start: number = Number(tax.replace(/\d$/, '0'));
  const end: number = Number((start + 0.1).toFixed(2));
  const pivot: number = Math.round((start + end) / 2 * 100);
  const newTax: number = Math.round(Number(tax) * 100);

  var delta = Math.round(pivot - newTax);
  console.log('roundToPercent5', start, end, pivot, tax, delta)
  if (delta === 5) {
      return newTax / 100;
  }
  else if (delta >= 0) {
      return pivot / 100;
  }
  else {
      return end;
  }
};

interface PriceDetailProps {
  goods: ProductProps[];
}
const PriceDetails: React.FC<PriceDetailProps> = ({ goods }) => {
  const [totalCost, setTotalCost] = useState<string>('');
  const [totalTax, setTotalTax] = useState<string>('');
  const [priceItems, setPriceItems] = useState<PriceProps[]>([]);

  useEffect(() => {
    let totalCost:number = 0;
    let totalTax:number = 0;
    let details:PriceProps[] = [];
    for (let i=0; i<goods.length; i++) {
        const good = goods[i];
        const importDuty: number = good.isImported ? importDutyRate * good.price : 0;
        const salesTax: number = salesTaxExceptionCategoris.includes(good.category) ? 0 : salesTaxRate * good.price;
        const goodTax: number = roundToPercent5(((importDuty + salesTax) * good.amount).toFixed(2));
        const goodTotal: string = (goodTax + good.price * good.amount).toFixed(2);
        totalTax += Number(goodTax.toFixed(2));
        totalCost += Number(goodTotal);
        details.push({
          id: good.id,
          name: good.name,
          amount: good.amount,
          total: goodTotal
        })
        console.log('item', good.name, good.price, goodTax, goodTotal)
    }
    setPriceItems(details);
    setTotalTax(totalTax.toFixed(2));
    setTotalCost(totalCost.toFixed(2));
  }, [goods])
  
  return (
    <div className="priceDetails">
      {
        priceItems.map((item: PriceProps) => 
          <div key={item.id} className="priceItem">
            <div className='itemTitle'>{item.amount} {item.name}: </div>
            <div className='itemPrice'>{item.total}</div>
          </div>
        )
      }
      <div className="priceTax">
        <div className='itemTitle'>Sales Taxes: </div>
        <div className='itemPrice'>{totalTax}</div>
      </div>
      <div className="priceTotal">
        <div className='itemTitle'>Total: </div>
        <div className='itemPrice'>{totalCost}</div>
      </div>
  </div>);
}

export default PriceDetails;
