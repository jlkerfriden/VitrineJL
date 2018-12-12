import { OrderProduct } from './orderProduct';
import { OrderStatus } from './orderStatus';

export class Order {
	user_id: string;
	orderProducts: OrderProduct[];
	time: number;
	orderStatus: OrderStatus;
	totalPrice: number;

	constructor(_user_id: string, _orderProducts: OrderProduct[], _time: number, _orderStatus: OrderStatus, _totalPrice: number) {
		this.user_id = _user_id;
		this.orderProducts = _orderProducts;
		this.time = _time;
		this.orderStatus = _orderStatus;
		this.totalPrice = _totalPrice;
	}
}