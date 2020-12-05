<template>
  <div class="vue-uploader">
    <div class="file-list">
      <section
        v-for="(file, index) of files"
        class="file-item draggable-item"
        :key="file.name"
      >
        <img :src="file.src" alt="" ondragstart="return false;" />
        <span class="file-remove" @click="remove(index)">+</span>
      </section>
      <section v-if="status == 'ready'" class="file-item">
        <div @click="add" class="add"></div>
      </section>
    </div>
    <section v-if="files.length != 0" class="upload-func">
      <div class="progress-bar">
        <section v-if="uploading" :width="percent * 100 + '%'">
          {{ percent * 100 + "%" }}
        </section>
      </div>
      <div class="operation-box">
        <Button
          v-if="status == 'ready'"
          @click="submit"
          icon="ios-cloud-upload-outline"
          >开始视频</Button
        >

        <button v-if="status == 'finished'" @click="finished">完成</button>
      </div>
    </section>
    <input   type="file" @change="fileChanged" ref="file" accept="mp4"
     
      />
       <!-- multiple="multiple"  -->
  </div>
  <!-- accept="image/jpg,image/jpeg,image/png,image/bmp" -->
</template>
<script>
import untilMd5 from "../../../utils/md5";
import OSS from "ali-oss";
export default {
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
    };
  },
  props:{
  getvideosrc:{
    type:Function
  }
  },
  methods: {
    add() {
      this.$refs.file.click();
    },
    getOssConfig(params) {
      return this.axios.post("/api/v2/data/attachment/getOssConfig", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getOssConfig"),
      });
    },
    async submit() {
      if (this.files.length === 0) {
        console.warn("no file!");
        return;
      }
      var that = this;
      let { data } = await this.getOssConfig({
        ossType: 1,
      });
      // 这里是OSS
      const client = new OSS({
        region: data.data.region,
        accessKeyId: data.data.AccessKeyId,
        accessKeySecret: data.data.AccessKeySecret,
        bucket: "iskate-pub",
        success_action_status: "200",
        stsToken: data.data.SecurityToken,
      });
      const fNum = this.files;
      for (let i = 0; i < fNum.length; i++) {
        let f = fNum[i].file;
        const Name = f.name;
        const suffix = Name.substr(Name.indexOf("."));
        const obj = this.timestamp();
        const storeAs = "manage/" + obj + suffix; // 路径+时间戳+后缀名
        client.put(storeAs, f).then(function (result) {
          that.getvideosrc(result.res.requestUrls)
          
        });
      }
    },
    // 时间戳
    timestamp: function () {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();
      return (
        "" +
        y +
        this.Add0(m) +
        this.Add0(d) +
        this.Add0(h) +
        this.Add0(mm) +
        this.Add0(s) +
        this.Add0(ms)
      );
    },
    Add0: function (m) {
      return m < 10 ? "0" + m : m;
    },

    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i],
          };
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },

    isContain(file) {
      return this.files.find(
        (item) => item.name === file.name && item.size === file.size
      );
    },
  },
};
</script>
<style>
.vue-uploader {
  border: 1px solid #e5e5e5;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  margin-left: 10px;

  position: relative;
  width: 90px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 100%;
  height: 100%;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 4px;
  display: none;
  top: 4px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 20px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 80px;
  height: 80px;
  float: left;
  text-align: center;

  font-size: 20px;
  cursor: pointer;
  background: url("../../../assets/images/timg.jpg") no-repeat;
  /* 这里使用的是我本地图片 */
  /* background: pink; */
  background-size: 100% 100%;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  /* flex-grow: 1; */
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}

.vue-uploader > input[type="file"] {
  display: none;
}
</style>

