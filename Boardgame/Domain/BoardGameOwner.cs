namespace Domain
{
    public class BoardGameOwner
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid BoardGameId { get; set; }
        public BoardGame BoardGame { get; set; }


    }
}