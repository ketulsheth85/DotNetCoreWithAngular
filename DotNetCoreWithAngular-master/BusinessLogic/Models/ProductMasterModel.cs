using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
    public class ProductMasterModel
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public string ProductImageName { get; set; }
        public string QrCode { get; set; }
        public string Description { get; set; }
        public string Tag { get; set; }
        public string SerialNo { get; set; }
        public string ProductionNo { get; set; }
        public DateTime? ProductionDate { get; set; }
        public DateTime? WarrantyDate { get; set; }
        public string Status { get; set; }
        public int ProductCat { get; set; }
        public string ProductSubCat { get; set; }
        public string AttributeKey1 { get; set; }
        public string AttributeValue1 { get; set; }
        public string AttributeKey2 { get; set; }
        public string AttributeValue2 { get; set; }
        public string AttributeKey3 { get; set; }
        public string AttributeValue3 { get; set; }
        public string AttributeKey4 { get; set; }
        public string AttributeValue4 { get; set; }
        public string AttributeKey5 { get; set; }
        public string AttributeValue5 { get; set; }
        public string AttributeKey6 { get; set; }
        public string AttributeValue6 { get; set; }
        public string AttributeKey7 { get; set; }
        public string AttributeValue7 { get; set; }
        public string AttributeKey8 { get; set; }
        public string AttributeValue8 { get; set; }
        public string AttributeKey9 { get; set; }
        public string AttributeValue9 { get; set; }
        public string AttributeKey10 { get; set; }
        public string AttributeValue10 { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public int LoginUserID { get; set; }
        public int IsActive { get; set; }
        public int Op { get; set; }
        public int? IsAssigned { get; set; }
        public List<ProductRelation> objrelSubcat { get; set; }
        public List<ProductCat> objProductCat { get; set; }
        public List<ProdectMasterListRelation> objrelProduct { get; set; }
        public string relationalProduct { get; set; }

        public ProductMasterModel()
        {
            objrelSubcat = new List<ProductRelation>();
            objProductCat = new List<ProductCat>();
            objrelProduct = new List<ProdectMasterListRelation>();

        }

    }

    public class ProductRelation
    {
        public int ProductSubCategoryId { get; set; }
        public string Name { get; set; }
    }

    public class ProductCat
    {
        public int ProdcuctCategoryId { get; set; }
        public string ProductCatName { get; set; }

    }

    public class ProdectMasterListRelation
    {
        public int RelationalProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int ProductId { get; set; }
        public DateTime ProductionDate { get; set; }
        public string ProductionNo { get; set; }

    }

    public class ProductMasterModelVM
    {
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImage { get; set; }
        public string? QrCode { get; set; }
        public string? Description { get; set; }
        public string? Tag { get; set; }
        public string? SerialNo { get; set; }
        public string? ProductionNo { get; set; }
        public DateTime? ProductionDate { get; set; }
        public DateTime? WarrantyDate { get; set; }
        public string? Status { get; set; }
        public int? ProductCat { get; set; }
        public string? ProductSubCat { get; set; }
        public string? AttributeKey1 { get; set; }
        public string? AttributeValue1 { get; set; }
        public string? AttributeKey2 { get; set; }
        public string? AttributeValue2 { get; set; }
        public string? AttributeKey3 { get; set; }
        public string? AttributeValue3 { get; set; }
        public string? AttributeKey4 { get; set; }
        public string? AttributeValue4 { get; set; }
        public string? AttributeKey5 { get; set; }
        public string? AttributeValue5 { get; set; }
        public string? AttributeKey6 { get; set; }
        public string? AttributeValue6 { get; set; }
        public string? AttributeKey7 { get; set; }
        public string? AttributeValue7 { get; set; }
        public string? AttributeKey8 { get; set; }
        public string? AttributeValue8 { get; set; }
        public string? AttributeKey9 { get; set; }
        public string? AttributeValue9 { get; set; }
        public string? AttributeKey10 { get; set; }
        public string? AttributeValue10 { get; set; }
        public int? CompanyId { get; set; }
        public int? IsCompanyFlag { get; set; }
        public int? LoginUserID { get; set; }
        public int? IsActive { get; set; }
        public string? subCatIds { get; set; }
        public int? Op { get; set; } //1 : INSERT, 2 : UPDATE, 3 : DELETE, 4 : SELECT, 5 : Acitve/InActive
    }
}
