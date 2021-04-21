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
                  <a class="dropdown-item" href="/mygrace">บันทึกความดีของฉัน</a>
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
      <div class="mx-auto col-lg-6 col-md-8 col-sm-12" v-if="graces != ''">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div>
                <span
                  :class="{
                    badge: true,
                    'bg-secondary': graces.grace_check == 'รอการอนุมัติ',
                    'bg-danger': graces.grace_check == 'ไม่ผ่าน',
                    'bg-success': graces.grace_check == 'ผ่าน',
                  }"
                >
                  <span v-if="graces.grace_check == 'รอการอนุมัติ'"
                    >รอการรับรอง</span
                  >
                  <span v-else-if="graces.grace_check == 'ไม่ผ่าน'"
                    >ไม่รับรอง</span
                  >
                  <span v-else>รับรองแล้ว</span>
                </span>
              </div>
              <div class="ms-auto">
                <i class="fas fa-info-circle"></i> บันทึกเมื่อ
                {{ graces.grace_timestamp.substr(0, 10) }}
              </div>
            </div>
            <span class="text-secondary">{{ graces.grace_agency }}</span>
            <p style="font-size: x-large">{{ graces.grace_detail }}</p>
            <p class="text-end">
              เป็นเวลา {{ graces.grace_time.substr(0, 5) }} ชั่วโมง
              เมื่อวันที่ {{ graces.grace_date.substr(0, 10) }} <br />
              โดย {{ info.member_fname }} {{ info.member_lname }}
            </p>
          </div>
          <a
            :href="'http://localhost:5000' + graces.grace_img"
            target="_blank"
            ><img
              :src="'http://localhost:5000' + graces.grace_img"
              class="rounded card-img-bottom"
          /></a>
        </div>
        <br />
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
      graces: "",
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

    axios
      .get(`http://localhost:5000/grace/${this.$route.params.id}`)
      .then((response) => {
        let data = response.data;
        this.graces = data[0]
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>


<style scoped>
</style>