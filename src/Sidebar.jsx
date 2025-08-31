import React from 'react';

const ClerklyLogo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L16 6L26 2V26L16 30L6 26V2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
    </svg>
);


function Sidebar({ activePage, setActivePage, user, handleLogout }) {
    const navLinks = [
        { name: 'Dashboard' },
        { name: 'Drafter' },
        { name: 'Archives' },
        { name: 'Manager' },
    ];

    return (
        <div className="sidebar d-flex flex-column p-3">
            <div>
                <div className="d-flex align-items-center gap-3 mb-4">
                    <ClerklyLogo />
                    <h1 className="font-serif fs-4 fw-semibold m-0">Clerkly</h1>
                </div>

                <ul className="nav nav-pills flex-column">
                    {navLinks.map(link => (
                        <li className="nav-item mb-2" key={link.name}>
                            <a
                                href="#"
                                className={`nav-link d-flex align-items-center gap-3 ${activePage === link.name ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActivePage(link.name);
                                }}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto">
                {user ? (
                    <div className="user-info">
                        <small className="d-block text-muted text-center mb-2" style={{ wordWrap: 'break-word' }}>{user.email}</small>
                        <button onClick={handleLogout} className="btn btn-logout w-100 d-flex align-items-center justify-content-center gap-2">
                            <LogoutIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <small className="text-muted">Loading...</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;

