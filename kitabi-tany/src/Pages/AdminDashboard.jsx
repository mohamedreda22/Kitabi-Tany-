import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getUsers, deleteUser, updateUser } from "../services/userService";
import { IMAGE_BASE_URL } from "../services/axiosInstance";
import Swal from "sweetalert2";
import NewNavbar from "../Component/Shared/NewNavbar";
import NewFooter from "../Component/Shared/NewFooter";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({ username: "", email: "", role: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getUsers();
                setUsers(userData);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "خطأ في جلب المستخدمين",
                    text: error.message,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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
                Swal.fire("تم الحذف!", "تم حذف المستخدم بنجاح.", "success");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "خطأ في حذف المستخدم",
                text: error.message,
            });
        }
    };

    const handleEdit = (user) => {
        setEditingUserId(user._id);
        setEditFormData({ username: user.username, email: user.email, role: user.role });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateUser(editingUserId, editFormData);
            setUsers(
                users.map((user) =>
                    user._id === editingUserId ? { ...user, ...editFormData } : user
                )
            );
            Swal.fire("تم التحديث!", "تم تحديث بيانات المستخدم بنجاح.", "success");
            setEditingUserId(null);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "خطأ في تحديث المستخدم",
                text: error.message,
            });
        }
    };

    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen">
            <NewNavbar />

            <main className="pt-32 pb-20 max-w-screen-2xl mx-auto px-8 flex gap-12">
                {/* SideNavBar Component */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <div className="sticky top-32 space-y-10">
                        <div className="space-y-4">
                            <h1 className="font-notoSerif text-2xl font-bold text-primary">Admin Dashboard</h1>
                            <div className="h-px bg-outline-variant/20"></div>
                        </div>
                        <nav className="space-y-4">
                            <Link className="flex items-center gap-3 p-3 bg-surface-container-highest text-primary rounded-xl font-bold transition-all duration-200" to="/admin-dashboard">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm">Users Control</span>
                            </Link>
                            <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-xl" to="/orders">
                                <span className="material-symbols-outlined">payments</span>
                                <span className="text-sm">Orders</span>
                            </Link>
                            <Link className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-xl" to="/home">
                                <span className="material-symbols-outlined">home</span>
                                <span className="text-sm">Storefront</span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-grow">
                    <header className="mb-12">
                        <h2 className="font-notoSerif text-4xl text-primary italic mb-2">Manage Users</h2>
                        <p className="text-on-surface-variant">Oversee system members and permissions</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">person</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Users</p>
                            <p className="font-notoSerif text-3xl text-primary">{users.length}</p>
                        </div>
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">admin_panel_settings</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Admins</p>
                            <p className="font-notoSerif text-3xl text-primary">{users.filter(u => u.role === 'admin').length}</p>
                        </div>
                        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
                            <span className="material-symbols-outlined absolute -right-4 -top-4 text-primary/5 !text-9xl">store</span>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Sellers</p>
                            <p className="font-notoSerif text-3xl text-primary">{users.filter(u => u.role === 'seller').length}</p>
                        </div>
                    </div>

                    {/* User List Table */}
                    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center py-12"><div className="spinner"></div></div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-outline-variant/20">
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">User</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Email</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Role</th>
                                            <th className="pb-4 text-xs font-bold uppercase tracking-widest text-outline">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/10">
                                        {users.map((user) => (
                                            <tr key={user._id} className="group hover:bg-surface-container-low transition-colors">
                                                <td className="py-4 flex items-center gap-4">
                                                    <img
                                                        src={user.profilePicture ? `${IMAGE_BASE_URL}/profile_pictures/${user.profilePicture}` : "/My_Logo.jpg"}
                                                        alt={user.username}
                                                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                                                    />
                                                    {editingUserId === user._id ? (
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            className="bg-surface-container-highest border-none text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20"
                                                            value={editFormData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-bold text-primary">{user.username}</span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {editingUserId === user._id ? (
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="bg-surface-container-highest border-none text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20"
                                                            value={editFormData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    ) : (
                                                        <span className="text-sm text-on-surface-variant">{user.email}</span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {editingUserId === user._id ? (
                                                        <select
                                                            name="role"
                                                            className="bg-surface-container-highest border-none text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20"
                                                            value={editFormData.role}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="seller">Seller</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="buyer">Buyer</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary-container/30 text-secondary'}`}>
                                                            {user.role}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4">
                                                    {editingUserId === user._id ? (
                                                        <div className="flex gap-2">
                                                            <button onClick={handleSave} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90">Save</button>
                                                            <button onClick={() => setEditingUserId(null)} className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg text-xs font-bold hover:bg-outline-variant/20">Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => handleEdit(user)} className="text-primary hover:scale-110 transition-transform">
                                                                <span className="material-symbols-outlined text-xl">edit</span>
                                                            </button>
                                                            <button onClick={() => handleDelete(user._id)} className="text-error hover:scale-110 transition-transform">
                                                                <span className="material-symbols-outlined text-xl">delete</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <NewFooter />
        </div>
    );
};

export default AdminDashboard;
