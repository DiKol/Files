using File.Application.Shared.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace UploadFilesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IFileUploadService fileUploadService;

        public UploadController(IFileUploadService fileUploadService)
        {
            this.fileUploadService = fileUploadService;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();

                if (fileUploadService.Upload(formCollection))
                {
                    return Ok();
                }
                else {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
