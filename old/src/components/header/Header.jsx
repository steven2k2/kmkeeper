export default function Header() {
    return (
        <nav className="navbar navbar-light bg-light p-0">
            <a className="navbar-brand d-flex align-items-center text-nowrap px-3" href="#">
                <span className="material-icons-outlined" title="Dashboard">edit_road</span>
                &nbsp;kmKeeper
            </a>

            <ul className="navbar-nav flex-row ml-auto px-3">
                <li className="nav-item mx-2" aria-disabled="true">
                    <a className="nav-link" href="#" title="Help">
                        <span className="material-icons-outlined">info</span>
                    </a>
                </li>
                <li className="nav-item mx-2" aria-disabled="true">
                    <a className="nav-link" href="#" title="Settings">
                        <span className="material-icons-outlined">settings</span>
                    </a>
                </li>
                <li className="nav-item mx-2" aria-disabled="true">
                    <a className="nav-link" href="#" title="Applications">
                        <span className="material-icons-outlined">apps</span>
                    </a>
                </li>
                <li className="nav-item mx-2" aria-disabled="true">
                    <a className="nav-link" href="#" title="User Profile">
                        <span className="material-icons-outlined">account_circle</span>
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a className="btn text-white" href="#" data-bs-toggle="tooltip" title="Sign out">Sign out</a>
                </li>
            </ul>
        </nav>
    );
}