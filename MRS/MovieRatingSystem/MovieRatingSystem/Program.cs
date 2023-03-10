using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MovieRatingSystem.Models;
using MovieRatingSystem.Profiles;
using Swashbuckle.AspNetCore.Filters;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
//builder.Services.AddDbContext<MovieRatingDbContext>(opt => opt.UseSqlServer("name=ConnectionStrings:MovieRatingSystemDbConnection"));
builder.Services.AddDbContext<MovieRatingDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("MovieRatingSystemDbConnection")));
builder.Services.AddScoped<IAuthRepo,AuthRepo>();
builder.Services.AddScoped<IAdminAuthRepo,AdminAuthRepo>();
builder.Services.AddAutoMapper(typeof(AdminProfile));
builder.Services.AddAutoMapper(typeof(UserProfile));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts => {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c => {
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = """Standard Authorization using Bearer scheme. Example: bearer <token>""",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
