import React, { useEffect, useState } from 'react';
import AdminOrderCardDash from '../components/admin/AdminOrderCardDash';
import axios from 'axios';

const AdminDashboard = () => {
    const [sales, setSales] = useState(0);
    const [orders, setOrders] = useState([]);
    const [interval, setInterval] = useState('Annual');
    const [loading, setLoading] = useState(false);

    const activeLink = 'relative tracking-[1px] mb-4 text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute';
    const inactiveLink = 'relative tracking-[1px] mb-4 hover:text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]';

    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
        // fetch and set sales
        fetchSales(newInterval.toLowerCase());
        // You might want to update sales data here based on the newInterval
        // Example: setSales(fetchSalesData(newInterval));
    };
    
    const dummyOrders = [
        {
          productId: 123345345,
          quantity: 3,
          status: 0,
          email: 'email@email.com',
          dateOrdered: '05/25/2003'
        },
        {
          productId: 123345346,
          quantity: 5,
          status: 1,
          email: 'anotheremail@email.com',
          dateOrdered: '06/15/2003'
        },
        {
          productId: 123345347,
          quantity: 2,
          status: 2,
          email: 'yetanotheremail@email.com',
          dateOrdered: '07/20/2003'
        },
      ]
    
    // fetch all customer orders and sales once component is mounted
    useEffect(() => {
        async function fetchAllOrders () {
            try{
                const res = await axios.get("http://localhost:3000/api/orders/getAllOrders");
                // update state variable
                setOrders(res.data);
            } catch (error) {
                console.log("Error fetching all orders")
            }
        }
        fetchAllOrders();
        fetchSales(interval.toLowerCase());
    }, [])

    // fetch all sales
    async function fetchSales (interval) {
        setLoading(true);
        try{
            const res = await axios.get(`http://localhost:3000/api/sales/interval?interval=${interval}`);
            // update state variable
            setSales(res.data.totalSalesAmount)
        } catch (error) {
            console.log("Error fetching sales")
        }
        setLoading(false);
    }

    return (
        <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 min-h-screen'>
            <h1 className='poppins-regular text-4xl mb-5 '> Hello admin, here's a quick summary of the sales</h1>
            <ul className='poppins-regular flex gap-5 mb-4 text-lg'>
                <li>
                    <button 
                      onClick={() => handleIntervalChange('Weekly')}
                      className={interval === 'Weekly' ? activeLink : inactiveLink}
                    >
                        Weekly
                    </button>
                </li>
                <li>
                    <button 
                        onClick={() => handleIntervalChange('Monthly')}
                        className={interval === 'Monthly' ? activeLink : inactiveLink}
                    >
                        Monthly
                    </button>
                </li>
                <li>
                    <button 
                    onClick={() => handleIntervalChange('Annual')} 
                    className={interval === 'Annual' ? activeLink : inactiveLink}>
                        Annual
                    </button>
                </li>
            </ul>
            <div className='bg-alabaster h-52 rounded-xl flex items-center pl-20'>
                <div className='flex flex-col '>
                  {
                      loading ? (
                          <h2 className='text-5xl poppins-regular'>Loading...</h2>
                      ) : (
                          <>
                            <h2 className='text-5xl poppins-regular'>{sales}</h2>
                            <p>{interval} Sales</p>
                          </>
                      )
                  }
                </div>
            </div>
            <div className='bg-alabaster p-5 mb-5 rounded-xl mt-7 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
            {orders.map((order) => (
                <AdminOrderCardDash key={order._id} order={order} />
            ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
