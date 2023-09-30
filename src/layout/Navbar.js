import React from 'react'

export default function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bumble Bee
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="btn btn-outline-light" to="/addcustomer">
          Customer Registration
        </Link>
        <Link className="btn btn-outline-light" to="/product/addproduct">
          Add Product
        </Link>
      </div>
    </nav>
  </div>
  )
}
