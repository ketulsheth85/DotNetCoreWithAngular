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