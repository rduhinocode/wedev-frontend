<template>
  <section class="h-100 gradient-form" style="background-color: #eee;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <h1><font-awesome-icon icon="user" /></h1>
                    <h4 class="mt-1 mb-5 pb-1">User Management</h4>
                  </div>

                  <Form @submit="handleLogin" :validation-schema="schema">
                    <div class="form-group row justify-content-center">
                      <div v-if="message" class="alert alert-danger w-100 small" role="alert">
                        {{ message }}
                      </div>
                    </div>

                    <p>Please login to your account</p>

                    <div class="form-outline mb-4">
                      <Field id="email" name="email" type="text" class="form-control" placeholder="Email Address" />
                      <ErrorMessage name="email" class="error-feedback text-danger my-1 small" />
                    </div>

                    <div class="form-outline mb-4">
                      <Field id="password" name="password" type="password" class="form-control" placeholder="Password"/>
                      <ErrorMessage name="password" class="error-feedback text-danger my-1 small" />
                    </div>

                    <div class="text-center pt-1 mb-5 pb-1">

                      <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        Log in
                      </button>
                    </div>
                  </Form>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <router-link to="/register" class="nav-link">
                      Register
                    </router-link>

<!--                    <button type="button" class="btn btn-outline-danger"><font-awesome-icon icon="user-plus" /> Sign Up</button>-->
                  </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">User management sample code</h4>
                  <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().email("Email is invalid!").required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/dashboard");
          },
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
  },
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