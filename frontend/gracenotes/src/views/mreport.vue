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
            v-model="$v.sr.$model" :class="{'is-danger text-danger': $v.sr.$error}"
            type="text"
            class="form-control"
            placeholder="ค้นหา"
            name="key"
            required
          />
          <template v-if="$v.sr.$error">
          <p class="help text-danger" v-if="!$v.sr.required">This field is required</p>
        </template>
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
            <td class="text-center">หมายเลกระทู้</td>
            <td class="text-center">หัวข้อ</td>
            <td class="text-center">สถานะ</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.report_id">
            <td class="text-center">
              {{ report.report_id }}
            </td>
            <td class="text-center">
              {{ report.report_topic }}
            </td>
            <td class="text-center">
              <a :href="'/reply/' + report.report_id">
                <span class="badge bg-secondary" v-if="report.totalReply == 0"
                  >รอการตอบกลับ</span
                >
                <span class="badge bg-success" v-else>ตอบกลับแล้ว</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

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
      reports: "",
      replys: "",
      sr: "",
    };
  },
  validations:{
    sr:{
      required: required
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
    this.showReport();
  },
  methods: {
    showReport() {
      axios
        .get(`http://localhost:5000/report`)
        .then((response) => {
          let data = response.data;
          this.reports = data.rp;
          this.replys = data.rpl;
          this.reports.reverse(); // order by desc
          // count Reply
          this.reports.forEach((item, index) => {
            let cout = 0;
            this.replys.forEach((jtem) => {
              if (item.report_id == jtem.report_id) {
                cout++;
              }
            });
            this.reports[index] = {
              ...this.reports[index],
              totalReply: cout,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      axios
        .get(`http://localhost:5000/report/search/${this.sr}`)
        .then((response) => {
          let data = response.data;
          this.reports = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        this.search()
      }
    },
  },
};
</script>


<style scoped>
</style>