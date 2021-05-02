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

      <h3 class="text-center my-3">
        หมายเลขโพสต์
        <span class="text-primary">
          {{ socials.social_id }}
        </span>
      </h3>
      <p class="text-center col-lg-6 col-md-12 col-sm-12 mx-auto">
        <a :href="'http://localhost:5000' + socials.social_img" target="_blank">
          <img
            :src="'http://localhost:5000' + socials.social_img"
            alt=""
            class="img-fluid rounded"
          />
        </a>
      </p>
      <div class="content col-lg-7 col-md-12 col-sm-12 mx-auto" v-if="socials != ''">
        <div class="form-floating">
          <textarea
            v-model="$v.detail.$model" :class="{'is-danger text-danger': $v.detail.$error}"
            required
            name="detail"
            class="form-control"
            placeholder="เขียนโพสต์"
            id="floatingTextarea2"
            style="height: 100px"
          ></textarea>
          <template v-if="$v.detail.$error">
          <p class="help text-danger" v-if="!$v.detail.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.detail.minLength">This field must contain at least 10 letter</p>
        </template>
          
          <label for="floatingTextarea2">เขียนโพสต์</label>
        </div>
        <p class="text-end my-1">
          เผยแพร่เมื่อ {{ socials.social_timestamp.substr(0, 10) }} เวลา
          {{ socials.social_timestamp.substr(11, 5) }}
        </p>
        <p class="text-center">
          <input
            @click="validate()"
            type="submit"
            class="btn btn-info"
            value="อัปเดต"
          />
          
        </p>

        <p class="text-end">
          <button @click="delSocial()" class="btn btn-outline-danger">
            ลบ
          </button>
        </p>
      </div>

      <br /><br />
    </div>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      socials: "",
      detail: "",
      sid: "",
    };
  },

  validations:{
    detail:{
      required,
      minLength: minLength(10)

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
    this.showSocial();
  },
  methods: {
    showSocial() {
      axios
        .get(`http://localhost:5000/social/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data;
          this.socials = data[0];
          this.detail = this.socials.social_detail
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSocial() {
      axios
        .put(`http://localhost:5000/social/${this.socials.social_id}`, {
          detail: this.detail,
          sid: this.socials.social_id,
        })
        .then((response) => {
          let data = response.data;
          this.showSocial()
          alert(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delSocial() {
      let con = confirm("คุณแน่ใจที่จะลบโพสต์นี้ ?");
      if (con) {
        axios
          .delete(`http://localhost:5000/social/${this.socials.social_id}`)
          .then((response) => {
            let data = response.data;
            alert(data.message);
            this.$router.push({ name: "msocial" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
          return
      }
    },
    validate() {
      this.$v.$touch();

      if(!this.$v.$invalid){
        this.sid = this.socials.social_id;
        console.log(this.detail)
      this.updateSocial();
      }
    },
  },
};
</script>


<style scoped>
</style>