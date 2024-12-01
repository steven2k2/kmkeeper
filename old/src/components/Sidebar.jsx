import React from 'react';

export default function Sidebar({ title, menuId, menuItems }) {
    return (
        <div className="bg-light d-flex flex-column flex-shrink-0 p-3 sidebar">
            <a
                href="/public"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                aria-label="Home"
            >
                <span className="fs-4 text-primary">{title}</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item) => (
                    <li className="nav-item" key={item.id}>
                        {item.disabled ? (
                            <a
                                className="nav-link disabled"
                                tabIndex="-1"
                                aria-disabled="true"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <a
                                href={item.href}
                                className={`nav-link ${
                                    menuId === item.id ? 'active' : 'link-dark'
                                }`}
                                aria-current={menuId === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}