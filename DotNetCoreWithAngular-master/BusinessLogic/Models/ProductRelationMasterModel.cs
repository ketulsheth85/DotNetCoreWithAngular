using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductRelationMasterModel
    {
        [Key]
        public int ProductRelationId { get; set;}
        public int ProductId { get; set; }
        public int RelationalProductId { get; set; }
        public int CompanyId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class ProductRelationMasterModelVM
    {
        //[Key]
        //public int ProductRelationId { get; set; }
        
        //public int RelationalProductId { get; set; }
        //public int CompanyId { get; set; }
        //public int CreatedBy { get; set; }
        //public int UpdatedBy { get; set; }
        public DataTable dt { get; set; }
        public int ProductId { get; set; }
        public int op { get; set; }
    }
}
