using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class LocationMasterModel
    {
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public string LocationCode { get; set; }
        public string LocationAddress { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string PhoneNo { get; set; }
        public int? CompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string CompanyName { get; set; }
        public int? Op { get; set; }

    }
    public class LocationMasterModelVM
    {
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public string LocationCode { get; set; }
        public string LocationAddress { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string PhoneNo { get; set; }
        public int? CompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public int LoginUserID { get; set; }
        public int? Op { get; set; }
        public int? IsCompanyFlag { get; set; }        

    }
}
