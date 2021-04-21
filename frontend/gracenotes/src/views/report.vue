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
            v-model="head"
            class="form-control"
            placeholder="หัวข้อ"
            name="head"
            maxlength="100"
            required
          />
          <label for="body">รายละเอียด</label>
          <textarea
            name="body"
            v-model="body"
            class="form-control"
            placeholder="รายะเอียด"
            cols="30"
            rows="2"
            required
          ></textarea>
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
                  <a style="text-decoration: none; color: black" href="">
                    {{ item.report_topic }} {{ item.totalReply }}
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
      let formData = new formData();
      formData.append("head", this.head);
      formData.append("body", this.body);
      formData.append("sid", this.sid);
      axios
        .post(`http://localhost:5000/report`, formData)
        .then(() => {
          this.showReport();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countReply(tId) {
      axios
        .get(`http://localhost:5000/reply`)
        .then((response) => {
          let data = response.data;
          let amount = data.filter((array) => array.report_id == tId).length;
          console.log("แรก")
          return amount
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showReport() {
      axios
        .get(`http://localhost:5000/report`)
        .then((response) => {
          let data = response.data;
          this.reports = data.filter(
            (array) => array.member_id == this.info.member_id
          );
          this.reports.forEach((item) => {
            let amount = this.countReply(item.report_id); // <-- Call Function please wait for return
            console.log(amount+"สอง") 
          });
          this.reports.reverse(); // order by desc

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