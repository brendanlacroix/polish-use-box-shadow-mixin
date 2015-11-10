define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-use-box-shadow-mixin',

    message: function () {
      assert.strictEqual(plugin.message, 'Box shadows should not be set explicitly. Use "@include box-shadow".');
    }
  });

  registerSuite({
    name: 'polish-use-box-shadow-mixin SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 2);
        assert.equal(errors[0].node.toString().trim(), 'box-shadow: 0 2px 4px rgba(255, 0, 0, 0.1)');
        assert.equal(errors[1].node.toString().trim(), 'box-shadow: 0 2px 4px rgba(255, 0, 0, 0.1)');
      }));}
  });
});
