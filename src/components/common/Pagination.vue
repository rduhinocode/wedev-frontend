<template>
  <div class="center">
    <div class="pagination">
      <a href="#" :class="{ 'disabled-link': metaData.current_page == 1 }" @click="paginate( metaData.current_page - 1 )">&laquo;</a>
      <a href="#" v-for="index in metaData.last_page"
         :key="index"
         :class="{'active': index == metaData.current_page}" @click="paginate(index)">{{ index }}</a>
      <a href="#" :class="{'disabled-link' : metaData.current_page == metaData.last_page}" @click="paginate( metaData.current_page + 1 )">&raquo;</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    metaData: {
      type: Object,
      required: true,
      default : function() {
        return {
          current_page: 1,
          last_page: 1
        }
      }
    }
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    }
  }
}
</script>

<style scoped>
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

.disabled-link {
  pointer-events: none;
}
</style>