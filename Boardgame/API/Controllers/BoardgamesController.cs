using System.Security.Claims;
using Application.BoardGames;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BoardgamesController : BaseApiController
    {
        // Akcja odpowiedzialna za pobieranie listy wszystkich gier planszowych
        [HttpGet] 
            public async Task<IActionResult> GetBoardgames()
            {
                return HandleResult(await Mediator.Send(new List.Query()));
            }
       
         // Akcja odpowiedzialna za pobieranie szczegółów pojedynczej gry na podstawie jej ID
        [HttpGet("{id}")]
            public async Task<IActionResult> GetBoardgame(Guid id)
            {
                return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
            }
        
        // Akcja do tworzenia nowej gry, dostępna tylko dla użytkowników z rolą "Admin"
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateBoardGame(BoardGame boardGame)
        {
            return HandleResult(await Mediator.Send(new Create.Command{BoardGame = boardGame}));

        }
        
        // Akcja do edycji istniejącej gry na podstawie jej ID, tylko dla Administratorów
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBoardGame(Guid id, BoardGame boardGame)
        {
            boardGame.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{BoardGame = boardGame}));
        }
        
        // Akcja do usunięcia gry, dostępna tylko dla administratorów
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardGame(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        // Akcja do dodawania lusb usuwania gry z kolekcji przez zalogowanego użytkownika
        [HttpPost("{id}/own")]
        public async Task<IActionResult> Own(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return HandleResult(await Mediator.Send(new UpdateOwning.Command{Id = id, UserId = userId}));
        }
    }       

}