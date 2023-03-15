using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace core_react.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get(string occupation, string age, string sumInsured)
    {

        int dsi = Int32.Parse(sumInsured);

        int person_age = Int32.Parse(age);

        float rating = 0;
        switch (occupation)
        {
            case "Cleaner":
                rating = 1.50F;
                break;
            case "Doctor":
                rating = 1.0F;
                break;
            case "Author":
                rating = 1.25F;
                break;
            case "Farmer":
                rating = 1.75F;
                break;
            case "Mechanic":
                rating = 1.75F;
                break;
            case "Florist":
                rating = 1.50F;
                break;
        }

        var result = new
        {
            amount = (((dsi * rating * person_age)/1000) * 12),
            tpdAmount = (((dsi * rating * person_age)/1234))
        };

        return Ok(result);

        
    }

}