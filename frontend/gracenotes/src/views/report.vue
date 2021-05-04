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
              <a class="nav-link active" href="/report"
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
    <br /><br /><br />

    <div class="container">
      <h3>รายงานปัญหา</h3>
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12 mx-auto">
          <label for="head">หัวข้อ</label>
          <input
            type="text"
            v-model="$v.head.$model" :class="{'is-danger text-danger': $v.head.$error}"
            class="form-control"
            placeholder="หัวข้อ"
            name="head"
            required
          />
          <template v-if="$v.head.$error">
          <p class="help text-danger" v-if="!$v.head.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.head.maxLength">This field can contain 100 letters</p>
        </template>
          <label for="body">รายละเอียด</label>
          <textarea
            name="body"
            v-model="$v.body.$model" :class="{'is-danger text-danger': $v.body.$error}"
            class="form-control"
            placeholder="รายะเอียด"
            cols="30"
            rows="2"
            required
          ></textarea>
          <template v-if="$v.body.$error">
          <p class="help text-danger" v-if="!$v.body.required">This field is required</p>
        </template>
          <br />
          <p class="text-center">
            <input
              type="submit"
              class="btn btn-warning"
              value="ส่งรายงาน"
              @click="validate()"
            />
          </p>
        </div>
      </div>
      <br />

      <h3>กล่องรายงานปัญหา</h3>
      <div class="content">
        <table class="table table-hover">
          <thead>
            <tr>
              <td class="col-lg-10">
                <p class="text-center">หัวข้อ</p>
              </td>
              <td class="col-lg-2">
                <p class="text-center">สถานะ</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reports" :key="item.report_id">
              <td>
                <div class="d-flex">
                  <a
                    style="text-decoration: none; color: black"
                    :href="'/viewreport/' + item.report_id"
                  >
                    {{ item.report_topic }}
                  </a>
                  <div class="ms-auto">
                    <i class="fas fa-info-circle"></i> ส่งเมื่อ
                    {{ item.report_timestamp.substr(0, 10) }}
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <div class="mx-auto">
                    <span
                      :class="{
                        badge: true,
                        'bg-secondary': item.totalReply == 0,
                        'bg-info': item.totalReply != 0,
                      }"
                    >
                      <span v-if="item.totalReply == 0">ยังไม่มีการตอบรับ</span>
                      <span v-else>ตอบรับแล้ว </span>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br /><br />
    </div>
  </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      reports: "",
      replys: "",
      head: "",
      body: "",
      sid: "",
    };
    
  },
  validations:{
    head:{
      required,
      maxLength: maxLength(100)
      
    },
    body:{
      required,


      
    }
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
      })
      .catch((error) => {
        console.log(error);
      });
    this.showReport();
  },
  methods: {
    report() {
      axios
        .post(`http://localhost:5000/report`, {
          head: this.head,
          body: this.body,
          sid: this.sid,
        })
        .then(() => {
          this.showReport()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showReport() {
      axios
        .get(`http://localhost:5000/report`)
        .then((response) => {
          let rp = response.data.rp;
          let rpl = response.data.rpl;
          this.reports = rp.filter(
            (array) => array.member_id == this.info.member_id
          );
          this.reports.reverse(); // order by desc
          for (let i = 0; i < this.reports.length; i++) {
            var cout = 0;
            for (let j = 0; j < rpl.length; j++) {
              if (this.reports[i].report_id == rpl[j].report_id) {
                cout++;
              }
            }
            this.reports[i] = {
              ...this.reports[i],
              totalReply: cout,
            };
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.$v.$touch();

      if(!this.$v.$invalid){
        this.sid = this.info.member_id;
      this.report();
      }
    },
  },
};
</script>


<style scoped>
</style>