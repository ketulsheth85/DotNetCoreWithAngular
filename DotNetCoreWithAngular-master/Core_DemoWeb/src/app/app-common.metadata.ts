import {Time} from '@angular/common';
// export interface AppCommon.metadata {
// }

//clientchecklist
export class Clientchecklist {
    checkListId: number;
    checkListName :string;
    productId: number;
    productName: string;
    isChecked:boolean;
    companyName :string;
    isActive :boolean;
    isDelete:boolean;
    companyId :number;
    createdBy :number;
    createdDate :Date;
    updatedBy :number;
    updatedDate: Date;
    op: number;
    comments: string;
    constructor(data: any) {
        
        data = data || {};
        this.checkListId = data.checkListId;
        this.checkListName = data.checkListName;
        this.productId = data.productId;
        this.productName = data.productName;
        this.isChecked = data.isChecked;
        this.companyName = data.companyName;
        this.isActive = data.isActive;
        this.isDelete = data.isDelete;
        this.createdBy = data.createdBy;
        this.companyId = data.companyId;
        this.createdDate = data.createdDate;
        this.updatedBy = data.updatedBy;
        this.updatedDate = data.updatedDate;
        this.op = data.op;
        this.comments = data.comments;
    }
}

export class options{
    id: number;
    checkListId: number;
    name: string;
    isAnswer:boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.checkListId = data.checkListId;
        this.name = data.name;
        this.isAnswer = data.isAnswer;
        this.selected = false;
    }
}

export class Checklist {
    checkListId: number;
    checkListName :string;
    sectionListModel : SectionListModel[];
    constructor(data: any) {
        
        data = data || {};
        this.checkListId = data.checkListId;
        this.checkListName = data.checkListName;
        this.sectionListModel =[]
        data.sectionListModel.forEach((o:any) => {
            this.sectionListModel.push(new SectionListModel(o));
        });
    }
}
export class SectionListModel{
    sectionId: number;
    sectionName: string;
    questionModels : QuestionModels[];
    constructor(data: any) {
        data = data || {};
        this.sectionId = data.sectionId;
        this.sectionName = data.sectionName;
        this.questionModels =[]
        data.questionModels.forEach((o: any) => {
            this.questionModels.push(new QuestionModels(o));
        });
    }
}
export class QuestionModels{
    questionId: number;
    question: string;
    
    options: options[];
    constructor(data: any){
        data = data || {};
        this.questionId = data.questionId;
        this.question = data.question;
        this.options = [];
        data.options.forEach((o:any) => {
            this.options.push(new options(o));
        });
    }
}
export interface ClientCheckList{

    productId: number;
    ProductName : string;
    CompanyId: number;
    CheckListId: number
    CheckListName: string;
    SectionId: number;
    SectionName: string;
    QuestionId: number;
    Question: string; 
} 

//productdocumentclient
export interface Productdocumentcleint {
    documentCatName: string,
    documentId: number,
    documentCatId: number,
    companyId: number,
    docPath: string,
    docName: string,
    productId: number,
    productName: string,
    docImage:string
}


//companymaster.metadata
export interface CompanyData {
    companyID: number;
    companyName: string;
    companyAdress: string;
    companyPhone: string;
    companyFax: string;
    companyZip: string;
    companyLogo: string;
    companyLogos: any;
    companyCode: string;
    postAddress: string;
    city: string;
    country: string;
    colorCode: string;
    companyEmail: string;
    op:number;
  }

  //documentcategory.metadata
  export interface DocumentcategoryList {
    documentCatId: number;
    documentCatName: string;
    companyId: number;
    companyName: string;
    isActive: boolean;
    isDelete: boolean;
    createdBy: number;
    updatedBy: number;
    op: number;
  }

//locationmaster
  export interface Locationmaster {
    locationId: number,
    locationName: string,
    locationCode: string,
    locationAddress: string,
    city: string,
    zip: string,
    country: string,
    phoneNo: string,
    companyId: number,
    isActive: boolean,
    isDelete: boolean,
    createdBy: number,
    createdDate: Date,
    updatedBy: number,
    updatedDate: Date,
    companyName: string,
    op: number
}

//productcategory.metadata
export interface ProductcategoryList {
    productCategoryID: number;
    productCategotryName: string;
    companyId: number;
    companyName: string;
    isActive: boolean;
    isDelete: boolean;
    createdBy: number;
    updatedBy: number;
    op: number;
  }

//prodcutchecklist.metadata
  export interface ProductCheckListData {
    questionId: number
    checkListId: number
    checkListName: string
    productId: number
    productName: string
    sectionId: number
    SectionName: string
    isChecked: boolean
    companyName: string
    isActive: boolean
    isDelete: boolean
    companyId: number
    createdBy: number
    createdDate: Date
    updatedBy: number
    updatedDate: Date,
    op: number
  }
  
 //productdocument.metadata
  export interface ProductDocumentData{ 
    documentId: number
    docName :string
    documentCatId : number
    documentCategory : string
    docPath : string
    productId: number
    productName: string
    companyName :string
    isActive :boolean
    isDelete:boolean
    companyId :number
    createdBy :number
    createdDate :Date
    updatedBy :number
    updatedDate: Date,
    op: number
}

//productfaqmaster.metadata
export interface ProductFAQMasterData{ 
    fAQId: number
    productId :number
   fAQQuestion : string
    fAQAnswer: string
    productName: string
    companyName :string
    isActive :boolean
    isDelete:boolean
    companyId :number
    createdBy :number
    createdDate :Date
    updatedBy :number
    updatedDate: Date,
    op: number
}

//productmaster.metadata
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

//productsubcategory.metadata
export interface ProdctSubCategoryData{ 
    productSubCategoryId: number
    prodcuctCategoryId: number
    name: string
    companyName :string
    productCategotryName :string
    isActive :boolean
    isDelete:boolean
    companyId :number
    createdBy :number
    createdDate :Date
    updatedBy :number
    updatedDate: Date,
    op: number
}

//productvideo.metadata
export interface ProductVideoData{ 
    videoId: number
    videoName :string
    videoType : string
    videoUrl : string
    productId: number
    productName: string
    companyName :string
    isActive :boolean
    isDelete:boolean
    companyId :number
    createdBy :number
    createdDate :Date
    updatedBy :number
    updatedDate: Date,
    op: number
}

//scheduledata
export interface Scheduledata {
    scheduleId: number;
    productId: number;
    scheduleDate: Date;
    fromTime: Time;
    toTime: Time;
    userId: number;
    priority: number;
    description: string;
    isDelete: number;
    createdBy: number;
    createdDate: number;
    updatedBy: number;
    updatedDate: number;
    companyId: number;
    companyName: string;
  }

  //sectionmaster.metadata
  export interface SectionList {
    sectionID: number;
    SectionName: string;
    companyId: number;
    companyName: string;
    isActive: boolean;
    isDelete: boolean;
    createdBy: number;
    updatedBy: number;
    op: number;
  }
  

  //usermaster.metadata
  export interface UserData {
    userId: number;
    userName: string;
    userEmailId: string;
    lastName: string;
    firstName: string;
    fullName: string;
    companyId: number;
    companyName: string;
    colorCode: string;
    companyLogo: string;
    locationId: number;
    //locationName: string;
    employeeId: number;
    phoneNo: string;
    mobile: string;
    userLocation: string;
    department: string;
    roleId: number;
    roleName: string;
    op: number;
    isCompanyFlag: number;
  }
  export interface RoleData {
    roleId: number;
    roleName: string;
    isActive: string;
    isDelete: string;
  }
  
  export interface DynamicTheme {
    "--background": string;
    "--text-color": string;
  }

  //productassignmentmaster.metadat
  export interface ProductAssignmentMaster{
    AssignmentId: number;
    companyId: string;
    ProductId: string;
    CreatedBy: number;
    CreatedDate: number;
    companyName: string;
    ProductName: string;
  }
  export interface SelectedCompanyList{
      companyID: number;
      companyName: string;
  }