using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        // DbSet mapujący gry planszowe
        public DbSet<BoardGame> BoardGames {get;set;}
         // DbSet mapujący relacje między użytkownikami a grami
        public DbSet<BoardGameOwner> BoardGameOwners {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            // Definicja klucza złożonego dla encji BoardGameOwner
            builder.Entity<BoardGameOwner>(x =>x.HasKey(y => new{y.BoardGameId, y.UserId}));
            
             // Konfiguracja relacji: jeden użytkownik może posiadać wiele gier
            builder.Entity<BoardGameOwner>()
            .HasOne(x => x.User)
            .WithMany(y => y.BoardGames)
            .HasForeignKey(z => z.UserId);

            // Konfiguracja relacji: jedna gra może mieć wielu właścicieli
            builder.Entity<BoardGameOwner>()
            .HasOne(x => x.BoardGame)
            .WithMany(y => y.BoardGameOwners)
            .HasForeignKey(z => z.BoardGameId);

        }
    }
}