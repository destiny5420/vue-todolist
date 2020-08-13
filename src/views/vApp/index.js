import Component_ListItem from "@/components/cListItem/index.vue";

export default {
  name: "vApp",
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  props: {},
  components: {
    Component_ListItem
  },
  data: function() {
    return {
      taskPanel: {
        open: false,
        content: null,
        placeholder: "你想要新增什麼事項呢?"
      }
    };
  },
  methods: {
    onListHandler: function() {
      console.log(" -- listHandler");
    },
    onDoneHandler: function() {
      console.log(" -- onDoneHandler");
    },
    onTaskHandler: function() {
      console.log(" -- onDoneHandler");

      if (this.taskPanel.open) {
        this.onSubmitHandler();
      } else {
        this.taskPanel.open = !this.taskPanel.open;
      }
    },
    onSubmitHandler: function() {
      console.log(" -- onSubmitHandler / content: ", this.taskPanel.content);

      this._closeTaskPanel();
    },
    _closeTaskPanel: function() {
      this.taskPanel.open = false;
      this.taskPanel.content = null;
    }
  },
  computed: {
    currentRouter: function() {
      // return this.$route.name; for route
      return this.$store.getters["currentRouteName"]; // for vuex-route-sync
    },
    dataIndexList: function() {
      return this.$store.getters["dataByRoute"];
    }
  },
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$store.dispatch("Load");
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {}
};
