using File.Application.Shared.Services;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;

namespace File.Application.Services
{
    public class FileUploadService : IFileUploadService
    {
        public bool Upload(IFormCollection formCollection)
        {
            var file = formCollection.Files.First();
            var folderName = Path.Combine("Files", "TXT");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
