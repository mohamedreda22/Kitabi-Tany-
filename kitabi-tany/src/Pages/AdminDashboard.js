import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../services/userService"; // Add updateUser
import Swal from "sweetalert2";
import "../assets/css/AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ username: "", email: "", role: "" });

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers();
                setUsers(userData);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Fetching Users",
                    text: error.message,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Handle delete user
    const handleDelete = async (userId) => {
        try {
            const confirm = await Swal.fire({
                title: "هل أنت متأكد من حذف المستخدم؟",
                text: "لن تتمكن من التراجع عن هذا الإجراء",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "نعم، احذف المستخدم",
                cancelButtonText: "إلغاء",
            });
            if (confirm.isConfirmed) {
                await deleteUser(userId);
                setUsers(users.filter((user) => user._id !== userId));
                Swal.fire("Deleted!", "The user has been deleted.", "success");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Deleting User",
                text: error.message,
            });
        }
    };

    // Start editing a user
    const handleEdit = (user) => {
        setEditingUserId(user._id);
        setEditFormData({ username: user.username, email: user.email, role: user.role });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save edited user data
    const handleSave = async () => {
        try {
            await updateUser(editingUserId, editFormData);
            setUsers(
                users.map((user) =>
                    user._id === editingUserId ? { ...user, ...editFormData } : user
                )
            );
            Swal.fire("Updated!", "The user has been updated.", "success");
            setEditingUserId(null);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Updating User",
                text: error.message,
            });
        }
    };

    return (
        <div className="admin-dashboard">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="dashboard-content">
                    <Link to="/home">العوده</Link>
                    <h2>التحكم بالمستخدمين</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>الصورة</th>
                                <th>الاسم</th>
                                <th>الايميل</th>
                                <th>الدور</th>
                                <th>التحكم</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <img
                                            src={`http://localhost:5000/profile_pictures/${user.profilePicture}`}
                                            alt={user.username}
                                            className="user-photo"
                                        />
                                    </td>
                                    <td>
                                        {editingUserId === user._id ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={editFormData.username}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === user._id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === user._id ? (
                                            <select
                                                name="role"
                                                value={editFormData.role}
                                                onChange={handleInputChange}
                                            >
                                                <option value="seller">بائع</option>
                                                <option value="admin">ادمن</option>
                                                <option value="buyer">مشتري</option>
                                            </select>
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === user._id ? (
                                            <>
                                                <button onClick={handleSave} className="save-btn">
                                                    Save
                                                </button>&nbsp;
                                                <button
                                                    onClick={() => setEditingUserId(null)}
                                                    className="cancel-btn"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
