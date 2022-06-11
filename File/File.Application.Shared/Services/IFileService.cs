using File.Application.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace File.Application.Shared.Services
{
    public interface IFileService
    {
        public IEnumerable<FileModel> GetFiles();
        public Task<string> GetFile(string name);
        public Task<bool> CreateFile(string name, string content);
        public Task<bool> UpdateFile(string name, string content);
        public bool DeleteFile(string name);

    }
}
