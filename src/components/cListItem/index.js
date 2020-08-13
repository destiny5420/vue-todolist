export default {
  name: "cListItem",
  props: {
    porps_dataIndex: {
      type: Number,
      required: true
    }
  },
  components: {},
  data: function() {
    return {
      content: "請在此輸入內容",
      done: false
    };
  },
  methods: {
    onDoneHandler: function() {
      console.log("-- onDoneHandler");
      this.done = !this.done;
    },
    onDeleteHandler: function() {
      console.log(" -- onDeleteHandler");
    }
  },
  computed: {
    data: function() {
      return this.$store.state.todoDatas[this.porps_dataIndex];
    },
    classText: function() {
      return {
        "done-text": this.data.done
      };
    },
    classCheckBox: function() {
      return {
        check: this.data.done
      };
    }
  },
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {}
};
