using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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
        //Method for adding an order to a new or existing customer
        public void OrderTicket(Ticket orderedTicket)
        {
            var order = new Order()
            {
                Route = orderedTicket.Route,
                LeaveDate = orderedTicket.LeaveDate,
                HomeDate = orderedTicket.HomeDate,
                Price = orderedTicket.Price,
                Passengers = orderedTicket.Passengers,
            };

            Customer c = _db.Customers.FirstOrDefault(cus => (cus.FirstName == orderedTicket.FirstName) && (cus.LastName == orderedTicket.LastName));

            if (c == null)
            {
                var customer = new Customer
                {
                    FirstName = orderedTicket.FirstName,
                    LastName = orderedTicket.LastName,
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

        //Method for retrieving all orders
        public List<Ticket> GetTickets()
        {
            List<Customer> customers = _db.Customers.ToList();
            List<Ticket> orders = new List<Ticket>();
            foreach (var customer in customers)
            {
                foreach (var order in customer.Orders)
                {
                    var anOrder = new Ticket
                    {
                        FirstName = customer.FirstName,
                        LastName = customer.LastName,
                        Email = customer.Email,
                        Phone = customer.Phone,
                        Route = order.Route,
                        Date = order.Date,
                        Passengers = order.Passengers
                    };
                    orders.Add(anOrder);
                }
            }
            return orders;
        }
    }
}
