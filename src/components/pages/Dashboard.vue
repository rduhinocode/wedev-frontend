<template>
  <div>
    <section class="h-100" style="background-color: #eee;">
      <div class="container py-5 h-100">
        <div class="py-2 row">
          <div class="col-md-12 col-form-label">
            <input v-model="filter.search" type="text" name="search" class="w-100 form-control" placeholder="Search">
          </div>
          <div class="col-md-6 col-form-label">
            <select v-model="filter.sortBy" class="w-100 form-control" placeholder="Sort By">
              <option value="" disabled selected>Sort By</option>
              <option v-for="field in sort" :key="field.key" :value="field.key"> {{ field.label }} </option>
            </select>
          </div>
          <div class="col-md-6 col-form-label">
            <select v-model="filter.sortDirection" class="w-100 form-control" placeholder="Sort Direction">
              <option value="" disabled selected>Sort Direction</option>
              <option v-for="field in direction" :key="field.key" :value="field.key"> {{ field.label }} </option>
            </select>
          </div>
          <div class="col-md-6">
            <button type="button" class=" btn btn-info my-2 gradient-custom-2" @click="getData">Search</button>
          </div>
          <div class="col-md-6 ">
            <button type="button" class="btn btn-info my-2 gradient-custom-2 mb-3 fa-pull-right" @click="openModal = true">Add User</button>
          </div>

        </div>

        <table class="table table-striped table-bordered">
          <thead>
          <tr>
            <th>User</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="wrapper">
              <span class="icon h2 pt-2 pl-2"><font-awesome-icon icon="user"/></span>
              <span class="name font-weight-bold pt-1">{{ user.first_name }} {{ user.last_name }}</span>
              <span class="email small mb-2">{{user.email}}</span>
            </td>

            <td>
              <span class="font-weight-bold col-md-6">
                <small>{{ user.details?.address }},  {{ user.details?.country }}</small>
              </span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <font-awesome-icon icon="pen-alt"  class="pointer m-1" @click="selectedUser = user; openModal = true;"/>
                <font-awesome-icon icon="trash-alt" class="pointer m-1" @click="deleteUser(user.id)"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="center">
          <div class="pagination">
            <a href="#" :class="{ 'disabled-link': filter.page == 1 }" @click="paginate( filter.page - 1 )">&laquo;</a>
            <a href="#" v-for="index in pagination.last_page"
               :key="index"
               :class="{'active': index == pagination.current_page}" @click="paginate(index)">{{ index }}</a>
            <a href="#" :class="{'disabled-link' : filter.page == pagination.last_page}" @click="paginate( filter.page + 1 )">&raquo;</a>
          </div>
        </div>
      </div>
    </section>

    <UserModal v-if="openModal" :user-data="selectedUser" @dismiss="selectedUser = {};openModal=null" @refresh="getData"/>
  </div>

</template>

<script>
import UserService from "@/services/user.service";
import UserModal from "@/components/modal/users/User";

export default {
  name: "DashboardPage",
  components: {
    UserModal,

  },
  data() {
    return {
      users: [],
      error: null,
      selectedUser: {},
      openModal: null,
      pagination: {},
      filter: {
        search: "",
        sortBy: "first_name",
        sortDirection: "asc",
        page: 1,
        perPage : 10
      },
      sort: [
        {
          "key": "first_name",
          "label": "First Name"
        },
        {
          "key": "last_name",
          "label": "Last Name"
        },
        {
          "key": "email",
          "label": "Email"
        },
      ],
      direction: [
        {
          "key": "asc",
          "label" : "Ascending"
        },
        {
          "key": "desc",
          "label" : "Descending"
        }
      ]
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    filter() {
      this.getData();
    }
  },
  methods: {
    paginate(page) {
      this.filter.page = page;
      this.getData();
    },
    getData() {
      UserService.getAllUsers(this.filter).then(
          (response) => {
            this.users = response.data.data;
            this.pagination = response.data.meta;
          }
      );
    },
    deleteUser(userId) {
        UserService.deleteUser(userId).then(
            (response) => {
              if (response.data.success) {
                this.getData();
              }
            }
        )
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

.wrapper{
  position: relative;
  padding: 0 0 0 50px;
}
.icon{
  position: absolute;
  top: 0;
  left:0;
}
.name,
.email{
  display: block;
}

.center {
  text-align: center;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.pointer {
  cursor: pointer;
}

.disabled-link {
  pointer-events: none;
}

</style>