export interface ProdectMasterList {
    productId: number,
    productName: string,
    productImage: string,
    qrCode: string,
    description: string
    tag: string,
    serialNo: string,
    productionNo: string,
    productionDate: Date
    warrantyDate: Date
    status: string,
    productCat: string,
    productSubCat: string,
    attributeKey1: string,
    attributeValue1: string,
    attributeKey2: string,
    attributeValue2: string,
    attributeKey3: string,
    attributeValue3: string,
    attributeKey4: string,
    attributeValue4: string,
    attributeKey5: string,
    attributeValue5: string,
    attributeKey6: string,
    attributeValue6: string,
    attributeKey7: string,
    attributeValue7: string,
    attributeKey8: string,
    attributeValue8: string,
    attributeKey9: string,
    attributeValue9: string,
    attributeKey10: string,
    attributeValue10: string,
    companyId: number,
    companyName: string,
    loginUserID: number,
    isActive: number,
    op: number,
    isAssigned: number,
    objProductCat: ProductCat[],
    objrelSubcat : ProductRelation[],
    objrelProduct: ProdectMasterListRelation[],
    relationalProduct: string
}

export interface ProductRelation {
    ProductSubCategoryId: number,
    Name : string
}

export interface ProdectMasterListRelation {
    relationalProductId: number,
    productName : string,
    productImage : string,
    productId : number,
    productionDate : Date,
    productionNo : string
}

export interface ProductCat{
    prodcuctCategoryId:number,
    productCatName:string
}
