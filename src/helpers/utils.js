module.exports = {
  stripTags: function (input) {
    //replace all html tags with empty string
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
};
