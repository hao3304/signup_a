<template>
  <f-panel>
    <div slot="header">
      <f-filter :list="filters">
        <div slot="buttons">
          <!--          <Button icon="md-add" type="primary">新增</Button>-->
        </div>
      </f-filter>
    </div>
    <div slot="body" slot-scope="params">
      <Table
        size="small"
        :height="params.bodyHeight"
        stripe
        border
        :data="data"
        :columns="columns"
        class="f-table"
      ></Table>

      <Modal
        :footer-hide="true"
        title="报道信息"
        :width="1000"
        v-model="baodaoDialog"
      >
        <baodao v-if="baodaoDialog" :info="baodaoInfo"></baodao>
      </Modal>
      <Modal
        :footer-hide="true"
        title="报名信息"
        :width="1000"
        v-model="baomingDialog"
      >
        <baoming v-if="baomingDialog" :info="baodaoInfo"></baoming>
      </Modal>
    </div>
    <div slot="footer">
      <f-page
        :total="total"
        :current.sync="query.pagecnt"
        @on-page-change="onPage"
        @on-size-change="onSize"
      ></f-page>
    </div>
  </f-panel>
</template>

<script>
import service from "@/services";
import { mapState } from "vuex";
import types from "./types";
import baodao from "./modules/baodao";
import baoming from "./modules/baoming";
export default {
  name: "test",
  computed: {
    ...mapState(["token"])
  },
  components: { baoming, baodao },
  data() {
    return {
      filters: [
        {
          type: "input",
          name: "关键字",
          field: "keyword",
          placeholder: "请输入关键字查询"
        }
      ],
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          width: 100,
          key: "realname"
        },
        {
          title: "昵称",
          width: 150,
          key: "nickname"
        },
        {
          title: "身份证",
          width: 160,
          key: "idcard"
        },
        {
          title: "区域",
          width: 100,
          key: "area",
          render: (h, { row }) => {
            return h("div", this.getName("area", row.areaid));
          }
        },
        {
          title: "性别",
          width: 80,
          render: (h, { row }) => {
            return h("div", this.getName("sex", row.sexid));
          }
        },
        {
          title: "民族",
          width: 100,
          render: (h, { row }) => {
            return h("div", this.getName("mz", row.mz_id));
          }
        },
        {
          title: "政治面貌",
          width: 100,
          render: (h, { row }) => {
            return h("div", this.getName("political", row.political_id));
          }
        },
        {
          title: "身体状况",
          width: 100,
          key: "shenti"
        },
        {
          title: "文化程度",
          width: 120,
          render: (h, { row }) => {
            return h("div", this.getName("wenhua", row.wenhua_id));
          }
        },
        {
          title: "家庭地址",
          width: 200,
          key: "address"
        },
        {
          title: "联系号码",
          width: 120,
          key: "phonenum"
        },
        {
          title: "创建日期",
          minWidth: 100,
          key: "created_at"
        },
        {
          title: "操作",
          fixed: "right",
          width: 150,
          align: "center",
          render: (h, { row }) => {
            const buttons = [
              h(
                "a",
                {
                  on: {
                    click: () => this.onShowBaoDao(row)
                  }
                },
                "报道信息"
              )
            ];
            if (row.userlevel > 3) {
              buttons.push(
                h(
                  "a",
                  {
                    style: {
                      marginLeft: "8px"
                    },
                    on: {
                      click: () => this.onShowBaoMing(row)
                    }
                  },
                  "报名信息"
                )
              );
            }
            return h("div", buttons);
          }
        }
      ],
      data: [
        {
          title: "测试",
          age: 18,
          addr: "嘉兴市秀洲区"
        }
      ],
      query: {
        linecnt: 20,
        pagecnt: 1,
        user_id: null
      },
      total: 0,
      baodaoDialog: false,
      baomingDialog: false,
      baodaoInfo: null
    };
  },
  methods: {
    render() {
      service.getuserbaseinfos(this.query).then(rep => {
        this.data = rep.data;
        this.total = rep.total * 1;
      });
    },
    getName(field, id) {
      const target = types[field].find(a => a.key === id);
      if (target) {
        return target.value;
      } else {
        return "";
      }
    },
    onPage(p) {
      this.query.pagecnt = p;
      this.render();
    },
    onSize(s) {
      this.query.linecnt = s;
      this.query.pagecnt = 1;
      this.render();
    },
    onShowBaoDao(row) {
      this.baodaoDialog = true;
      this.baodaoInfo = row;
    },
    onShowBaoMing(row) {
      this.baomingDialog = true;
      this.baodaoInfo = row;
    }
  },
  mounted() {
    this.query.user_id = this.token;
    this.render();
  }
};
</script>

<style scoped></style>
