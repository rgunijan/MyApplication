using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Hosting;
using Owin;

namespace SignalRSelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            // This will *ONLY* bind to localhost, if you want to bind to all addresses
            // use http://*:8080 to bind to all addresses. 
            // See http://msdn.microsoft.com/library/system.net.httplistener.aspx 
            // for more information.
            string url = "http://localhost:8090";
            using (WebApp.Start(url))
            {
                Console.WriteLine("Server running on {0}", url);
                Broadcaster.Start();
                Console.ReadLine();
                Broadcaster.Cancel();
            }
        }
    }

    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();
        }
    }

    public class MyHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
        }
    }

    public class Broadcaster
    {
        private static bool isRunning = true;
        public static void Cancel()
        {
            isRunning = false;
        }

        public static void Start()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<MyHub>();
            Task.Factory.StartNew(() =>
            {
                while (isRunning)
                {
                    Thread.Sleep(1000);
                    hubContext.Clients.All.addMessage("server", DateTime.Now.ToString("G"));
                }
            });
        }
    }
}
