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
    <br /><br /><br />

    <div class="container">
            <div class="col-lg-9 col-md-12 col-sm-12 mx-auto" v-for="report in reports" :key="report.report_id">
                <div class="content">
                    <h4>
                        {{report.report_topic}}
                    </h4>
                    <p>
                        {{report.report_detail}}
                    </p>
                    <p class="text-end">ส่งเมื่อ
                        {{report.report_timestamp.substr(0, 10)}} {{report.report_timestamp.substr(11, 5)}}
                    </p>
                </div>
            </div>
            <div class="col-lg-9 col-md-12 col-sm-12 my-3">
                <h3>กล่องรายงานตอบกลับ</h3>
            </div>

            <div class="col-lg-9 col-md-12 col-sm-12 mx-auto my-3" v-for="reply in replys" :key="'reply' + reply.reply_id">
                <div class="content">
                    <h5>
                        {{reply.reply_detail}}
                    </h5>
                    <p>ตอบกลับเมื่อ
                        {{reply.reply_timestamp.substr(0, 10)}} {{reply.reply_timestamp.substr(11, 5)}}
                    </p>
                </div>
            </div>
            
            <br><br>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      reports: "",
      replys: "",
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
          this.replys = rpl.filter(
              (array) => array.report_id == this.$route.params.id
          )
          this.replys.reverse(); // order by desc
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.sid = this.info.member_id;
      this.report();
    },
  },
};
</script>


<style scoped>
</style>