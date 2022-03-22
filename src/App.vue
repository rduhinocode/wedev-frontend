<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <nav v-if="currentUser" class="navbar navbar-expand gradient-custom-2 text-white">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <font-awesome-icon icon="user" /> User Management
        </li>
      </div>
      <div class="navbar-nav ml-auto">
        <li class="nav-item">
          <div class="nav-link small">
            Welcome!
            {{ currentUser.first_name }} {{ currentUser.last_name }}
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white small" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <router-view />

  </section>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("common/getAllCountries").then(
        () => {},
        (error) => {
          this.loading = false;
          this.message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user?.user_data;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
  .gradient-custom-2 {
    /* fallback for old browsers */
    background: #fccb90;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
  }

  @media (min-width: 768px) {
    .gradient-form {
      height: 100vh !important;
    }
  }
  @media (min-width: 769px) {
    .gradient-custom-2 {
      border-top-right-radius: .3rem;
      border-bottom-right-radius: .3rem;
    }
  }
</style>