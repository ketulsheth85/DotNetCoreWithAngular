using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductSubCategoryModel
    {
        [Key]
        public int ProductSubCategoryId { get; set; }
        public int ProdcuctCategoryId { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public string ProductCategotryName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CompanyId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? IsAssigned { get; set; }
    }
    public class ProductSubCategoryModelVM
    {
        [Key]
        public int ProductSubCategoryId { get; set; }
        public int ProductCategoryID { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CompanyId { get; set; }
        public int IsCompanyFlag { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int Op { get; set; }
    }
}
