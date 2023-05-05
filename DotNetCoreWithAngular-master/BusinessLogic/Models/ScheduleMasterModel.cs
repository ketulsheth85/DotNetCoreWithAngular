using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class ScheduleMasterModel
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int? ScheduleId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? ScheduleDate { get; set; }
       public int? UserId { get; set; }
       public string ProductName { get; set; }
       public string UserName { get; set; }
        public int? Priority { get; set; }
        public string TaskCategorie { get; set; }
        public string Description { get; set; }
        public int? IsDelete { get; set; }
        public string? CreatedUser { get; set; }
        public int? CreatedBy { get; set; }
        public int? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public int? UpdatedDate { get; set; }
        public int? CompanyId { get; set; }
        public int? TaskStatusId { get; set; }
        public string CompanyName { get; set; }
        public string TaskStatus { get; set; }
        public string Solution { get; set; }
    }
    public class ScheduleMasterModelVM
    {
        public int? CustomerId { get; set; }
        public int? ScheduleId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? ScheduleDate { get; set; }
        public int? UserId { get; set; }
        public int? Priority { get; set; }
        public string TaskCategorie { get; set; }
        public string Description { get; set; }
        public int? IsDelete { get; set; }
        public int? LoginUserID { get; set; }
        public int? CompanyId { get; set; }
        public int? TaskStatus { get; set; }
        public string? Solution { get; set; }
        public int? Op { get; set; }

    }
    public class ScheduleModel
    {
        public int? CustomerId { get; set; }
        public int? ScheduleId { get; set; }
        public int? ProductId { get; set; }
        public string ScheduleDate { get; set; }
        public int? UserId { get; set; }
        public int? Priority { get; set; }
        public string TaskCategorie { get; set; }
        public string Description { get; set; }
        public int? IsDelete { get; set; }
        public int? LoginUserID { get; set; }
        public int? CompanyId { get; set; }
        public int? TaskStatus { get; set; }
        public string? Solution { get; set; }
        public int? Op { get; set; }

    }
}
