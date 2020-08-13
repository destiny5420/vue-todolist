import Component_ListItem from "@/components/cListItem/index.vue";

export default {
  name: "vApp",
  props: {},
  components: {
    Component_ListItem
  },
  data: function() {
    return {};
  },
  methods: {
    onListHandler: function() {
      console.log(" -- listHandler");
    },
    onDoneHandler: function() {
      console.log(" -- onDoneHandler");
    }
  },
  computed: {
    currentRouter: function() {
      // return this.$route.name; for route
      return this.$store.getters["currentRouteName"]; // for vuex-route-sync
    },
    datas: function() {
      return this.$store.getters["dataByRoute"];
    }
  },
  // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$store.dispatch("Init");
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {}
};
