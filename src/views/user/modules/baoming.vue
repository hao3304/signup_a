<template>
  <div class="baodao">
    <Button
      @click="onPrint"
      type="primary"
      style="float: right;margin-bottom: 5px;"
      >打印</Button
    >
    <div id="baoming">
      <table class="baodao__table">
        <tr>
          <td class="name">姓名</td>
          <td>{{ info.realname }}</td>
          <td class="name">性别</td>
          <td>{{ getName("sex", info.sexid) }}</td>
          <td class="name">出生年月</td>
          <td>{{ info.birthday }}</td>
          <td class="name" rowspan="4">
            <img
              v-if="info.nickimg"
              style="width: 80px"
              :src="'http://www.lvsoftware.cn:85/school/images/' + info.nickimg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td class="name">原部职别</td>
          <td colspan="3">{{ enterinfo.job_old }}</td>
          <td class="name">文化程度</td>
          <td>{{ getName("wenhua", info.wenhua_id) }}</td>
        </tr>
        <tr>
          <td class="name">籍贯</td>
          <td></td>
          <td class="name">政治面貌</td>
          <td>{{ getName("political", info.political_id) }}</td>
          <td class="name">健康状况</td>
          <td>{{ info.shenti }}</td>
        </tr>
        <tr>
          <td class="name">入伍时间</td>
          <td>{{ armyinfo.joinadate }}</td>
          <td class="name">入伍地</td>
          <td>{{ enterinfo.out_address }}</td>
          <td class="name">退役时间</td>
          <td>{{ enterinfo.finishdate | date }}</td>
        </tr>
        <tr>
          <td class="name">家庭地址</td>
          <td colspan="6">
            {{ info.address }}
          </td>
        </tr>
        <tr>
          <td class="name">邮政编码</td>
          <td></td>
          <td class="name">联系电话</td>
          <td>{{ info.phonenum }}</td>
          <td class="name">手机号码</td>
          <td colspan="2">
            {{ info.phonenum }}
          </td>
        </tr>
        <tr>
          <td class="name">身份证</td>
          <td colspan="6">{{ info.idcard }}</td>
        </tr>
        <tr>
          <td class="name">专业特长</td>
          <td colspan="2">{{ enterinfo.job_good }}</td>
          <td class="name">有地或无地居民</td>
          <td colspan="3">{{ getName("ydwd", enterinfo.ydwd) }}</td>
        </tr>
        <tr>
          <td class="name">退役方式</td>
          <td colspan="6">{{ getName("finishtype", enterinfo.finishtype) }}</td>
        </tr>
        <tr>
          <td class="name" rowspan="6">自主选择教育培训类别</td>
          <td class="name">志愿</td>
          <td class="name">劳动技能</td>
          <td class="name" colspan="2">承训学校和机构</td>
          <td class="name" colspan="2">自主选择培训专业</td>
        </tr>
        <tr>
          <td class="name">第一志愿</td>
          <td>{{ zhiyuaninfo.zhuanye1 }}</td>
          <td colspan="2">{{ zhiyuaninfo.jigou1 }}</td>
          <td colspan="2">{{ zhiyuaninfo.name1 }}</td>
        </tr>
        <tr>
          <td class="name">第二志愿</td>
          <td>{{ zhiyuaninfo.zhuanye2 }}</td>
          <td colspan="2">{{ zhiyuaninfo.jigou2 }}</td>
          <td colspan="2">{{ zhiyuaninfo.name2 }}</td>
        </tr>
        <tr>
          <td colspan="6" class="name">普通高等学历教育学校</td>
        </tr>
        <tr>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td class="name" colspan="5">是否服从专业调整</td>
          <td>{{ getName("allow", enterinfo.allow) }}</td>
        </tr>
        <tr>
          <td class="name">退役士兵本人意见</td>
          <td colspan="4">
            <div style="text-align: left;line-height: 30px">
              我自愿参加政府组织的免费职业技能教育培训，遵章守法，勤奋学习，按要求完成教育培训说明。
            </div>
            <div style="text-align: right;margin-right: 100px;">签名：</div>
            <div style="text-align: right;margin-right: 20px;">
              <span style="margin-right: 20px;">年</span>
              <span style="margin-right: 20px;">月</span>
              <span style="margin-right: 20px;">日</span>
            </div>
          </td>
          <td colspan="2">
            <div>本人经慎重考虑，决定不参加退役士兵职业技能教育培训。</div>
            <div style="text-align: right;margin-right: 80px;">签名：</div>
            <div style="text-align: right;margin-right: 20px;">
              <span style="margin-right: 20px;">年</span>
              <span style="margin-right: 20px;">月</span>
              <span style="margin-right: 20px;">日</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="name">
            安置地民政局核准意见
          </td>
          <td colspan="6">
            <div
              style="text-align: right; margin-right: 150px;margin-top: 80px;"
            >
              (盖章)
            </div>
            <div style="text-align: right;margin-right: 100px;">
              <span style="margin-right: 20px;">年</span>
              <span style="margin-right: 20px;">月</span>
              <span style="margin-right: 20px;">日</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { Printd } from 'printd'
import types from "../types";
import { mapState } from "vuex";
import Service from "@/services";

const cssText = `

  table {
       width: 100%;
      border-collapse: collapse;
  }

  table td {
        border: 1px solid #ddd;
        line-height: 36px;
        height: 36px;
        padding: 0 5px;
        min-width: 100px;
        color: #000;
        text-align: center;
        font-size: 12px;
  }

  table td.name {
          font-weight: normal;
          width: 100px;
          color: #666;
          background-color: #f1f1f1;
  }
`

export default {
  props: {
    info: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  data() {
    return {
      familyinfo: {},
      armyinfo: {},
      enterinfo: {},
      zhiyuaninfo: {}
    };
  },
  computed: {
    ...mapState(["mz"])
  },
  name: "baodao",
  methods: {
    getName(field, id) {
      const target = types[field].find(a => a.key == id);
      if (target) {
        return target.value;
      } else {
        return "";
      }
    },
    getMz(id) {
      const target = this.mz.find(a => a.id == id);
      if (target) {
        return target.value;
      } else {
        return "";
      }
    },
    onPrint() {
      const d = new Printd()
      d.print( document.getElementById('baoming'), [ cssText ] )
    }
  },
  mounted() {
    if (parseInt(this.info.userlevel) > 1) {
      Service.getuserfamilyinfo({ user_id: this.info.user_id }).then(rep => {
        this.familyinfo = rep.data[0];
      });
    }

    if (parseInt(this.info.userlevel) > 2) {
      Service.getuserarmyinfo({ user_id: this.info.user_id }).then(rep => {
        this.armyinfo = rep.data[0];
      });
    }

    if (parseInt(this.info.userlevel) > 3) {
      Service.getuserenterinfo({ user_id: this.info.user_id }).then(rep => {
        this.enterinfo = rep.data[0];
      });
    }

    if (parseInt(this.info.userlevel) > 4) {
      Service.getuserzhiyuaninfo({ user_id: this.info.user_id }).then(rep => {
        this.zhiyuaninfo = rep.data[0];
      });
    }
  }
};
</script>

<style lang="less">

</style>
