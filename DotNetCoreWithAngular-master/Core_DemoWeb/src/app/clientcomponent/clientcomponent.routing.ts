import { Routes, RouterModule } from '@angular/router';
import { ProductdocumentComponent } from './productdocument/productdocument.component';
import { ProductvideoComponent } from './productvideo/productvideo.component';
import { ProductComponent } from './product/product.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
export const ClientcomponentRoutes: Routes = [
	{
		path: 'searchproduct',
		component: SearchproductComponent,
		data: {
			title: 'Company Details',
			urls: [
				{ title: 'searchproduct', url: '/searchproduct' },
				{ title: 'ngComponent' },
				{ title: 'searchproduct' }
			]
		}
	},
	{
		path: 'product',
		component: ProductComponent,
		data: {
			title: 'Product Details',
			urls: [
				{ title: 'product', url: '/product' },
				{ title: 'ngComponent' },
				{ title: 'product' }
			]
		}
	},
	{
		path: 'product/:id',
		component: ProductComponent,
		data: {
			title: 'Product Details',
			urls: [
				{ title: 'product', url: '/product/:id' },
				{ title: 'ngComponent' },
				{ title: 'product' }
			]
		}
	},
	{
		path: 'video',
		component: ProductvideoComponent,
		data: {
			title: 'Product Video',
			urls: [
				{ title: 'video', url: '/video' },
				{ title: 'ngComponent' },
				{ title: 'video' }
			]
		}
	},
	{
		path: 'document',
		component: ProductdocumentComponent,
		data: {
			title: 'Product Document',
			urls: [
				{ title: 'document', url: '/document' },
				{ title: 'ngComponent' },
				{ title: 'document' }
			]
		}
	},
	{
		path: 'myaccount',
		component: MyaccountComponent,
		data: {
			title: 'My Account',
			urls: [
				{ title: 'myaccount', url: '/myaccount' },
				{ title: 'ngComponent' },
				{ title: 'myaccount' }
			]
		}
	},
];


