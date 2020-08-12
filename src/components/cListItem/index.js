export default {
  name: "cListItem",
  props: {},
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
  computed: {},
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
