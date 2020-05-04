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
        public async Task<IActionResult> AddNewRecord(GameRecord model)
        {
            if (ModelState.IsValid)
            {
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