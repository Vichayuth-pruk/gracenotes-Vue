<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img
            src="../assets/logo.png"
            alt=""
            width="40"
            height="40"
            class="d-inline-block align-center"
          />
          Gracenotes
        </a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">ลงชื่อเข้าใช้งาน</a>
          </li>
        </ul>
      </div>
    </nav>
    <br /><br /><br />

    <div class="container">
      <div class="content">
        <h3>ลงทะเบียนเข้าใช้งาน</h3>
        <br />
        <label for="user">รหัสนักเรียน</label>
        <input
          type="text"
          v-model="user"
          class="form-control"
          placeholder="รหัสนักเรียน"
          name="user"
          required
        />
        <div class="row g-2">
          <div class="col">
            <label for="fname">ชื่อ</label>
            <input
              type="text"
              v-model="fname"
              class="form-control"
              placeholder="ชื่อ"
              name="fname"
              maxlength="30"
              required
            />
          </div>
          <div class="col">
            <label for="lname">นามสกุล</label>
            <input
              type="text"
              v-model="lname"
              class="form-control"
              placeholder="นามสกุล"
              name="lname"
              maxlength="30"
              required
            />
          </div>
        </div>
        <label for="class">ชั้นมัธยมศึกษาปีที่</label>
        <input
          type="text"
          v-model="classes"
          class="form-control"
          placeholder="ชั้นมัธยมศึกษาปีที่ ตัวอย่าง 6/6"
          name="class"
          maxlength="5"
          required
        />
        <label for="no">เลขที่</label>
        <input
          type="number"
          v-model="no"
          class="form-control"
          placeholder="เลขที่"
          name="no"
          maxlength="2"
          min="1"
          max="99"
          required
        />
        <label for="dob">วัน/เดือน/ปี เกิด</label>
        <input
          type="date"
          v-model="dob"
          class="form-control"
          name="dob"
          required
        />
        <label for="address1">ที่อยู่</label>
        <input
          type="text"
          v-model="address1"
          class="form-control"
          name="address1"
          placeholder="ที่อยู่ 1"
          required
        />
        <input
          type="text"
          v-model="address2"
          class="form-control"
          name="address2"
          placeholder="ที่อยู่ 2 (ไม่บังคับ)"
          style="margin-top: 10px"
        /><br />
        <div v-for="image in images" :key="image.id">
          <p class="text-center">
            <img
              :src="showSelectImage(image)"
              alt="Placeholder image"
              class="img-fluid col-lg-3 col-md-5 col-sm-12"
            />
          </p>
        </div>
        <label for="img">รูปถ่ายนักเรียนแนวตั้ง</label><br />
        <input
          type="file"
          name="img"
          accept="image/png, image/jpeg, image/webp"
          @change="selectImages"
          required
        /><br />
        <label for="pass">รหัสผ่าน</label>
        <input
          type="password"
          v-model="pass"
          class="form-control"
          placeholder="รหัสผ่าน"
          name="pass"
          maxlength="15"
          required
        />
        <label for="repass">ยืนยันรหัสผ่าน</label>
        <input
          type="password"
          v-model="repass"
          class="form-control"
          placeholder="ยืนยันรหัสผ่าน"
          name="repass"
          maxlength="15"
          required
        /><br />
        <div class="text-center">
          <input
            type="submit"
            class="btn btn-success"
            value="ลงทะเบียน"
            @click="validate()"
          />
        </div>
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
      user: "",
      fname: "",
      lname: "",
      classes: "",
      no: "",
      dob: "",
      address1: "",
      address2: "",
      images: [],
      pass: "",
      repass: "",
    };
  },
  methods: {
    validate() {
      this.register();
    },
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    register() {
      let formData = new FormData();
      formData.append("user", this.user);
      formData.append("fname", this.fname);
      formData.append("lname", this.lname);
      formData.append("classes", this.classes);
      formData.append("no", this.no);
      formData.append("dob", this.dob);
      formData.append("address", this.address1 + this.address2);
      formData.append("pass", this.pass);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      axios
        .post("http://localhost:5000/register", formData)
        .then((response) => {
          const data = response.data;
          if (data.status) {
            this.$router.push({ name: "index" });
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>