using File.Application.Shared.Model;
using File.Application.Shared.Services;
using Microsoft.AspNetCore.Mvc;

namespace UploadFilesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService fileService;

        public FileController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        [HttpGet]
        public IEnumerable<FileModel> Get()
        {
            return fileService.GetFiles();
        }

        [HttpGet("{name}")]
        public async Task<string> GetByName(string name)
        {
          return await fileService.GetFile(name);
        }

        [HttpPost]
        public async Task<bool> Create(FileModel file)
        {
            return await fileService.CreateFile(file.Name, file.Content);
        }

        [HttpPut]
        public async Task<bool> Update(FileModel file)
        {
            return await fileService.UpdateFile(file.Name, file.Content);
        }

        [HttpDelete("{name}")]
        public void Delete(string name)
        {
            fileService.DeleteFile(name);
        }

    }
}
