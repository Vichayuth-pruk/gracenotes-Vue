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
              <a class="nav-link active" href="/grace"
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
      <p>
        “ความดี” คือการทำให้เกิดผลดีอย่างมีคุณค่าต่อผู้อื่น ต่อส่วนรวม
        รวมถึงต่อตนเอง ดังนี้<br />
        &nbsp;&nbsp;&nbsp;&nbsp;● ผลดีต่อผู้อื่น โดยเฉพาะที่ไม่จำกัดพวก เหล่า
        ศาสนา เชื้อชาติ ฯลฯ<br />
        &nbsp;&nbsp;&nbsp;&nbsp;● ผลดีต่อส่วนรวม รวมถึงต่อหมู่คณะ ต่อองค์กร
        ต่อชุมชน ต่อสังคม ต่อโลก ฯลฯ<br />
        &nbsp;&nbsp;&nbsp;&nbsp;● ผลดีต่อตนเอง
        ได้แก่การพัฒนาตนเองอย่างเป็นคุณและสร้างสรรค์ รวมถึงการพัฒนาทางกาย
        ทางอารมณ์ ทางความคิด ทางจิตวิญญาณ ทางสติ ปัญญา ความสามารถ ฯลฯ<br />
        “ความดี” เป็นสิ่งที่มีมาในอดีต มีอยู่ในปัจจุบัน และจะมีต่อไปในอนาคต<br />
        “ความดี” คืออุดมการณ์อันสูงส่ง ของสังคมที่พึงปรารถนา<br />
        “ความดี” คือรากฐานอันแน่นลึก ของสังคมอุดมธรรม<br />
        “ความดี” คือแรงขับเคลื่อนอันทรงพลัง
        ซึ่งจะช่วยให้สังคมเคลื่อนไปในทิศทางที่พึงประสงค์<br />
        “ความดี” คือสายใยอันนุ่มเหนียว ที่ร้อยโยงผู้คนหลากหลายไปสู่ความสันติ
        ความเจริญ และความสุข ร่วมกัน
      </p>
      <br />
      <h3>ความดีของฉัน ล่าสุด</h3>
      <div class="mx-auto col-lg-6 col-md-8 col-sm-12" v-if="graces != ''">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div>
                <span
                  :class="{
                    badge: true,
                    'bg-secondary': graces[0].grace_check == 'รอการอนุมัติ',
                    'bg-danger': graces[0].grace_check == 'ไม่ผ่าน',
                    'bg-success': graces[0].grace_check == 'ผ่าน',
                  }"
                >
                  <span v-if="graces[0].grace_check == 'รอการอนุมัติ'"
                    >รอการรับรอง</span
                  >
                  <span v-else-if="graces[0].grace_check == 'ไม่ผ่าน'"
                    >ไม่รับรอง</span
                  >
                  <span v-else>รับรองแล้ว</span>
                </span>
              </div>
              <div class="ms-auto">
                <i class="fas fa-info-circle"></i> บันทึกเมื่อ
                {{ graces[0].grace_timestamp.substr(0, 10) }}
              </div>
            </div>
            <span class="text-secondary">{{ graces[0].grace_agency }}</span>
            <p style="font-size: x-large">{{ graces[0].grace_detail }}</p>
            <p class="text-end">
              เป็นเวลา {{ graces[0].grace_time.substr(0, 5) }} ชั่วโมง
              เมื่อวันที่ {{ graces[0].grace_date.substr(0, 10) }} <br />
              โดย {{ info.member_fname }} {{ info.member_lname }}
            </p>
          </div>
          <a
            :href="'http://localhost:5000' + graces[0].grace_img"
            target="_blank"
            ><img
              :src="'http://localhost:5000' + graces[0].grace_img"
              class="rounded card-img-bottom"
          /></a>
        </div>
        <br />
      </div>
      <br /><br />
      <div class="text-center fixed-bottom">
        <br />
        <a href="/addgrace"
          ><button class="btn btn-lg btn-success">
            <i class="fas fa-plus-circle"></i> เพิ่มบันทึกความดี
          </button></a
        >
        <br /><br />
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
      .get(`http://localhost:5000/grace`)
      .then((response) => {
        let data = response.data;
        this.graces = data.filter(
          (array) => array.member_id == this.info.member_id
        );
        this.graces.reverse();
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