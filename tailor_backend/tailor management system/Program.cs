var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<tailor_management_system.Data.CustomerData>();
builder.Services.AddSingleton<tailor_management_system.Data.TailorData>();
builder.Services.AddSingleton<tailor_management_system.Data.OrderData>();
builder.Services.AddSingleton<tailor_management_system.Data.MeasurementData>();
//builder.Services.AddSingleton<tailor_management_system.Data.PaymentData>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.EnableTryItOutByDefault();
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();
