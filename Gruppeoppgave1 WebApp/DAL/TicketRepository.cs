﻿using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Linq;
using Gruppeoppgave1_WebApp.Model;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gruppeoppgave1_WebApp.DAL
{
    public class TicketRepository : ITicketRepository
    {
        private readonly TicketContext _db;

        public TicketRepository(TicketContext db)
        {
            _db = db;
        }

        
        public async Task<bool> OrderTicket(Ticket orderedTicket)
        {
            try
            {


                var order = new Order()
                {
                    Route = orderedTicket.Route,
                    LeaveDate = orderedTicket.LeaveDate,
                    HomeDate = orderedTicket.HomeDate,
                    Price = orderedTicket.Price,
                    Passengers = orderedTicket.Passengers,
                };

                Customer c = await _db.Customers.FindAsync(orderedTicket.Email);

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
                }
                else
                {
                    c.Orders.Add(order);
                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Method for retrieving all orders
        public async Task<List<Ticket>> GetTickets()
        {
            try
            {

            List<Customer> customers = await _db.Customers.Select(c => new Customer
            {
                CustomerID = c.CustomerID,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                Phone = c.Phone,
                Orders = c.Orders
            }).ToListAsync();
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
                        LeaveDate = order.LeaveDate,
                        HomeDate = order.HomeDate,
                        Passengers = order.Passengers
                    };
                    orders.Add(anOrder);
                }
            }
            return orders;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Departure>> GetDepartures()
        {
            try
            {
                List<Departure> departures = await _db.Departures.Select(d => new Departure
                {
                    DepID = d.DepID,
                    Dep_location = d.Dep_location,
                    Arr_location = d.Arr_location,
                    Dep_time = d.Dep_time,
                    Arr_time = d.Arr_time
                }).ToListAsync();
                return departures;
            }
            catch
            {
                return null;
            }
        }
    }
}