using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
#nullable disable
namespace Core.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName="decimal(18,2)")]
        public decimal Price { get; set; }
        [Required]
        public bool IsDiscount { get; set; }
        [Column(TypeName="decimal(18,2)")]
        public decimal? DiscountPrice { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public string PictureUrl { get; set; }

    }
}