export default {
  name: "cListItem",
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  props: {
    props_dataIndex: {
      type: Number,
      required: true
    }
  },
  components: {},
  data: function() {
    return {
      editorContent: null
    };
  },
  methods: {
    onDoneHandler: function() {
      this.$store.dispatch("Modify", {
        dataID: this.data.id,
        modifyData: {
          content: this.data.content,
          done: !this.data.done
        }
      });
    },
    onEditHandler: function() {
      this.editorContent = this.data.content;
    },
    onCancelHandler: function() {
      this.editorContent = null;
    },
    onSubmitHandler: function() {
      console.log("onSubmitHandler / Editor content: ", this.editorContent);

      this.$store.dispatch("Modify", {
        dataID: this.data.id,
        modifyData: {
          content: this.editorContent,
          done: this.data.done
        }
      });

      this.editorContent = null;
    },
    onDeleteHandler: function() {
      this.$store.dispatch("Delete", this.data.id);
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
