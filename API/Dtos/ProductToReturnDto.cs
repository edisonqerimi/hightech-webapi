using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductToReturnDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool IsDiscount { get; set; }
        public decimal? DiscountPrice { get; set; }
        public int Amount { get; set; }
        public string PictureUrl { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; }
        public string ProductCategory { get; set; }
        public int ProductBrandId { get; set; }
        public string ProductBrand { get; set; }
    }
}