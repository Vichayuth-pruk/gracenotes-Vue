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
      <h3>
        บันทึกความดีของ
        <span class="text-warning">
          {{ info.member_fname }} {{ info.member_lname }}
        </span>
      </h3>
      <br />
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            ทั้งหมด
            <span class="badge bg-warning"> {{ graceTotal.length }} </span>
          </button>
          <button
            class="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            รับรอง <span class="badge bg-success"> {{ graceYes.length }} </span>
          </button>
          <button
            class="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            ไม่รับรอง
            <span class="badge bg-danger"> {{ graceNo.length }} </span>
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
        <br>
          <div class="row">
            <div
              class="col-lg-3 col-md-6 col-sm-12"
              v-for="graces in graceTotal"
              :key="graces.grace_id"
            >
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
                  </div>
                  <span class="text-secondary">{{ graces.grace_agency }}</span>
                  <p class="text-end">
                    วันที่ {{ graces.grace_date.substr(0, 10) }} <br />
                  </p>
                </div>
                <a
                  :href="'/view/' + graces.grace_id"><img
                    :src="'http://localhost:5000' + graces.grace_img"
                    class="rounded card-img-bottom"
                /></a>
              </div>
              <br />
            </div>
            
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div class="row">

              <div
              class="col-lg-3 col-md-6 col-sm-12"
              v-for="graces in graceYes"
              :key="graces.grace_id"
            >
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
                  </div>
                  <span class="text-secondary">{{ graces.grace_agency }}</span>
                  <p class="text-end">
                    วันที่ {{ graces.grace_date.substr(0, 10) }} <br />
                  </p>
                </div>
                <a
                  :href="'/view/' + graces.grace_id"
                  target="_blank"
                  ><img
                    :src="'http://localhost:5000' + graces.grace_img"
                    class="rounded card-img-bottom"
                /></a>
              </div>
              <br />
            </div>

          </div>
        </div>
        <div
          class="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div class="row">

              <div
              class="col-lg-3 col-md-6 col-sm-12"
              v-for="graces in graceNo"
              :key="graces.grace_id"
            >
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
                  </div>
                  <span class="text-secondary">{{ graces.grace_agency }}</span>
                  <p class="text-end">
                    วันที่ {{ graces.grace_date.substr(0, 10) }} <br />
                  </p>
                </div>
                <a
                  :href="'/view/' + graces.grace_id"
                  target="_blank"
                  ><img
                    :src="'http://localhost:5000' + graces.grace_img"
                    class="rounded card-img-bottom"
                /></a>
              </div>
              <br />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      graceTotal: "",
      graceYes: "",
      graceNo: "",
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
      .get(`http://localhost:5000/grace`)
      .then((response) => {
        let data = response.data;
        //Total
        this.graceTotal = data.filter(
          (array) => array.member_id == this.info.member_id
        );
        this.graceTotal.reverse();
        //อนุมัติ
        this.graceYes = data.filter(
          (array) =>
            array.member_id == this.info.member_id &&
            array.grace_check == "ผ่าน"
        );
        this.graceYes.reverse();
        //ไม่อนุมัติ
        this.graceNo = data.filter(
          (array) =>
            array.member_id == this.info.member_id &&
            array.grace_check == "ไม่ผ่าน"
        );
        this.graceNo.reverse();
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