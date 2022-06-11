using File.Application.Shared.Model;
using File.Application.Shared.Services;

namespace File.Application.Services
{
    public class FileService : IFileService
    {
        public IEnumerable<FileModel> GetFiles()
        {
            var dir = new DirectoryInfo(GetFolder());
            FileInfo[] files = dir.GetFiles();

            return files.Select(x => new FileModel() { Name = x.Name, Size = x.Length });
        }

        public async Task<string> GetFile(string name)
        {
            return await System.IO.File.ReadAllTextAsync(GetPath(name));
        }

        public async Task<bool> CreateFile(string name, string content)
        {
            await System.IO.File.AppendAllTextAsync(GetPath(name), content);

            return true;
        }

        public async Task<bool> UpdateFile(string name, string content)
        {
            await System.IO.File.WriteAllTextAsync(GetPath(name), content);

            return true;
        }

        public bool DeleteFile(string name)
        {
            System.IO.File.Delete(GetPath(name));

            return true;
        }

        private static string GetPath(string name)
        {
            return Path.Combine(GetFolder(), name);
        }

        private static string GetFolder()
        {
            return Path.Combine("Files", "TXT");
        }
    }
}
