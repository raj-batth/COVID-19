<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand to="/">Covid-19</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/countriesdata">Country</b-nav-item>
        <b-nav-item to="/"></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>