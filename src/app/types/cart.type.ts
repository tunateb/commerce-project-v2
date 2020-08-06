import { User } from './user.type';
import { Product } from './product.type';

export type Cart = {
    id: number;
    user: User | number;
    products: Product[];
    created_at?: string;
    updated_at?: string;
}