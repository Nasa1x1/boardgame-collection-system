namespace Application.BoardGames
{
    public class BoardGameOwnerDto
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public Guid BoardGameId { get; set; }
       
    }
}