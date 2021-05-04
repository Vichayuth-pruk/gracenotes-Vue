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

      <div
        class="content col-lg-7 col-md-12 col-sm-12 mx-auto"
        v-if="graces != ''"
      >
        <p class="text-center">
          <a :href="'http://localhost:5000' + graces.grace_img" target="_blank">
            <img
              :src="'http://localhost:5000' + graces.grace_img"
              alt=""
              class="img-fluid rounded"
            />
          </a>
        </p>
        <div class="text-secondary">
          {{ graces.grace_agency }}
        </div>
        <p>
          {{ graces.grace_detail }}
        </p>
        <p class="text-end">
          เป็นเวลา {{ graces.grace_time.substr(0, 5) }} ชั่วโมง เมื่อวันที่
          {{ graces.grace_date.substr(0, 10) }}<br />
          โดย
          <a
            :href="'/mprofile/' + graces.member_id"
            style="text-decoration: none"
          >
            {{ graces.member_fname }} {{ graces.member_lname }}
          </a>
        </p>

        <div class="form-floating">
          <textarea
            v-model="$v.details.$model" :class="{'is-danger text-danger': $v.details.$error}"
            required
            name="detail"
            class="form-control"
            placeholder="เขียนโพสต์"
            id="floatingTextarea2"
            style="height: 100px"
          ></textarea>
          <template v-if="$v.details.$error">
          <p class="help text-danger" v-if="!$v.details.required">This field is required</p>
        </template>
          <label for="floatingTextarea2">เขียนโพสต์</label>
        </div>
        <br />
        <p class="text-center">
          <input
            type="submit"
            class="btn btn-primary"
            @click="validate()"
            value="เผยแพร่"
          />
        </p>
      </div>

      <br /><br />
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      graces: "",
      details: "",
      img: "",
      uid: "",
    };
  },
  validations:{
    img:{
      required,
      
    },
    details:{
      required,
      
    },
    uid:{
      required,
      
    }
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
    this.showGrace();
  },
  methods: {
    showGrace() {
      axios
        .get(`http://localhost:5000/grace/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.graces = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Social() {
      axios
        .post(`http://localhost:5000/social`, {
            img: this.img,
            detail: this.details,
            uid: this.uid
        })
        .then((response) => {
          let data = response.data;
          alert(data.message)
          this.$router.push({ path: `/social/${data.id}` });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.img = this.graces.grace_img;
      this.uid = this.info.member_id;
      let con = confirm("ยืนยันเผยแพร่ ?")
      if (con) {
          this.Social();
      }else{
          return
      }
    },
  },
};
</script>


<style scoped>
</style>