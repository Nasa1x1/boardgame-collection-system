namespace Domain
{
    public class BoardGame
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int MaxPlayers { get; set; }
        public int MinPlayers { get; set; }
        public ICollection<BoardGameOwner> BoardGameOwners { get; set; } = new List<BoardGameOwner>();
        
        
    }
}