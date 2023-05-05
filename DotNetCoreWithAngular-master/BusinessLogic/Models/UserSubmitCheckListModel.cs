using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class UserSubmitCheckListModel
    {
        public int UserId { get; set; }
        public int CheckListId { get; set; }
        public string CheckListName { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public string Comments { get; set; }
        public int CheckListAns { get; set; }
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public string UserName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
    public class UserSubmitCheckListModelVM
    {
        public int? CompanyId { get; set; }
        public int? UserId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? Op { get; set; }

    }
}
