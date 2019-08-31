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
    </div>
    <div slot="footer">
      <f-page :total="total"></f-page>
    </div>
  </f-panel>
</template>

<script>
import service from "@/services";
import { mapState } from "vuex";
export default {
  name: "test",
  computed: {
    ...mapState(["token"])
  },
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
          width: 200,
          key: "idcard"
        },
        {
          title: "区域",
          width: 200,
          key: "idcard"
        },
        {
          title: "性别",
          width: 200,
          key: "idcard"
        },
        {
          title: "民族",
          width: 200,
          key: "idcard"
        },
        {
          title: "政治面貌",
          width: 200,
          key: "idcard"
        },
        {
          title: "身体状况",
          width: 200,
          key: "idcard"
        },
        {
          title: "文化程度",
          width: 200,
          key: "idcard"
        },
        {
          title: "家庭地址",
          width: 200,
          key: "idcard"
        },
        {
          title: "联系号码",
          width: 200,
          key: "idcard"
        },
        {
          title: "创建日期",
          width: 200,
          key: "idcard"
        },
        {
          title: " ",
          minWidth: 1
        },
        {
          title: "操作",
          fixed: "right",
          width: 120,
          align: "center"
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
      total: 0
    };
  },
  methods: {
    render() {
      service.getuserbaseinfos(this.query).then(rep => {
        this.data = rep.data;
        this.total = rep.total * 1;
      });
    }
  },
  mounted() {
    this.query.user_id = this.token;
    this.render();
  }
};
</script>

<style scoped></style>
