// pages/HomePage.jsx
import React from 'react'

const HomePage = ({ clients = [] }) => {
    const dummyData = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ]

    return (
        <div>
            <h1>HomePage</h1>
            <p>Welcome to the homepage! Here's a list of clients:</p>
            {clients.length > 0 ? (
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            <strong>{client.name}</strong> - {client.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <p>No clients provided. Showing dummy data instead:</p>
                    <ul>
                        {dummyData.map(client => (
                            <li key={client.id}>
                                <strong>{client.name}</strong> - {client.email}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default HomePage