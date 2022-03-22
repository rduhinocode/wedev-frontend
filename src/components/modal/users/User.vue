<template>
  <ModalComponent v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        {{ user.id ? 'Update' : 'Add' }} User
      </template>
      <template v-slot:body>
        <div class="container h-100">
          <Form @submit="handleUser" :validation-schema="schema" :initial-values="user">

            <div class="form-outline mb-4">
              <div
                  v-if="message"
                  class="alert small"
                  role="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
              >
                {{ message }}
              </div>
            </div>

            <div v-if="!successful">
              <div class="form-outline mb-4">
                <Field id="first_name" name="first_name" type="text" class="form-control" placeholder="First Name" />
                <ErrorMessage name="first_name" class="error-feedback text-danger my-1 small" />
              </div>

              <div class="form-outline mb-4">
                <Field id="last_name" name="last_name" type="text" class="form-control" placeholder="Last Name" />
                <ErrorMessage name="last_name" class="error-feedback text-danger my-1 small" />
              </div>

              <div class="form-outline mb-4">
                <Field id="email" name="email" type="text" class="form-control" placeholder="Email Address" :disabled="user.id"/>
                <ErrorMessage name="email" class="error-feedback text-danger my-1 small" />
              </div>

              <div class="form-outline mb-4">
                <Field id="address" name="address" class="form-control" placeholder="Address"/>
                <ErrorMessage name="address" class="error-feedback text-danger my-1 small" />
              </div>

              <div class="form-outline mb-4">
                <Field as="select" name="country" class="form-control" placeholder="Country">
                  <option value="" disabled>Select a country</option>
                  <option v-for="country in countries" :key="country.alpha2Code" :value="country.name">{{ country.name }}</option>
                </Field>
                <ErrorMessage name="country" class="error-feedback text-danger my-1 small" />
              </div>


              <div class="text-center pt-1 mb-5 pb-1">
                <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  {{ user.id ? 'Update' : 'Add' }} User
                </button>
              </div>
            </div>
          </Form>
        </div>

      </template>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/modal/Modal.vue';
import UserService from "@/services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ViewModal",
  props: {
      userData: {
        type: Object,
        required: false,
        default: function() {
          return {
              id : 0
          };
        }
      }
  },
  components: {
    ModalComponent,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      first_name: yup
          .string()
          .required("First name is required!"),
      last_name: yup
          .string()
          .required("Last name is required!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      address: yup
          .string()
          .required("Address is required!"),
      country: yup
          .string()
          .required("Country is required!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      isModalVisible: false,
      schema
    }
  },
  computed: {
    countries() {
      return this.$store.state.common.countries;
    },
    user() {
      return {
        id: this.userData?.id ?? 0,
        first_name: this.userData?.first_name,
        last_name: this.userData?.last_name,
        email: this.userData?.email,
        address: this.userData?.details?.address,
        country: this.userData?.details?.country
      };
    }
  },
  mounted() {
    this.isModalVisible= true;
  },
  methods: {
    handleUser(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      if (this.user.id) {
        UserService.updateUser(this.user.id, user).then(
            (response) => {
              if (response.data) {
                this.message = "User successfully updated.";
                this.successful = true;
                this.loading = false;
                this.$emit('refresh');
              }
            },
            (error) => {
              this.message =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.successful = false;
              this.loading = false;
            }
        );
      } else {
        UserService.addUser(user).then(
            (response) => {
              if (response.data) {
                this.message = "User successfully added.";
                this.successful = true;
                this.loading = false;
                this.$emit('refresh');
              }
            },
            (error) => {
              this.message =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.successful = false;
              this.loading = false;
            }
        );
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.$emit('dismiss');
    }
  }
}
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
</style>