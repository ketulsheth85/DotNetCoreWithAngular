using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductSubCatMasterModel
    {
        public int ProductSubCatMasterId { get; set; }
        public int ProductId { get; set; }
        public int ProductCategoryId { get; set; }
        public int ProductSubCategoryId { get; set; }
        public int CompanyId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

    }

    public class ProductSubCatMasterModelVM
    {
        public DataTable dt { get; set; }
        public int ProductId { get; set; }
        public int ProductCategoryId { get; set; }
        public int Op { get; set; }
    }
}
