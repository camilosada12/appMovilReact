using System;
using Microsoft.EntityFrameworkCore;
using Entity.Model;

namespace Entity.DataInit
{
    public static class UserDataInit
    {
        public static void SeedUser(this ModelBuilder modelBuilder) // corregí SeetUser a SeedUser
        {
            modelBuilder.Entity<User>().HasData(
                 new User
                 {
                     id = 1,
                     username = "camilosada12",
                     email = "camiloandreslosada901@gmail.com",
                     password = "admin123",
                     active = true,
                     isdeleted = false,
                     personid = 1 // Relación con Person id 1
                 },
                 new User
                 {
                     id = 2,
                     username = "sara12312",
                     email = "sarita@gmail.com",
                     password = "sara12312",
                     active = true,
                     isdeleted = false,
                     personid = 2 // Relación con Person id 2
                 }
            );
        }
    }
}
