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
    classMask: function() {
      return {
        "opacity-fede-in": this.taskPanel.open,
        "opacity-fede-out": !this.taskPanel.open
      };
    },
    onListHandler: function() {
      console.log(" -- listHandler");
    },
    onDoneHandler: function() {
      console.log(" -- onDoneHandler");
    },
    onTaskHandler: function() {
      console.log(" -- onDoneHandler / status: ", this.taskPanel.open);

      if (!this.taskPanel.open) {
        this.taskPanel.open = !this.taskPanel.open;
      }
    },
    onSubmitHandler: function() {
      console.log(" -- onSubmitHandler / content: ", this.taskPanel.content);

      if (this.taskPanel.content) {
        this.$store.dispatch("Add", {
          content: this.taskPanel.content,
          done: false
        });
      }

      this.onCloseTaskPanel();
    },
    onCloseTaskPanel: function() {
      this.taskPanel.open = false;
      this.taskPanel.content = null;
    },
    onCommandHandler: function(e) {
      switch (e) {
        case 27:
          {
            // esc
            if (this.taskPanel.open === true) {
              this.onCloseTaskPanel();
            }
          }
          break;
      }
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
  created: function() {
    window.addEventListener("keyup", this.onCommandHandler);
  },
  beforeMounted: function() {},
  mounted: function() {
    this.$store.dispatch("Load");
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {}
};
