using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
    public class UserMasterModel
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmailId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string FullName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLogo { get; set; }
        public string ColorCode { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public string EmployeeId { get; set; }
        public string PhoneNo { get; set; }
        public string Mobile { get; set; }
        public string UserLocation { get; set; }
        public string Department { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int LoginUserID { get; set; }
        public string Password { get; set; }
        public int IsCompanyFlag { get; set; }
        public int ParentCompanyID { get; set; }
        public int CompanyLevel { get; set; }
        public string DataStatus { get; set; }
    }

    public class UserMasterModelVM
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmailId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        //public string FullName { get; set; }
        public int CompanyId { get; set; }
        public int LocationId { get; set; }
        public string EmployeeId { get; set; }
        public string PhoneNo { get; set; }
        public string Mobile { get; set; }
        public string UserLocation { get; set; }
        public string Department { get; set; }
        public int RoleId { get; set; }
        public int LoginUserID { get; set; }
        public int IsActive { get; set; }
        public string Password { get; set; }
        public int IsCompanyFlag { get; set; }
        public int Op { get; set; } //1 : INSERT, 2 : UPDATE, 3 : DELETE, 4 : SELECT, 5 : Acitve/InActive
    }
    public class DashboardDataModel
    {
        public int CompanyCount { get; set; }
        public int UserCount { get; set; }
        public int DocumentCatCount { get; set; }
        public int LocationCount { get; set; }
        public int ProductCatCount { get; set; }
        public int CheckListCount { get; set; }
        public int DocumentCount { get; set; }
        public int FAQCount { get; set; }
        public int ProductCount { get; set; }
        public int ProductSubCount { get; set; }
        public int VideoCount { get; set; }
        public int SectionCount { get; set; }
        public int ClientMaintenanceListCount { get; set; }
        public int ScheduleCount { get; set; }
        public int ProductAssignmentCount { get; set; }
        public int MaintenanceListCount { get; set; }
        public int ScheduleCompleteCount { get; set; }
    }
    public class DashboardDataModelPM
    {
        public int CompanyID { get; set; }
        public int UserId { get; set; }
    }
}
