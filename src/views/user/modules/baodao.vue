<template>
  <div class="baodao" >
    <Button @click="onPrint"  type="primary" style="float: right">打印</Button>
    <div ref="printMe" id="baodao">
      <div class="baodao__header">
        镇（街道）： {{ getName("area", info.areaid) }}
      </div>
      <table class="baodao__table" >
        <tr>
          <td class="name">姓名</td>
          <td>{{ info.realname }}</td>
          <td class="name">性别</td>
          <td>{{ getName("sex", info.sexid) }}</td>
          <td class="name">民族</td>
          <td>{{ getMz(info.mz_id) }}</td>
        </tr>
        <tr>
          <td class="name">政治面貌</td>
          <td>{{ getName("political", info.political_id) }}</td>
          <td class="name">身份证号码</td>
          <td colspan="3">{{ info.idcard }}</td>
        </tr>
        <tr>
          <td class="name">入党时间</td>
          <td>{{ armyinfo.joinpdate }}</td>
          <td class="name">户口类型</td>
          <td>{{ getName("hk", info.hk_type) }}</td>
          <td class="name">身体状况</td>
          <td>{{ info.shenti }}</td>
        </tr>
        <tr>
          <td class="name">文化程度</td>
          <td>{{ getName("wenhua", info.wenhua_id) }}</td>
          <td class="name">入伍时间</td>
          <td>{{ armyinfo.joinadate }}</td>
          <td class="name">联系电话</td>
          <td>{{ info.phonenum }}</td>
        </tr>
        <tr>
          <td class="name">户口地址</td>
          <td colspan="5">{{ info.hk_address }}</td>
        </tr>
        <tr>
          <td class="name">现家庭地址</td>
          <td colspan="3">{{ info.address }}</td>
          <td class="name">服役地区</td>
          <td>{{ armyinfo.area }}</td>
        </tr>
        <tr>
          <td class="name">部队名称（番号）</td>
          <td colspan="3">{{ armyinfo.armyname }}</td>
          <td class="name">部队类型</td>
          <td>{{ getName("armytype", armyinfo.armytypeid) }}</td>
        </tr>
        <tr>
          <td class="name">部队专业</td>
          <td>{{ armyinfo.zhuanye }}</td>
          <td class="name">军龄</td>
          <td>{{ armyinfo.armylong }}</td>
          <td class="name">身高</td>
          <td>{{ armyinfo.shengao }}</td>
        </tr>
        <tr>
          <td class="name">立功情况</td>
          <td colspan="3">{{ armyinfo.ligong }}</td>
          <td class="name">特长</td>
          <td></td>
        </tr>
        <tr>
          <td class="name" rowspan="4">家庭成员</td>
          <td class="name">称谓</td>
          <td class="name">姓名</td>
          <td class="name" colspan="2">工作单位</td>
          <td class="name">联系电话</td>
        </tr>
        <tr>
          <td>{{ familyinfo.callname }}</td>
          <td>{{ familyinfo.name }}</td>
          <td colspan="2">{{ familyinfo.danwei }}</td>
          <td>{{ familyinfo.phonenum }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2"></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2"></td>
          <td></td>
        </tr>
      </table>

      <div class="baodao__footer">报到时间：{{ info.created_at }}</div>
    </div>
  </div>
</template>

<script>
import types from "../types";
import { mapState } from "vuex";
import Service from "@/services";
import { Printd } from 'printd';

const cssText = `
  div {
      line-height: 40px;
  }
  div {
      line-height: 40px;
      text-align: right;
      margin-top: 10px;
  }

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
      armyinfo: {}
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
      const target = types.mz.find(a => a.key == id);
      if (target) {
        return target.value;
      } else {
        return "";
      }
    },
    onPrint() {
      const d = new Printd()
      d.print( document.getElementById('baodao'), [ cssText ] )
    }
  },
  created() {
    if (this.info.userlevel > 1) {
      Service.getuserfamilyinfo({ user_id: this.info.user_id }).then(rep => {
        this.familyinfo = rep.data[0];
      });
    }

    if (this.info.userlevel > 2) {
      Service.getuserarmyinfo({ user_id: this.info.user_id }).then(rep => {
        this.armyinfo = rep.data[0];
      });
    }
  }
};
</script>

<style lang="less">

</style>
