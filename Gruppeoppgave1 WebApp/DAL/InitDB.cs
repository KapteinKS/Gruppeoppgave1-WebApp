using Gruppeoppgave1_WebApp.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gruppeoppgave1_WebApp.DAL
{
    public class InitDB
    {
        public static async Task Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<TicketContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                await context.SaveChangesAsync();
            }
        }
    }
}
