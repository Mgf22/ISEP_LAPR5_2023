using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RobDroneGO.Infrastructure;
using RobDroneGO.Infrastructure.Roles;
using RobDroneGO.Infrastructure.Users;
using RobDroneGO.Infrastructure.Pedidos;
using RobDroneGO.Infrastructure.Shared;
using RobDroneGO.Domain.Shared;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RobDroneGO.Domain.Roles;
using RobDroneGO.Domain.Users;
using Microsoft.Extensions.Logging;
using RobDroneGO.Domain.Pedidos;


namespace RobDroneGO
{
    public class Startup
    {
        static string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("Cors",
            builder =>
            {
                builder.
                AllowAnyOrigin().
                AllowAnyMethod().
                AllowAnyHeader();
            }));
            /*services.AddDbContext<RobDroneGODbContext>(opt =>
                opt.UseInMemoryDatabase("RobDroneGODB")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
*/
            services.AddDbContext<RobDroneGODbContext>(opt =>
            {
                opt.UseMySQL(Configuration.GetConnectionString("Default"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()
                .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole())
                );
            });
            /*
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<RobDroneGODbContext>()
                .AddDefaultTokenProviders();
                */

            ConfigureMyServices(services);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("GestorCampusPolicy", policy =>
                policy.RequireClaim("Gestor Campus"));
            });

            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors("Cors");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<RoleService>();
            services.AddScoped<IRoleService, RoleService>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<UserService>();
            services.AddScoped<IUserService, UserService>();

            services.AddTransient<IPedidoRepository, PedidoRepository>();
            services.AddTransient<PedidoService>();
            services.AddScoped<IPedidoService,PedidoService>();
        }
    }
}