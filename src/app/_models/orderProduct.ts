export class OrderProduct {
	product_id: string;
	product_name: string;
	product_category_id: string;
	product_price: number;
	quantity: number;

	constructor(_product_id: string, product_name: string, _product_category_id: string, _product_price: number, _quantity: number) {
		this.product_id = _product_id;
		this.product_name = product_name;
		this.product_category_id = _product_category_id;
		this.product_price = _product_price;
		this.quantity = _quantity;
	}
}