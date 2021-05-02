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
      <h3>จัดการบันทึกความดี</h3>
      <div class="row my-3">
        <div class="col-auto">
          <input
            v-model="$v.sr.$model" :class="{'is-danger text-danger': $v.sr.$error}"
            type="text"
            class="form-control"
            placeholder="ค้นหา"
            required
          />
          <template v-if="$v.sr.$error">
          <p class="help text-danger" v-if="!$v.sr.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.sr.search">spacebar at first string is not allowed</p>
        </template>
        </div>
        <div class="col-auto">
          <button @click="validate()" type="submit" class="btn btn-info">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            ความดีทั้งหมด
            <span class="badge bg-light text-dark">
              {{ graces.length }}
            </span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            รอการตรวจ
            <span class="badge bg-light text-dark">
              {{ gracesWait.length }}
            </span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-contact-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-contact"
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            ตรวจแล้ว
            <span class="badge bg-light text-dark">
              {{ gracesCheck.length }}
            </span>
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <td class="text-center">หมายเลขบันทึก</td>
                <td class="text-center">ผู้บันทึก</td>
                <td class="text-center">สถานะตรวจ</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grace in graces" :key="grace.grace_id">
                <td class="text-center">
                  {{ grace.grace_id }}
                </td>
                <td class="text-center">
                  {{ grace.member_fname }} {{ grace.member_lname }}
                </td>
                <td class="text-center">
                  <a :href="'/mview/' + grace.grace_id">
                    <span
                      class="badge bg-secondary"
                      v-if="grace.grace_check == 'รอการอนุมัติ'"
                      >รอการตรวจ</span
                    >
                    <span class="badge bg-success" v-else>ตรวจแล้ว</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <td class="text-center">หมายเลขบันทึก</td>
                <td class="text-center">ผู้บันทึก</td>
                <td class="text-center">สถานะตรวจ</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grace in gracesWait" :key="grace.grace_id">
                <td class="text-center">
                  {{ grace.grace_id }}
                </td>

                <td class="text-center">
                  {{ grace.member_fname }} {{ grace.member_lname }}
                </td>
                <td class="text-center">
                  <a :href="'/mview/' + grace.grace_id">
                    <span
                      class="badge bg-secondary"
                      v-if="grace.grace_check == 'รอการอนุมัติ'"
                      >รอการตรวจ</span
                    >
                    <span class="badge bg-success" v-else>ตรวจแล้ว</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <td class="text-center">หมายเลขบันทึก</td>
                <td class="text-center">ผู้บันทึก</td>
                <td class="text-center">สถานะตรวจ</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grace in gracesCheck" :key="grace.grace_id">
                <td class="text-center">
                  {{ grace.grace_id }}
                </td>

                <td class="text-center">
                  {{ grace.member_fname }} {{ grace.member_lname }}
                </td>
                <td class="text-center">
                  <a :href="'/mview/' + grace.grace_id">
                    <span
                      class="badge bg-secondary"
                      v-if="grace.grace_check == 'รอการอนุมัติ'"
                      >รอการตรวจ</span
                    >
                    <span class="badge bg-success" v-else>ตรวจแล้ว</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <br /><br />
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from "axios";

function search(value){
  if(value[0] == " "){
    return false
  }

  return true
}


export default {
  data() {
    return {
      info: null,
      graces: "",
      gracesWait: "",
      gracesCheck: "",
      sr: "",
    };
  },
  validations:{
    sr:{
      required,
      search: search
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
        .get(`http://localhost:5000/grace`)
        .then((response) => {
          let data = response.data;
          this.graces = data;
          this.gracesWait = this.graces.filter(
            (array) => array.grace_check == "รอการอนุมัติ"
          );
          this.gracesCheck = this.graces.filter(
            (array) => array.grace_check != "รอการอนุมัติ"
          );
          this.graces.reverse(); // order by desc
          this.gracesWait.reverse(); // order by desc
          this.gracesCheck.reverse(); // order by desc
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchGrace() {
      axios
        .get(`http://localhost:5000/grace/search/${this.sr}`)
        .then((response) => {
          let data = response.data;
          this.graces = data;
          this.gracesWait = this.graces.filter(
            (array) => array.grace_check == "รอการอนุมัติ"
          );
          this.gracesCheck = this.graces.filter(
            (array) => array.grace_check != "รอการอนุมัติ"
          );
          this.graces.reverse(); // order by desc
          this.gracesWait.reverse(); // order by desc
          this.gracesCheck.reverse(); // order by desc
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.$v.$touch();
      
      if(!this.$v.$invalid){
        this.searchGrace();
      }

      
    },
  },
};
</script>


<style scoped>
</style>