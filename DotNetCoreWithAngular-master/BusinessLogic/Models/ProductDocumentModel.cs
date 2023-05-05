using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductDocumentModel
    {
        [Key]
        public int DocumentId { get; set; }
        public string DocName { get; set; }
        public string DocFileName { get; set; }
        public int DocumentCatId { get; set; }
        public string DocumentCategory { get; set; }
        public string DocPath { get; set; }
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
        public int Op { get; set; }
        public int? IsAssigned { get; set; }
    }
    public class ProductDocumentModelVM
    {
        public int DocumentId { get; set; }
        public string DocName { get; set; }
        public int DocumentCatId { get; set; }
        public string DocPath { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }
        public int IsCompanyFlag { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int Op { get; set; }
    }


    public class ProductDocumentClient
    {
        public string DocumentCatName { get; set; }
        public int DocumentId { get; set; }
        public int DocumentCatId { get; set; }
        public int CompanyId { get; set; }
        public string DocPath { get; set; }
        public string DocName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
    public class ProductDocumentClientPM
    {
        public int ProductId { get; set; }
        public int CompanyId { get; set; }        
    }
}
