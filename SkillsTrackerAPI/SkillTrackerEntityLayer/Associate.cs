//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SkillTrackerEntityLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class Associate
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Associate()
        {
            this.Associate_Skills = new HashSet<Associate_Skills>();
        }
    
        public long ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Pic { get; set; }
        public Nullable<bool> Status_Green { get; set; }
        public Nullable<bool> Status_Blue { get; set; }
        public Nullable<bool> Status_Red { get; set; }
        public Nullable<bool> Level_1 { get; set; }
        public Nullable<bool> Level_2 { get; set; }
        public Nullable<bool> Level_3 { get; set; }
        public string Remark { get; set; }
        public string Strength { get; set; }
        public string Weakness { get; set; }
        public string Gender { get; set; }
        public string Other_Skills { get; set; }
        public string Associate_ID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Associate_Skills> Associate_Skills { get; set; }
    }
}
