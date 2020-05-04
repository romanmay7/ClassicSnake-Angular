using AWSServerlessHighScoresAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AWSServerlessHighScoresAPI.Services
{
    public interface IHighScoresService
    {

        public Task<IEnumerable<GameRecord>> GetItemsFromDynamoDB();
        public  Task AddItemToDynamoDB(GameRecord record);

    }
}
