<template>
  <div>
    <!--NavBar-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/main">
          <img
            src="../assets/logo.png"
            alt=""
            width="40"
            height="40"
            class="d-inline-block align-center"
          />
          Gracenotes
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse text-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/main"
                ><i class="fas fa-home"></i> หน้าแรก</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/grace"
                ><i class="fas fa-address-book"></i>
                บันทึกความดีกิจกรรมเพื่อสังคมและสาธารณะประโยชน์</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/report"
                ><i class="fas fa-bug"></i> รายงานปัญหา</a
              >
            </li>

            <li class="nav-item" v-if="info.member_level == 'teacher'">
              <a class="nav-link text-danger" href="/admin"
                ><i class="fas fa-asterisk"></i> Admin Panel</a
              >
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown dropstart">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="'http://localhost:5000' + info.member_img"
                  alt=""
                  style="border-radius: 8px"
                  width="30"
                  height="35"
                />
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/mygrace"
                    >บันทึกความดีของฉัน</a
                  >
                </li>
                <li><a class="dropdown-item" href="/profile">การตั้งค่า</a></li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item"
                    >{{ info.member_fname }} {{ info.member_lname }}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/logout"
                    ><span class="text-danger">ออกจากระบบ</span></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br /><br />

    <div class="container">
      <br />
      <div
        class="card mx-auto col-sm-12 col-md-6 col-lg-6 my-3"
        v-if="socials != ''"
      >
        <div class="card-body">
          <br />
          <p style="font-size: x-large">
            {{ socials.social_detail }}
          </p>
          <p class="text-end">
            วันที่ {{ socials.social_timestamp.substr(0, 10) }} เวลา
            {{ socials.social_timestamp.substr(11, 5) }}
          </p>
        </div>
        <a :href="'http://localhost:5000' + socials.social_img" target="_blank">
          <img
            :src="'http://localhost:5000' + socials.social_img"
            class="rounded card-img-bottom"
          />
        </a>
      </div>
      <div class="mx-auto text-center col-sm-12 col-md-6 col-lg-6 my-3">
        <span
          class="text-primary"
          v-if="myLike.length == 1"
          @click="statusClear()"
          ><i class="fas fa-lg fa-thumbs-up m-3"></i> {{ like.length }}
        </span>
        <span class="text-dark" v-else @click="statusAdd('like')">
          <i class="fas fa-lg fa-thumbs-up m-3"></i> {{ like.length }}
        </span>

        <span
          class="text-danger"
          v-if="myLove.length == 1"
          @click="statusClear()"
          ><i class="fas fa-lg fa-heart m-3"></i> {{ love.length }}
        </span>
        <span class="text-dark" v-else @click="statusAdd('love')"
          ><i class="fas fa-lg fa-heart m-3"></i> {{ love.length }}
        </span>
        <span
          class="text-warning"
          v-if="mySadu.length == 1"
          @click="statusClear()"
          ><i class="fas fa-praying-hands m-3"></i> {{ sadu.length }}
        </span>
        <span class="text-dark" v-else @click="statusAdd('sadu')">
          <i class="fas fa-praying-hands m-3"></i> {{ sadu.length }}
        </span>
      </div>

      <div class="text-center">
        <div class="row">
          <div class="col-7 ms-auto">
            <input
              v-model="comm"
              type="text"
              class="form-control"
              required
              name="comment"
              placeholder="เขียนความคิดเห็น"
            />
          </div>
          <div class="col-auto me-auto">
            <input
              type="submit"
              @click="validate()"
              class="btn btn-outline-primary"
              value="ส่ง"
            />
          </div>
        </div>
      </div>
      <div v-if="comments != ''">
        <div
          class="content mx-auto my-3 col-lg-7 col-md-12 col-sm-12"
          v-for="comment in comments"
          :key="comment.comment_id"
        >
          <div class="d-flex">
            <div>
              {{ comment.comment_detail }}
            </div>
            <div class="ms-auto" v-if="info.member_level == 'teacher'">
              <button
                @click="delComment(comment.comment_id, comment.comment_detail)"
                class="btn btn-sm btn-outline-danger"
              >
                ลบ
              </button>
            </div>
          </div>
          <div class="text-end text-secondary">
            เมื่อวันที่ {{ comment.comment_timestamp.substr(0, 10) }} เวลา
            {{ comment.comment_timestamp.substr(11, 5) }}
          </div>
          <div class="text-end">
            {{ comment.member_fname }} {{ comment.member_lname }}
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      socials: "",
      comments: "",
      status: "",
      comm: "",
      sid: "",
      uid: "",
      like: "",
      love: "",
      sadu: "",
      myLike: "",
      myLove: "",
      mySadu: "",
    };
  },
  created() {
    this.info = JSON.parse(localStorage.getItem("formLogin"));
    if (this.info == null) {
      this.$router.push({ name: "index" });
    }
    axios
      .get(`http://localhost:5000/user/${this.info.s_id}`)
      .then((response) => {
        let data = response.data;
        this.info = { ...data };
        this.showSocial();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    showStatus() {
      axios
        .get(`http://localhost:5000/status/social/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.status = data;
          this.like = data.filter((array) => array.status_type == "like");
          this.love = data.filter((array) => array.status_type == "love");
          this.sadu = data.filter((array) => array.status_type == "sadu");
          this.myLike = data.filter(
            (array) =>
              array.status_type == "like" &&
              array.member_id == this.info.member_id
          );
          this.myLove = data.filter(
            (array) =>
              array.status_type == "love" &&
              array.member_id == this.info.member_id
          );
          this.mySadu = data.filter(
            (array) =>
              array.status_type == "sadu" &&
              array.member_id == this.info.member_id
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showComment() {
      axios
        .get(`http://localhost:5000/comment/social/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.comments = data;
          this.comments.reverse(); // order by desc
        })
        .catch((error) => {
          console.log(error);
        });
      this.showStatus();
    },
    showSocial() {
      axios
        .get(`http://localhost:5000/social/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.socials = data[0];
          this.showComment();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    comment() {
      axios
        .post(`http://localhost:5000/comment`, {
          detail: this.comm,
          sid: this.sid,
          uid: this.uid,
        })
        .then(() => {
          this.showComment();
          this.comm = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delComment(id, detail) {
      let con = confirm(`คุณต้องการลบคอมเมนต์ "${detail}" ?`);
      if (con) {
        axios
          .delete(`http://localhost:5000/comment/${id}`)
          .then(() => {
            this.showComment();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    statusClear() {
      axios
        .delete(`http://localhost:5000/status`, {
            params: {
                sid: this.socials.social_id,
                uid: this.info.member_id
            }
        })
        .then(() => {
          this.showStatus();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    statusAdd(type) {
      axios
        .post(`http://localhost:5000/status`, {
          type: type,
          sid: this.socials.social_id,
          uid: this.info.member_id,
        })
        .then(() => {
          this.showStatus();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.uid = this.info.member_id;
      this.sid = this.socials.social_id;
      this.comment();
    },
  },
};
</script>


<style scoped>
</style>