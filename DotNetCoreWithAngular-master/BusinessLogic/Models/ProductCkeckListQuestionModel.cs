using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductCheckListQuestionModel
    {
        public int? QuestionId { get; set; }
        public int? CheckListId { get; set; }
        public int? SectionId { get; set; }
        public int? CompanyId { get; set; }
        public string Question { get; set; }
        public int? CretedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int?  UpdatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int Op { get; set; }
        public int? IsAssigned { get; set; }
    }

    public class ProductCheckListQuestionModelVM
    {
        //public int QuestionId { get; set; }
        public int CheckListId { get; set; }
        public int SectionId { get; set; }
        public int CompanyId { get; set; }
        //public string Question { get; set; }
        //public int CretedBy { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public int UpdatedBy { get; set; }
        //public DateTime UpdateDate { get; set; }
        public DataTable dt { get; set; }
        public int Op { get; set; }
    }
}
