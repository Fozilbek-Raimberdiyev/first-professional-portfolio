<template>
  <div ref="wrapper">
    <label style="text-align: right">
      <el-input
        style="width: 80%; margin-right: 5px"
        clearable
        size="large"
        v-model="searchName"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
      <el-button type="primary" size="large" @click="searchMovies(search)"
        >Izlash</el-button
      >
    </label>
    <div>
      <div class="movies" v-if="list.length">
        <div v-if="listC.length">
          <a-row
            :gutter="[8, 48]"
            class="movie"
            ref="movies"
            v-for="movie in list"
            :key="movie?.id"
          >
            <a-card :span="12">
              <router-link @click="toInfo = true" :to="`/movies/${movie.id}`">
                <p class="title">
                  <el-link :to="`/movies/${movie.id}`" :underline="false"
                    ><b>{{ movie.original_title }}</b></el-link
                  >
                </p>
              </router-link>
              <el-skeleton :loading="loading">
                <template #template>
                  <el-skeleton-item
                    variant="image"
                    style="width: 240px; height: 240px"
                  />
                </template>
                <template #default>
                  <a-image
                    :width="200"
                    :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`"
                  />
                </template>
              </el-skeleton>
              <p class="description">{{ movie.overview }}</p>
              <p class="rating">
                <b>Rating</b> :
                {{ movie.vote_average }}
              </p>
              <p class="realease_date">
                <b>Release date</b> :
                {{ movie.release_date }}
              </p>
            </a-card>
          </a-row>
          <div class="pagination">
            <el-pagination
              :page-size="20"
              :pager-count="11"
              layout="prev, pager, next"
              :total="total"
              background
              :style="[smallScreen ? 'width: 380px; overflow-x: auto;' : '']"
              style="padding: 10px"
              :v-model:current-page="page"
              @update:current-page="updateCurPage"
            />
          </div>
        </div>
        <div v-else>
          <n-empty size="huge" description="Kinolar topilmadi..."></n-empty>
        </div>
      </div>
      <div v-else>
        <div style="display: flex; justify-content: center; height: 400px">
          <n-empty size="huge" description="Kinolar topilmadi..."></n-empty>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Import component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { app } from "../../main";
import { Search } from "@element-plus/icons-vue";
import { mapActions, mapState } from "pinia";
import { movieStore } from "../../stores/movie.store";
import { loadingStore } from "../../stores/loading.store";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
export default {
  name: "Movies",
  data() {
    return {
      Search,
      page: 1,
      app,
      rating: "",
      searchName: "",
      smallScreen: false,
    };
  },
  computed: {
    ...mapState(movieStore, ["list", "total", "search"]),
    ...mapState(loadingStore, ["loading"]),
    listC() {
      return this.list;
    },
  },
  props: [
    "size",
    "large",
    "small",
    "default",
    "type",
    "primart",
    "info",
    "succes",
    "text",
    "native-type",
    "submit",
    "cancel",
  ],
  watch: {
    search() {
      if (!this.search) {
        this.getMovies();
      }
    },
  },
  methods: {
    ...mapActions(movieStore, ["searchMovies", "getPage", "getList"]),
    updateCurPage(v) {
      this.page = v;
      this.getPage(v);
    },
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs);
      let ref = {...this.$refs};
      console.log(ref)
    });
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry);
            observer.unobserve(entry);
          }
        });
      },
      { threshold: 1 }
    );
  },
  created() {
    this.getList();
    this.rating = "";
    this.smallScreen = window.innerWidth < 600;
  },
  components: { Loading, FadeLoader },
};
</script>
<style scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
}
.movie {
  flex-basis: 45%;
}
.movie img {
  height: 250px;
}
.pagination {
  margin: 3rem 0;
  display: block;
  /* margin-left: 3rem; */
  /* max-width: 600px; */
}
.title a {
  font-size: 18px;
}
.description {
  height: 200px;
  overflow-y: auto;
}
</style>