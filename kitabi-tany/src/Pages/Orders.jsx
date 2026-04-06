import { useState, useEffect } from 'react';
import { getOrders } from '../services/ordersService.jsx';
import Swal from 'sweetalert2';
import '../assets/css/Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

/*     useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error Fetching Orders',
                    text: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []); */

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders(); // Fetch orders from service
                setOrders(ordersData); // Update state with fetched orders
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                Swal.fire({
                    icon: 'error',
                    title: 'Error Fetching Orders',
                    text: errorMessage, // Show the error message
                });
            } finally {
                setLoading(false); // Set loading to false once data fetch is complete
            }
        };
        fetchOrders(); // Call the function to fetch orders
    }, []); // Empty dependency array to fetch data once on mount
    

/*     return (
        <div className="orders">
            <h1>الطلبات</h1>
            {loading ? (
                <div className="spinner"></div>
            ) : orders.length === 0 ? (
                <p>لا توجد طلبات</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order">
                            <h3>الطلب رقم {order._id}</h3>
                            <p>المستخدم: {order.buyer.username}</p>
                            <p>الكتب:</p>
                            <ul>
                                {order.books.map((book) => (
                                    <li key={book._id}>
                                        <Link to={`/book/${book._id}`}>{book.title}</Link>
                                    </li>
                                ))}
                            </ul>
                            <p>المبلغ: {order.totalPrice} ج.م</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ); */
    return (
        <div className="orders">
            <h1>الطلبات</h1>
            {loading ? (
                <div className="spinner"></div> // Show a loading spinner while fetching orders
            ) : orders.length === 0 ? (
                <p>لا توجد طلبات</p> // Message for no orders
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order">
                            <h3>الطلب رقم {order._id}</h3>
                            <p>المستخدم: {order.buyer.username}</p>
                            <p>الكتب:</p>
                            <ul>
                            {order.books.map((item) => (
                              <li key={item.book._id}>
                                  <Link to={`/book/${item.book._id}`}>{item.book.title}</Link> - {item.book.price} ج.م
                    </li>
                                ))}
                            </ul>
                            <p>المبلغ: {order.totalPrice} ج.م</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    };

export default Orders;
