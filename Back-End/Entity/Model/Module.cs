using Entity.Model;

public class Module : BaseModel
{
    public string name { get; set; }
    public string description { get; set; }
    //public DateTime createddate { get; set; }
    public bool active { get; set; }

    public ICollection<FormModule> FormModules { get; set; }

}