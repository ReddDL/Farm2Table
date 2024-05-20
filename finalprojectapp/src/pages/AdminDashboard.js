import React, { useState } from 'react';
import AdminOrderCard from '../components/admin/AdminOrderCard';

const AdminDashboard = () => {
    const [sales, setSales] = useState(0);
    const [orders, setOrders] = useState([]);
    const [interval, setInterval] = useState('Annually');

    const activeLink = 'relative tracking-[1px] mb-4 text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute';
    const inactiveLink = 'relative tracking-[1px] mb-4 hover:text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]';

    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
        // You might want to update sales data here based on the newInterval
        // Example: setSales(fetchSalesData(newInterval));
    };

    return (
        <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 min-h-screen'>
            <h1 className='poppins-regular text-4xl mb-5 '> Hello admin, here's a quick summary of the sales</h1>
            <ul className='poppins-regular flex gap-5 mb-4 text-lg'>
                <li>
                    <button 
                    onClick={() => handleIntervalChange('Annually')} 
                    className={interval === 'Annually' ? activeLink : inactiveLink}>
                        Annually
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
                        onClick={() => handleIntervalChange('Weekly')}
                        className={interval === 'Weekly' ? activeLink : inactiveLink}
                    >
                        Weekly
                    </button>
                </li>
            </ul>
            <div className='bg-alabaster h-52 rounded-xl flex items-center pl-20'>
                <div className='flex flex-col '>
                    <h2 className='text-5xl poppins-regular'>{sales}</h2>
                    <p>{interval} Sales</p>
                </div>
            </div>
            <div className='bg-alabaster p-5 mb-5 rounded-xl mt-7 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
                <AdminOrderCard />
                <AdminOrderCard />
                <AdminOrderCard />
                <AdminOrderCard />
                <AdminOrderCard />
            </div>
        </div>
    );
};

export default AdminDashboard;
