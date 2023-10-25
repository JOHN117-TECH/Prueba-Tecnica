const Header = () => {
  return (
    <nav
      className="navbar bg-dark navbar-expand-lg border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="../../assets/Vector.png"
            alt="Logo"
            width={30}
            height={24}
            className="align-text-top"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="btn" role="button" data-bs-toggle="button">
                {' '}
                Modo Oscuro
              </a>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav pe-5">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="../../assets/Bandera.jpeg" alt="Bandera" /> Es
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="navbar-nav pe-5">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle bg-primary badge fs-5"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Hola , Camilo
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
