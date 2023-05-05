using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductCheckListModel
    {
        [Key]
        public int CheckListId { get; set; }
        public string CheckListName { get; set; }
        public bool IsChecked { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int? IsAssigned { get; set; }
        public List<ProductCheckListQuestionModel> Question { get; set; }

        public ProductCheckListModel() {
            Question = new List<ProductCheckListQuestionModel>();
        }
    }
    public class ProductCheckListModelVM
    {
        public int CheckListId { get; set; }
        public string CheckListName { get; set; }
        public bool IsChecked { get; set; }
        public int ProductId { get; set; }
        public int SectionId { get; set; }
        public int CompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int IsCompanyFlag { get; set; }
        public List<ProductCheckListQuestionModel> Question { get; set; }
        public int Op { get; set; }
        
    }
    public class ProductCheckListClientModel
    {
        public int CheckListId { get; set; }
        public string CheckListName { get; set; }
        public bool IsChecked { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<Options> options { get; set; }
        public ProductCheckListClientModel() {
            options = new List<Options>();
        }
        public string comments { get; set; }
    }

    public class ClientCheckListModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CompanyId { get; set; }
        public int CheckListId { get; set; }
        public string CheckListName { get; set; }
        public bool IsChecked { get; set; }
        public int SectionId { get; set; }
        public string SectionName { get; set; }
        public int QuestionId { get; set; }
        public string Question { get; set; }
        //public List<CheckListModel> checkListModels { get; set; }
      
        ////public List<QuestionModel> QuestionModel { get; set; }
        //public ClientCheckListModel()
        //{
        //    checkListModels = new List<CheckListModel>();
        //}
    }
    //public class ClientCheckListFilter
    //{
    //    public List<CheckListModel> checkListModels { get; set; }
    //    public ClientCheckListFilter()
    //    {
    //        checkListModels = new List<CheckListModel>();
    //    }
    //}
    public class ClientCheckListModelVM
    {
        public int CompanyId { get; set; }
        public string CheckListId { get; set; }
        public int ProductId { get; set; }
        public int SectionId { get; set; }
        public int mode { get; set; }
        public int Op { get; set; }

    }
    public class Options
    {
        public int id { get; set; }
        public int checkListId { get; set; }
        public string name { get; set; }
        public bool isAnswer { get; set; }
        public bool selected { get; set; }

    }

    public class CheckListModel
    {
        public int checkListId { get; set; }
        public string checkListName { get; set; }
        public List<SectionListModel> SectionListModel { get; set; }
        public CheckListModel()
        {
            SectionListModel = new List<SectionListModel>();
        }
    }

    public class SectionListModel
    {
        public int sectionId { get; set; }
        public string sectionName { get; set; }
        public List<QuestionModel> questionModels { get; set; }
        public SectionListModel()
        {
            questionModels = new List<QuestionModel>();
        }
    }

    public class QuestionModel
    {
        public int questionId { get; set; }
        public string question { get; set; }
        public string comments { get; set; }
        public List<Options> options { get; set; }
        public QuestionModel()
        {
            options = new List<Options>();
        }
    }

}
