using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AWSServerlessHighScoresAPI.Models
{
    [DynamoDBTable("ClassicSnake-HighScores")]
    public class GameRecord
    {
     
        public string Id { get; set; }
        public int Score { get; set; }
        public string PlayerName { get; set; }

        public string Date { get; set; }

    }
}
