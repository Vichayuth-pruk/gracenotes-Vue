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

      <div class="content" v-if="reports != ''">
        <p>
          หมายเลขกระทู้
          <span class="text-primary">
            {{ reports.report_id }}
          </span>
        </p>
        <h3>
          {{ reports.report_topic }}
        </h3>
        <p>
          {{ reports.report_detail }}
        </p>
        <p class="text-end">
          ส่งเมื่อ
          {{ reports.report_timestamp.substr(0, 10) }} เวลา
          {{ reports.report_timestamp.substr(11, 5) }}
        </p>
      </div>
      <div class="my-3 mx-auto col-lg-6 col-md-12 col-sm-12">
        <label for="detail">ตอบกลับ</label>
        <input
          v-model="$v.detail.$model" :class="{'is-danger text-danger': $v.detail.$error}"
          type="text"
          placeholder="ตอบกลับ"
          class="form-control"
          required
          name="detail"
          id=""
        />
        <template v-if="$v.detail.$error">
          <p class="help text-danger" v-if="!$v.detail.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.detail.minLength">This field must contain at least 5 character </p>
        </template>
        <p class="text-center my-3">
          <input
            @click="validate()"
            type="submit"
            class="btn btn-primary"
            value="ตอบ"
          />
        </p>
      </div>
      <div v-if="replys != ''">
        <div class="content my-3" v-for="reply in replys" :key="reply.reply_id">
          <p class="text-end">
            <button
              @click="delReply(reply.reply_id)"
              class="btn btn-outline-danger"
            >
              ลบ
            </button>
          </p>
          <h3>
            {{ reply.reply_detail }}
          </h3>
          <p>
            ตอบกลับเมื่อ
            {{ reply.reply_timestamp.substr(0, 10) }} เวลา
            {{ reply.reply_timestamp.substr(11, 5) }}
          </p>
        </div>
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
      reports: "",
      replys: "",
      detail: "",
      sid: "",
      uid: "",
    };
  },

  validations:{
    detail:{
      required,
      minLength: minLength(5)
    },

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
          let rp = response.data.rp;
          let rpl = response.data.rpl;
          this.reports = rp.filter(
            (array) => array.report_id == this.$route.params.id
          );
          this.reports = this.reports[0];
          this.replys = rpl.filter(
            (array) => array.report_id == this.$route.params.id
          );
          this.replys.reverse(); // order by desc
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reply() {
      axios
        .post(`http://localhost:5000/reply`, {
          detail: this.detail,
          sid: this.sid,
          uid: this.uid,
        })
        .then(() => {
          this.showReport();
          this.detail = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delReply(id) {
      let con = confirm(`คุณต้องการลบตอบกลับนี้ ?`);
      if (con) {
        axios
          .delete(`http://localhost:5000/reply/${id}`)
          .then(() => {
            this.showReport();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    validate() {
      this.$v.$touch();

      if(!this.$v.$invalid){
        this.sid = this.reports.report_id;
      this.uid = this.info.member_id;
      this.reply();
      }
      
    },
  },
};
</script>


<style scoped>
</style>