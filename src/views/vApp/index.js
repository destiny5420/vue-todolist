import Component_ListItem from "@/components/cListItem/index.vue";

export default {
  name: "default",
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
      return this.$store.getters["currentRouter"]; // for vuex-route-sync
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
