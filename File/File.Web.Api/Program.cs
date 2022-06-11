using File.Application.Services;
using File.Application.Shared.Services;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

const string policyName = "AllowOrigin";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: policyName,
        builder => {
            builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
        });
});


builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

builder.Services.AddTransient<IFileService, FileService>();
builder.Services.AddTransient<IFileUploadService, FileUploadService>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(policyName);

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Files")),
    RequestPath = new PathString("/Files")
});

app.UseAuthorization();

app.MapControllers();

app.Run();
