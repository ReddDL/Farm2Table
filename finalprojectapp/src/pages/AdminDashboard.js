import React, { useEffect, useState } from 'react';
import AdminOrderCardDash from '../components/admin/AdminOrderCardDash';
import AdminProductCardDash from '../components/admin/AdminProductCardDash';
import axios from 'axios';

const AdminDashboard = () => {
    const [sales, setSales] = useState(0);
    const [orders, setOrders] = useState([]);
    const [interval, setInterval] = useState('weekly');
    const [loading, setLoading] = useState(false);
    const [productSales, setProductSales] = useState({});

    const activeLink = 'relative tracking-[1px] mb-4 text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute';
    const inactiveLink = 'relative tracking-[1px] mb-4 hover:text-periwinkle after:content-[""] after:bg-periwinkle after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]';

    useEffect(() => {
        fetchSales(interval.toLowerCase());
        fetchOrders(interval.toLowerCase());
    }, [interval]);

    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
        fetchSales(newInterval.toLowerCase());
        fetchOrders(newInterval.toLowerCase());
    };

    async function fetchOrders (interval) {
        setLoading(true);
        try{
            const res = await axios.get(`http://localhost:3000/api/admin/orders/interval?interval=${interval}`);
            console.log(res.data.orders);
            setOrders(res.data.orders);
        } catch (err) {
            console.log(err)
        }
    }

    // fetch all sales
    async function fetchSales (interval) {
        setLoading(true);
        try{
            const res = await axios.get(`http://localhost:3000/api/admin/sales/interval?interval=${interval}`);
            // update state variable
            setSales(res.data.totalSalesAmount)
            setProductSales(res.data.salesReport)
        } catch (error) {
            console.log("Error fetching sales")
        }
        setLoading(false);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      return (
        <div className='bg-eggshell min-h-screen h-screen px-5 pt-28 pb-10'>
            <div className='mx-auto max-w-7xl h-full grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto,1fr,2fr,2fr] lg:grid-rows-[auto,1fr,2fr] gap-4'>
                <div className='col-span-1 lg:col-span-2'>
                    <h1 className='poppins-regular text-2xl md:text-3xl lg:text-4xl mb-5'>Hello admin, here's a quick summary of the sales</h1>
                    <ul className='poppins-regular flex gap-5 text-lg'>
                        <li>
                            <button onClick={() => handleIntervalChange('weekly')} 
                                    className={interval === 'weekly' ? activeLink : inactiveLink}>
                                Weekly
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleIntervalChange('monthly')}
                                className={interval === 'monthly' ? activeLink : inactiveLink}
                                >
                                Monthly
                            </button>
                        </li>
                        <li>
                            <button 
                            onClick={() => handleIntervalChange('annual')} 
                            className={interval === 'annual' ? activeLink : inactiveLink}>
                                Annual
                            </button>
                        </li>
                    </ul>
                </div>
                <div className='bg-alabaster h-full rounded-xl flex items-center pl-20 shadow-md col-span-1'>
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
                {/* PRODUCTS */}
                <div className='bg-alabaster shadow-md rounded-xl h-full col-span-1 lg:row-span-2 overflow-y-auto p-3 no-scrollbar'>
                    <table className="table table-xs lg:table-md">
                        <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Name</th>
                            <th>Quantity Sold</th>
                            <th>Income generated</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Object.keys(productSales).map(key => (
                                <AdminProductCardDash key={key} product={{ key, ...productSales[key] }} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* LIST OF ORDERS */}
                <div className='bg-alabaster p-1 lg:p-5 mb-5 rounded-xl h-full shadow-md overflow-y-auto no-scrollbar col-span-1'>
                    <table className="table table-xs lg:table-md">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                            <tr key={order._id}>
                                <th>{order._id}</th>
                                <td>{order.quantity}</td>
                                <td>${order.totalPrice}</td>
                                <td>{formatDate(order.dateOrdered)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
