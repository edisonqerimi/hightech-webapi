#nullable disable
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class ProductCategory:BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}