export default {
  name: "cListItem",
  props: {
    props_dataIndex: {
      type: Number,
      required: true
    }
  },
  components: {},
  data: function() {
    return {};
  },
  methods: {
    onDoneHandler: function() {
      this.$store.commit("MODIFY_TODO", {
        index: this.props_dataIndex,
        done: !this.data.done
      });
    },
    onDeleteHandler: function() {
      this.$store.commit("DELETE_TODO", this.props_dataIndex);
    }
  },
  computed: {
    data: function() {
      return this.$store.state.todoDatas[this.props_dataIndex];
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
