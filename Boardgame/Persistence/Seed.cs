using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
          

            if(!userManager.Users.Any())
              {

                 var users = new List<User>{
                    new User{DisplayName="Jan", UserName="jan", Email="jan@test.com"},
                    new User{DisplayName="Aleksander", UserName="aleksander", Email="aleksander@test.com"},
                    new User{DisplayName="Teresa", UserName="teresa", Email="tersa@test.com"}

                }; 

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user,"Ps$$w0rd2");
                    await userManager.AddToRoleAsync(user, "Member");
                }
                var adminUser = await userManager.FindByNameAsync("jan");
                if (adminUser != null)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
              }
            
            if (context.BoardGames.Any()) return;
            
            var boardGames = new List<BoardGame>
            {
                new BoardGame
                {
                    Title = "Root",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Root boardgame",
                    Category = "war",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Oath",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Oath boardgame",
                    Category = "war",
                    MaxPlayers = 6,
                    MinPlayers = 1,
                },
               new BoardGame
                {
                    Title = "Scythe",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Scythe boardgame",
                    Category = "war",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Ankh",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Ankh boardgame",
                    Category = "war",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Terraforming Mars",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-4),
                    Description = "Terraforming Mars boardgame",
                    Category = "euro",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Mysthea",
                    ReleaseDate = DateTime.UtcNow.AddMonths(2),
                    Description = "Mysthea boardgame",
                    Category = "war",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Everdell",
                    ReleaseDate = DateTime.UtcNow.AddMonths(4),
                    Description = "Root boardgame",
                    Category = "euro",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Libertaria",
                    ReleaseDate = DateTime.UtcNow.AddMonths(6),
                    Description = "Libertaria boardgame",
                    Category = "euro",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
                new BoardGame
                {
                    Title = "Clank",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Clank boardgame",
                    Category = "deckbuilding",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
               new BoardGame
                {
                    Title = "Clank in space",
                    ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Clank boardgame",
                    Category = "deckbuilding",
                    MaxPlayers = 4,
                    MinPlayers = 1,
                },
            };
            
            await context.BoardGames.AddRangeAsync(boardGames);
            await context.SaveChangesAsync();

            

            

        }
    }
}