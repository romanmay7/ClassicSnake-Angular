using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AWSServerlessHighScoresAPI.Models;
using AWSServerlessHighScoresAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AWSServerlessHighScoresAPI.Controllers
{
    [Route("api/[controller]")]
    public class HighScoresController : Controller
    {
        private readonly IHighScoresService _highscoresService;
        public HighScoresController(IHighScoresService highscoresService)
        {
            _highscoresService = highscoresService;
        }


        [HttpGet]
        [Route("GetHighScoresList")]
        public  async Task<ActionResult<IEnumerable<GameRecord>>> GetHighScoresList()
        {
            var result = await _highscoresService.GetItemsFromDynamoDB();
            result = result.OrderByDescending(t => t.Score).Take(10);//Top 10 Scores

            return Ok(result);
        }

        [HttpPost]
        [Route("AddNewRecord")]
        public async Task<IActionResult> AddNewRecord([FromBody]GameRecord model)
        {
            if (ModelState.IsValid)
            {
                //Generate Unique ID----------------------------------------------------
                var rfc4122bytes = Convert.FromBase64String("aguidthatIgotonthewire==");
                Array.Reverse(rfc4122bytes, 0, 4);
                Array.Reverse(rfc4122bytes, 4, 2);
                Array.Reverse(rfc4122bytes, 6, 2);
                var guid = new Guid(rfc4122bytes);
                //----------------------------------------------------------------------
                model.Id = guid.ToString(); //assign to model

                await _highscoresService.AddItemToDynamoDB(model);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

    }
}