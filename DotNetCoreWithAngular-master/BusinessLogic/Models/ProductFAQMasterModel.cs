using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductFAQMasterModel
    {
        public int ProductId { get; set; }
        public int FAQId { get; set; }
        public string ProductName { get; set; }
        public string FAQQuestion { get; set; }
        public string FAQAnswer { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? LoginUserID { get; set; }
        public int? IsCompanyFlag { get; set; } 
        public int? op { get; set; }
        public int? IsAssigned { get; set; }
        public List<FAQData> faqData { get; set; }
        public ProductFAQMasterModel()
        {
            faqData = new List<FAQData>();
        }
    }
    public class ProductFAQMasterModelVM
    {
        public int? FAQId { get; set; }
        public int? ProductId { get; set; }
        public string FAQQuestion { get; set; }
        public string FAQAnswer { get; set; }
        public int? CompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public int? LoginUserID { get; set; }
        public int? op { get; set; }
        public int? IsCompanyFlag { get; set; }

    }
    public class FAQData
    {
        public int id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
    }
}
