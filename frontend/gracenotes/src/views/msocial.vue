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
              <a class="nav-link text-danger active" href="/admin"
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
    <br /><br /><br />

    <div class="container">
      <a href="/admin"
        ><button class="btn btn-primary m-1">ตรวจบันทึกความดี</button></a
      >
      <a href="/msocial"
        ><button class="btn btn-success m-1">จัดการโพสต์</button></a
      >
      <a href="/maccount"
        ><button class="btn btn-info m-1">จัดการบัญชีนักเรียน</button></a
      >
      <a href="/mreport"
        ><button class="btn btn-warning m-1">จัดการรายงานปัญหา</button></a
      >
      <br /><br />

      <div class="row my-3">
        <div class="col-auto">
          <input
          v-model="sr"
            type="text"
            class="form-control"
            placeholder="ค้นหา"
            name="key"
            required
          />
        </div>
        <div class="col-auto">
          <button @click="validate()" type="submit" class="btn btn-info">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <td class="text-center">หมายเลขโพสต์</td>
            <td class="text-center">เวลา</td>
            <td class="text-center">Edit</td>
            <td class="text-center">View</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="socials != ''">
            <tr v-for="social in socials" :key="social.social_id">
              <td class="text-center">
                {{ social.social_id }}
              </td>
              <td class="text-center">
                เผยแพร่เมื่อ {{ social.social_timestamp.substr(0, 10) }}
                {{ social.social_timestamp.substr(11, 5) }}
              </td>
              <td class="text-center">
                <a :href="'/msocialedit/' + social.social_id">
                  <button class="btn btn-secondary">
                    <i class="fas fa-edit"></i>
                  </button>
                </a>
              </td>
              <td class="text-center">
                <a :href="'/social/' + social.social_id">
                  <button class="btn btn-info">
                    <i class="fas fa-eye"></i>
                  </button>
                </a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <br /><br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      socials: "",
      sr: "",
    };
  },
  created() {
    this.info = JSON.parse(localStorage.getItem("formLogin"));
    if (this.info == null || this.info.s_level != "teacher") {
      this.$router.push({ name: "index" });
    }
    axios
      .get(`http://localhost:5000/user/${this.info.s_id}`)
      .then((response) => {
        let data = response.data;
        this.info = data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.showSocial();
  },
  methods: {
    showSocial() {
      axios
        .get(`http://localhost:5000/social`)
        .then((response) => {
          let data = response.data;
          this.socials = data;
          this.socials.reverse()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search(){
        axios
        .get(`http://localhost:5000/social/search/${this.sr}`)
        .then((response) => {
            let data = response.data;
            this.socials = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
        this.search()
    },
  },
};
</script>


<style scoped>
</style>