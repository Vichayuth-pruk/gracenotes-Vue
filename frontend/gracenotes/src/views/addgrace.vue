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
      <div class="content">
        <h3>เพิ่มบันทึกความดี</h3>
        <br />
        <label for="time">จำนวนเวลาที่ทำความดี</label>
        <input
          type="time"
          v-model="$v.time.$model" :class="{'is-danger text-danger': $v.time.$error}"
          class="form-control"
          name="time"
          required
        />
        <template v-if="$v.time.$error">
          <p class="help text-danger" v-if="!$v.time.required">Thisfield is required</p>
        </template>
        <label for="date">วันที่ทำความดี</label>
        <input
          type="date"
          v-model="$v.date.$model" :class="{'is-danger text-danger': $v.date.$error}"
          class="form-control"
          name="date"
          required
        />
        <template v-if="$v.date.$error">
          <p class="help text-danger" v-if="!$v.date.required">Thisfield is required</p>
          <p class="help text-danger" v-if="!$v.date.date">Please insert date correctly</p>
        </template>
        <div class="form-floating mt-3">
          <textarea
            class="form-control"
            v-model="$v.detail.$model" :class="{'is-danger text-danger': $v.detail.$error}"
            placeholder="รายละเอียดการทำความดี"
            name="detail"
            style="height: 80px"
            id="floatingTextarea"
            required
          ></textarea>
          <template v-if="$v.detail.$error">
          <p class="help text-danger" v-if="!$v.detail.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.detail.minLength">This field must contain at least 10 letters</p>
        </template>
          <label for="floatingTextarea">รายละเอียดการทำความดี</label>
        </div>
        <div class="form-floating mb-3 mt-3">
          <input
            type="text"
            v-model="$v.agency.$model" :class="{'is-danger text-danger': $v.agency.$error}"
            class="form-control"
            id="floatingInput"
            name="agency"
            placeholder="หน่วยงานที่ทำความดี"
            maxlength="50"
            required
          />
          <template v-if="$v.agency.$error">
          <p class="help text-danger" v-if="!$v.agency.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.agency.minLength">This field must contain at least 5 letters</p>
        </template>
          <label for="floatingInput">หน่วยงานที่ทำความดี</label>
        </div>
        <div v-for="image in images" :key="image.id">
          <p class="text-center">
            <img
              :src="showSelectImage(image)"
              alt="Placeholder image"
              class="img-fluid col-lg-3 col-md-5 col-sm-12"
            />
          </p>
        </div>
        <label for="img">รูปถ่ายความดีแนวนอน</label><br />
        <input
          type="file"
          name="img"
          accept="image/png, image/jpeg, image/webp"
          @change="selectImages"
          required
        />
        <template v-if="$v.images.$error">
          <p class="help text-danger" v-if="!$v.images.images">Must Upload The picture</p>
        </template>
        <br />
        <p class="text-center">
          <input
            type="submit"
            class="btn btn-primary btn-lg"
            value="บันทึก"
            @click="validate()"
          />
        </p>
        
      </div>
    </div>
  </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'
import axios from "axios";

function images(){
   return (!(this.images.length == 0) )
}




export default {
  data() {
    return {
      info: null,
      time: "",
      date: "",
      detail: "",
      agency: "",
      images: [],
      sid: "",
    };
  },

  validations:{
    time:{
      required,
      
      
    },
    date:{
      required,
      maxValue: value => value < new Date().toISOString(),
    },
    detail:{
      required,
    },
    agency:{
      required,
      maxLength: maxLength(50)
      
    },
    images:{
      required,
      images: images
    },

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
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    addgrace() {
      let formData = new FormData();
      formData.append("time", this.time);
      formData.append("date", this.date);
      formData.append("detail", this.detail);
      formData.append("agency", this.agency);
      formData.append("sid", this.sid);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      axios
      .post(`http://localhost:5000/grace`, formData)
      .then((response) => {
        let data = response.data;
        alert(data.message)
        this.$router.push({ name: "mygrace" });
      })
      .catch((error) => {
        console.log(error);
      });
    },
    validate() {
      this.$v.$touch();
      if(!this.$v.$invalid){
      this.sid = this.info.member_id;
      this.addgrace()
      }
    },
  },
};
</script>


<style scoped>
</style>