using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductAssignmentMasterModel
    {
        public int? AssignmentId { get; set; }
        public string? CompanyId { get; set; }
        public string? ProductId { get; set; }
        public int? CreatedCompanyId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CompanyName { get; set; }
        public string ProductName { get; set; }

    }

    public class ProductAssignmentMasterModelVM
    {
        public DataTable dt { get; set; }
        public string CompanyIds { get; set; }
        public int Op { get; set; }
    }
}
