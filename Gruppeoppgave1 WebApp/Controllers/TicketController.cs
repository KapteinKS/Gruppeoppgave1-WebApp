using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gruppeoppgave1_WebApp.Models;

namespace Gruppeoppgave1_WebApp.Controllers
{
    [Route("[controller]/[action]")]
    public class TicketController:ControllerBase
    {
        private readonly TicketContext _db;

        public TicketController(TicketContext db)
        {
            _db = db;
        }

        [HttpPost]
        public void OrderTicket(Ticket orderedTicket)
        {
            var order = new Order()
            {
                Route = orderedTicket.Route,
                Date = orderedTicket.Date,
                Passengers = orderedTicket.Passengers,
            };

            Customer c = _db.Customers.FirstOrDefault(cus => cus.Name == orderedTicket.Name);

            if (c == null)
            {
                var customer = new Customer
                {
                    Name = orderedTicket.Name,
                    Email = orderedTicket.Email,
                    Phone = orderedTicket.Phone
                };
                customer.Orders = new List<Order>();
                customer.Orders.Add(order);
                _db.Customers.Add(customer);
                _db.SaveChanges();
            }
            else
            {
                c.Orders.Add(order);
                _db.SaveChanges();
            }
        }
    }
}
