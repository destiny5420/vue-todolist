import Component_ListItem from "@/components/cListItem/index.vue";

function getOpacity(obj) {
  if (getComputedStyle(obj, null)["opacity"]) {
    return getComputedStyle(obj, null)["opacity"];
  }
  return -1;
}

let chatWindow;

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
      },
      menuShow: false
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
      //console.log(" -- listHandler");
    },
    onDoneHandler: function() {
      //console.log(" -- onDoneHandler");
    },
    onTaskHandler: function() {
      if (!this.taskPanel.open) {
        this.taskPanel.open = !this.taskPanel.open;
      }
    },
    onSubmitHandler: function() {
      //console.log(" -- onSubmitHandler / content: ", this.taskPanel.content);

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
    },
    onDocumentClickHandler: function(e) {
      if (
        getOpacity(chatWindow) == 1 &&
        chatWindow.contains(e.target) === false
      ) {
        this.onCloseTaskPanel();
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
    // if you want to observe ESC, using 'keyup' event.
    window.addEventListener("keyup", this.onCommandHandler);
  },
  beforeMounted: function() {},
  mounted: function() {
    this.$store.dispatch("Load");

    document.addEventListener("click", this.onDocumentClickHandler);
    chatWindow = document.getElementById("arrow_box");

    console.log(process.env.VUE_APP_HOST);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {
    window.removeEventListener("keyup", this.onCommandHandler);
    document.removeEventListener("click", this.onDocumentClickHandler);
  },
  Destroy: function() {}
};
