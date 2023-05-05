using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLogic.Models
{
    public class ProductVideoModel
    {
        [Key]
        public int VideoId { get; set; }
        public string VideoName { get; set; }
        public string VideoFileName { get; set; }
        public string VideoType { get; set; }
        public string VideoUrl { get; set; }
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
    public class ProductVideoModelVM
    {
        public int VideoId { get; set; }
        public string VideoName { get; set; }
        public string VideoType { get; set; }
        public string VideoUrl { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }
        public int IsCompanyFlag { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int Op { get; set; }
    }
}
