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
      <p class="text-center">
        <a
          :href="'http://localhost:5000' + formMembers.member_img"
          target="_blank"
          ><img
            :src="'http://localhost:5000' + formMembers.member_img"
            class="img-fluid"
            style="border-radius: 8px; width: 25%"
            alt=""
        /></a>
      </p>
      <div class="content mx-auto col-lg-7 col-md-12 col-sm-12">
        <h3>แก้ไขข้อมูลบัญชีผู้ใช้</h3>
        <label for="id">รหัสนักเรียน</label>
        <input
          type="text"
          v-model="formMembers.member_user"
          class="form-control"
          name="id"
          value=""
          readonly
          placeholder="รหัสนักเรียน"
          maxlength="10"
        />
        <div class="row g-2">
          <div class="col">
            <label for="fname">ชื่อ</label>
            <input
              type="text"
              v-model="formMembers.member_fname"
              class="form-control"
              name="fname"
              value=""
              placeholder="ชื่อ"
              maxlength="30"
              required
            />
          </div>
          <div class="col">
            <label for="lname">นามสกุล</label>
            <input
              type="text"
              v-model="formMembers.member_lname"
              class="form-control"
              name="lname"
              placeholder="นามสกุล"
              maxlength="30"
              required
            />
          </div>
        </div>
        <label for="class">ห้องเรียน</label>
        <input
          type="text"
          v-model="formMembers.member_class"
          class="form-control"
          name="class"
          value=""
          placeholder="ห้องเรียน"
          maxlength="5"
          required
        />
        <label for="no">เลขที่</label>
        <input
          type="number"
          v-model="formMembers.member_no"
          class="form-control"
          name="no"
          value=""
          placeholder="เลขที่"
          min="1"
          max="99"
          required
        />
        <label for="dob">วัน/เดือน/ปี เกิด</label>
        <input
          type="date"
          v-model="formMembers.member_dob"
          class="form-control"
          name="dob"
          value=""
          placeholder="วัน/เดือน/ปี เกิด"
          required
        />
        <label for="address">ที่อยู่</label>
        <input
          type="text"
          v-model="formMembers.member_address"
          class="form-control"
          name="address"
          value=""
          placeholder="ที่อยู่"
          required
        />
        <label for="pass">รหัสผ่านใหม่</label>
        <input
          type="password"
          v-model="pass"
          class="form-control"
          name="pass"
          value=""
          placeholder="รหัสผ่านใหม่"
          maxlength="15"
          required
        />
        <label for="repass">ยืนยันรหัสผ่านใหม่</label>
        <input
          type="password"
          v-model="repass"
          class="form-control"
          name="repass"
          value=""
          placeholder="ยืนยันรหัสผ่านใหม่"
          maxlength="15"
          required
        />
        <br />
        <p class="text-center">
          <input
            type="submit"
            class="btn btn-info"
            value="อัปเดต"
            @click="validate()"
          />
        </p>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      formMembers: "",
      pass: "",
      repass: "",
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
        //copy data
        this.info = { ...data };
        this.formMembers = {
          ...data,
        };
        // iso date to short date
        this.formMembers.member_dob = this.formMembers.member_dob.substr(0, 10);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update() {
      console.log(this.formMembers);
      axios
        .put(`http://localhost:5000/user`, {
            form: this.formMembers
        })
        .then((response) => {
            let data = response.data
            alert(data.message)
            this.$router.push({ name: "logout" })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
        this.formMembers.member_password = this.pass
        this.formMembers.sid = this.formMembers.member_id
        this.update()
    },
  },
};
</script>

<style scoped>
</style>