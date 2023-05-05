using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Models
{
    public class DocumentCategoryModel
    {
        [Key]
        public int DocumentCatId { get; set; }
        public string DocumentCatName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? IsAssigned { get; set; }

    }
    public class DocumentCategoryModelVM
    {
        public int? DocumentCatId { get; set; }
        public string DocumentCatName { get; set; }
        public int? CompanyId { get; set; }
        public int? isCompanyFlag { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public int? Op { get; set; }
    }
}
