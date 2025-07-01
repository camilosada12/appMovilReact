
using Web.Service_Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddProjectDependencies();

// Injectamos Automapper
builder.Services.AddAutoMapperConfiguration();

// Injectamos Repository
builder.Services.AddRepositories();

// injectamos CORS
builder.Services.AddCorsPolicy(builder.Configuration);

// injectamos  JWT
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddAuthorization();

// Injectamos la Base de Datos
builder.Services.AddDatabaseFactory(builder.Configuration);

var app = builder.Build();




// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilitar HTTPS Redirection si lo necesitas
app.UseHttpsRedirection();

// Usar CORS
app.UseCors("PoliticaCors");

// Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Rutas
app.MapControllers();

app.Run();
