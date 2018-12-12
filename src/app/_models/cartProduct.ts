import { Product } from './product';

export class CartProduct {
	product: Product;
	quantity: number;

	constructor(_product: Product, _quantity: number) {
		this.product = _product;
		this.quantity = _quantity;
	}
}