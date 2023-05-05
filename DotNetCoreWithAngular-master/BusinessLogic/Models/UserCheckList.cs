using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
    public class UserCheckList
    {
        public int UserCheckListId { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public int CheckListId { get; set; }
        public int CheckListAns { get; set; }
        public int ProductId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Comments { get; set; }
        public int IsSubmited { get; set; }
        public int op { get; set; }
    }
    public class UserCheckListVM
    {
        public int UserCheckListId { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public int CheckListId { get; set; }
        public int SectionId { get; set; }
        public int QuestionId { get; set; }
        public int CheckListAns { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ProductId { get; set; }
        public string Comments { get; set; }
        public int op { get; set; }
    }
}
