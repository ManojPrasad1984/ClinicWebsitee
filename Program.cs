var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve index.html at root ( / )
app.UseDefaultFiles();

// Serve all static files from wwwroot/
app.UseStaticFiles();

app.Run();
