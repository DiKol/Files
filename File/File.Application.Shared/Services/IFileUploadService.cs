using Microsoft.AspNetCore.Http;

namespace File.Application.Shared.Services
{
    public interface IFileUploadService
    {
        public bool Upload(IFormCollection formCollection);
    }
}
