import { Routes } from '@angular/router';
import { CompanymasterComponent } from './companymaster/companymaster.component'
import { CompanyformComponent } from './companymaster/companyform/companyform.component'
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UserformComponent } from './usermaster/userform/userform.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { ProductmasterformComponent } from './productmaster/productmasterform/productmasterform.component';
import { ProductvideoComponent } from './productvideo/productvideo.component';
import { DocumentcategoryComponent } from './documentcategory/documentcategory.component';
import { ProductdocumentComponent } from './productdocument/productdocument.component';
import { LocationmasterComponent } from './locationmaster/locationmaster.component';
import { UserprofieComponent } from './usermaster/userprofie/userprofie.component';
import { UserprofileeditComponent } from './usermaster/userprofie/userprofileedit/userprofileedit.component';

export const ComponentsRoutes: Routes = [

	{
		path: 'customermaster',
		component: CompanymasterComponent,
		data: {
			title: 'Customer Details',
			urls: [
				{ title: 'customermaster', url: '/customermaster' },
				{ title: 'ngComponent' },
				{ title: 'customermaster' }
			]
		}
	},
	{
		path: 'customerforms',
		component: CompanyformComponent,
		data: {
			title: 'Customer Forms',
			urls: [
				{ title: 'customerforms', url: '/customerforms' },
				{ title: 'ngComponent' },
				{ title: 'customerforms' }
			]
		}
	},
	{
		path: 'customerforms/:id/:flag',
		component: CompanyformComponent,
		data: {
			title: 'Company Forms',
			urls: [
				{ title: 'customerforms', url: '/customerforms/:id/:flag' },
				{ title: 'ngComponent' },
				{ title: 'customerforms' }
			]
		}
	},
	{
		path: 'usermaster',
		component: UsermasterComponent,
		data: {
			title: 'User Details',
			urls: [
				{ title: 'usermaster', url: '/UserMaster' },
				{ title: 'ngComponent' },
				{ title: 'User' }
			]
		}
	},
	{
		path: 'userforms',
		component: UserformComponent,
		data: {
			title: 'User Form',
			urls: [
				{ title: 'userforms', url: '/userforms' },
				{ title: 'ngComponent' },
				{ title: 'userforms' }
			]
		}
	},
	{
		path: 'userforms/:id/:recordMode',
		component: UserformComponent,
		data: {
			title: 'User Form',
			urls: [
				{ title: 'userforms', url: '/userforms/:id/:recordMode' },
				{ title: 'ngComponent' },
				{ title: 'userforms' }
			]
		}
	},
	{
		path: 'productcategory',
		component: ProductcategoryComponent,
		data: {
			title: 'Product Category',
			urls: [
				{ title: 'productcategory', url: '/productcategory' },
				{ title: 'ngComponent' },
				{ title: 'productcategory' }
			]
		}
	},
	{
		path: 'productsubcategory',
		component: ProductsubcategoryComponent,
		data: {
			title: 'Product Sub Category',
			urls: [
				{ title: 'productsubcategory', url: '/productsubcategory' },
				{ title: 'ngComponent' },
				{ title: 'productsubcategory' }
			]
		}
	},
	{
		path: 'productmaster',
		component: ProductmasterComponent,
		data: {
			title: 'Product Master',
			urls: [
				{ title: 'productmaster', url: '/productmaster' },
				{ title: 'ngComponent' },
				{ title: 'productmaster' }
			]
		}
	},
	{
		path: 'productmasterform',
		component: ProductmasterformComponent,
		data: {
			title: 'Product Form Master',
			urls: [
				{ title: 'productmasterform', url: '/productmasterform' },
				{ title: 'ngComponent' },
				{ title: 'productmasterform' }
			]
		}
	},
	{
		path: 'productmasterform/:id/:recordMode',
		component: ProductmasterformComponent,
		data: {
			title: 'Product Form Master',
			urls: [
				{ title: 'productmasterform', url: '/productmasterform/:id/:recordMode' },
				{ title: 'ngComponent' },
				{ title: 'productmasterform' }
			]
		}
	},
	{
		path: 'productvideo',
		component: ProductvideoComponent,
		data: {
			title: 'Product Video',
			urls: [
				{ title: 'productvideo', url: '/productvideo' },
				{ title: 'ngComponent' },
				{ title: 'productvideo' }
			]
		}
	},
	{
		path: 'documentcategory',
		component: DocumentcategoryComponent,
		data: {
			title: 'Document Category',
			urls: [
				{ title: 'documentcategory', url: '/documentcategory' },
				{ title: 'ngComponent' },
				{ title: 'documentcategory' }
			]
		}
	}
	,
	{
		path: 'productdocument',
		component: ProductdocumentComponent,
		data: {
			title: 'Product Document',
			urls: [
				{ title: 'productdocument', url: '/productdocument' },
				{ title: 'ngComponent' },
				{ title: 'productdocument' }
			]
		}
	},
	{
		path: 'locationmaster',
		component: LocationmasterComponent,
		data: {
			title: 'Loaction Master',
			urls: [
				{ title: 'locationmaster', url: '/locationmaster' },
				{ title: 'ngComponent' },
				{ title: 'locationmaster' }
			]
		}
	},
	{
		path: 'userprofile',
		component: UserprofieComponent,
		data: {
			title: 'Loaction Master',
			urls: [
				{ title: 'userprofile', url: '/userprofile' },
				{ title: 'ngComponent' },
				{ title: 'userprofile' }
			]
		}
	},
	{
		path: 'userprofileedit',
		component: UserprofileeditComponent,
		data: {
			title: 'Edit Profile',
			urls: [
				{ title: 'userprofileedit', url: '/userprofileedit' },
				{ title: 'ngComponent' },
				{ title: 'userprofileedit' }
			]
		}
	},
];
