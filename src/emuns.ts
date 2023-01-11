export enum ProductCategories {
    BOOK,
    FOOD,
    MEDICAL,
    MUSIC,
    PERFUME
  }
export interface ProductProps {
    id: number;
    isImported: boolean;
    name: string;
    price: number;
    category: number;
    amount: number;
}

export interface PriceProps {
    id: number;
    name: string;
    amount: number;
    total: string;
}


export const salesTaxExceptionCategoris: number[] = [ProductCategories['BOOK'], ProductCategories['FOOD'], ProductCategories['MEDICAL']]
export const salesTaxRate: number = 0.1;
export const importDutyRate: number = 0.05;