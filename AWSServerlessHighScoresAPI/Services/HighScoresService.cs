
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using AWSServerlessHighScoresAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AWSServerlessHighScoresAPI.Services
{
    public class HighScoresService: IHighScoresService
    {
        private IEnumerable<GameRecord> highscores;
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.EUWest1;
        private static AmazonDynamoDBClient client = new AmazonDynamoDBClient(bucketRegion);

        public async Task <IEnumerable<GameRecord>> GetItemsFromDynamoDB()
        {
            DynamoDBContextConfig config = new DynamoDBContextConfig
            {
                ConsistentRead = false,
                Conversion = DynamoDBEntryConversion.V2
            };

            using (DynamoDBContext context = new DynamoDBContext(client, config))
            {
                // you can add scan conditions, or leave empty
                var conditions = new List<ScanCondition>();  
                 highscores = await context.ScanAsync<GameRecord>(conditions).GetRemainingAsync();
            }
            return highscores;
        }

        public async Task AddItemToDynamoDB(GameRecord record)
        {
            DynamoDBContextConfig config = new DynamoDBContextConfig
            {
                ConsistentRead = false,
                Conversion = DynamoDBEntryConversion.V2
            };

            using(DynamoDBContext context=new DynamoDBContext(client,config))
            {
                await context.SaveAsync(record);
            }
            

        }
    }
}
