using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>_mediator??=HttpContext.RequestServices.GetService<IMediator>();
        
        // Metoda odpowiedzialna za obsługę wyników operacji (Result<T>).
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result ==null) return NotFound(); // Jeśli wynik jest pusty, zwracamy odpowiedź NotFound (404).
            
            // Jeśli operacja zakończyła się sukcesem i wynik nie jest pusty, zwracamy status 200 z wynikiem.
            if(result.IsSuccess && result.Value !=null)
                {
                    return Ok(result.Value);
                }
            // Jeśli operacja zakończyła się sukcesem, ale wynik jest pusty, zwracamy NotFound.
            if(result.IsSuccess && result.Value ==null)
                {
                    return NotFound();
                }
            // Jeśli operacja się nie powiodła, zwracamy odpowiedź z błędem (BadRequest).
            return BadRequest(result.Error);
        }
    }
}