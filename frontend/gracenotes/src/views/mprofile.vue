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

      <p class="text-center">
        <a :href="'http://localhost:5000' + users.member_img" target="_blank"
          ><img
            :src="'http://localhost:5000' + users.member_img"
            class="img-fluid"
            style="border-radius: 8px; width: 25%"
            alt=""
        /></a>
      </p>
      <div class="content mx-auto col-lg-7 col-md-12 col-sm-12">
        <h3>
          ผู้ใช้หมายเลข
          <span class="text-primary">
            {{ users.member_id }}
          </span>
        </h3>
        <form action="app.php?func=profile" method="POST">
          <label for="id">รหัสนักเรียน</label>
          <input
            v-model="users.member_user"
            type="text"
            class="form-control"
            name="id"
            value=""
            placeholder="รหัสนักเรียน"
            maxlength="10"
            required
          />
          <div class="row g-2">
            <div class="col">
              <label for="fname">ชื่อ</label>
              <input
                v-model="users.member_fname"
                type="text"
                class="form-control"
                name="fname"
                value=""
                placeholder="ชื่อ"
                maxlength="30"
                required
              />
            </div>
            <div class="col">
              <label for="lname">นามสกุล</label>
              <input
                v-model="users.member_lname"
                type="text"
                class="form-control"
                name="lname"
                value=""
                placeholder="นามสกุล"
                maxlength="30"
                required
              />
            </div>
          </div>
          <label for="class">ห้องเรียน</label>
          <input
            v-model="users.member_class"
            type="text"
            class="form-control"
            name="class"
            value=""
            placeholder="ห้องเรียน"
            maxlength="5"
            required
          />
          <label for="no">เลขที่</label>
          <input
            v-model="users.member_no"
            type="number"
            class="form-control"
            name="no"
            value=""
            placeholder="เลขที่"
            min="1"
            max="99"
            required
          />
          <label for="dob">วัน/เดือน/ปี เกิด</label>
          <input
            v-model="users.member_dob"
            type="date"
            class="form-control"
            name="dob"
            value=""
            placeholder="วัน/เดือน/ปี เกิด"
            required
          />
          <label for="address">ที่อยู่</label>
          <input
            v-model="users.member_address"
            type="text"
            class="form-control"
            name="address"
            value=""
            placeholder="ที่อยู่"
            required
          />
          <br />
          <p class="text-center" v-if="users.member_id != info.member_id">
            <span v-if="users.member_level == 'student'">
              <input
                @click="level('teacher')"
                type="button"
                class="mx-1 btn btn-outline-primary"
                value="ตั้งเป็นบทบาทครู"
              />
            </span>
            <span v-else>
              <input
                @click="level('student')"
                type="button"
                class="mx-1 btn btn-outline-secondary"
                value="ตั้งเป็นบทบาทนักเรียน"
              />
            </span>
            <input
              @click="delUser()"
              type="button"
              class="mx-1 btn btn-outline-danger"
              value="ลบ"
            />
          </p>
        </form>
      </div>

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
      users: "",
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
    this.showUser();
  },
  methods: {
    showUser() {
      axios
        .get(`http://localhost:5000/user/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.users = data;
          this.users.member_dob = this.users.member_dob.substr(0, 10);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delUser() {
      let con = confirm(
        `คุณแน่ใจว่าจะลบบัญชี ${this.users.member_fname} ${this.users.member_lname} ?`
      );
      if (con) {
        axios
          .delete(`http://localhost:5000/user/${this.users.member_id}`)
          .then((response) => {
            let data = response.data;
            alert(data.message);
            this.$router.push({ name: "maccount" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    level(type) {
      axios
        .put(`http://localhost:5000/user/level`, {
          level: type,
          sid: this.users.member_id,
        })
        .then((response) => {
          let data = response.data;
          alert(data.message);
          this.showUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
</style>