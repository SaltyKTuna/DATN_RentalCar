import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountForm = () => {
    // State cho việc lưu trữ thông tin tài khoản
    const [account, setAccount] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
        passwordHash: '',
        address: '',
        dateOfBirth: '',
    });

    const [accounts, setAccounts] = useState([]); // Danh sách tất cả tài khoản
    const [isEditing, setIsEditing] = useState(false); // Xác định xem có đang sửa không
    const [editId, setEditId] = useState(null);

    // Load danh sách tài khoản từ API khi component được render
    useEffect(() => {
        fetchAccounts();
    }, []);

    // Lấy danh sách tài khoản
    const fetchAccounts = async () => {
        try {
            const response = await axios.get('/api/accounts'); // Đường dẫn API của bạn
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    // Xử lý sự kiện khi nhập liệu vào form
    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    // Thêm tài khoản mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/api/accounts/${editId}`, account); // Sửa tài khoản
            } else {
                await axios.post('/api/accounts', account); // Thêm tài khoản mới
            }
            fetchAccounts(); // Tải lại danh sách tài khoản
            setAccount({
                fullName: '',
                email: '',
                phoneNumber: '',
                username: '',
                passwordHash: '',
                address: '',
                dateOfBirth: '',
            });
            setIsEditing(false); // Reset trạng thái sau khi thêm/sửa
        } catch (error) {
            console.error('Error saving account:', error);
        }
    };

    // Sửa tài khoản
    const handleEdit = (account) => {
        setAccount(account);
        setIsEditing(true);
        setEditId(account.accountId); // Đặt ID cho tài khoản đang sửa
    };

    // Xóa tài khoản
    const handleDelete = async (accountId) => {
        try {
            await axios.delete(`/api/accounts/${accountId}`); // Xóa tài khoản
            fetchAccounts();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Account' : 'Add Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={account.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={account.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={account.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={account.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="passwordHash"
                        value={account.passwordHash}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={account.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={account.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">
                    {isEditing ? 'Update Account' : 'Add Account'}
                </button>
            </form>

            <h2>Accounts List</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((acc) => (
                        <tr key={acc.accountId}>
                            <td>{acc.fullName}</td>
                            <td>{acc.email}</td>
                            <td>{acc.phoneNumber}</td>
                            <td>{acc.username}</td>
                            <td>
                                <button onClick={() => handleEdit(acc)}>Edit</button>
                                <button onClick={() => handleDelete(acc.accountId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountForm;
