using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gruppeoppgave1_WebApp.DAL;
using Gruppeoppgave1_WebApp.Model;

namespace Gruppeoppgave1_WebApp.Controllers
{
    [Route("[controller]/[action]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _db;

        public TicketController(ITicketRepository db)
        {
            _db = db;
        }

        public async Task<bool> OrderTicket(Ticket orderedTicket)
        {
            return await _db.OrderTicket(orderedTicket);
        }

        public async Task<List<Ticket>> GetTickets()
        {
            return await _db.GetTickets();
        }

        public async Task<List<DAL.Departure>> GetDepartures()
        {
            return await _db.GetDepartures();
        }
    }
}
