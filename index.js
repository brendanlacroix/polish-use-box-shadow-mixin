module.exports = {
  name: 'use-box-shadow-mixin',
  message: 'Box shadows should not be set explicitly. Use "@include box-shadow".',
  test: function(ast){
    var errors = [];

    ast.traverse(function(declaration) {
      if (declaration.type !== 'declaration') {
        return;
      }

      declaration.traverse(function (ident) {
        var string;

        if (ident.type !== 'ident') {
          return;
        }

        string = ident.toString();

        if (string.indexOf('box-shadow') === 0) {
          errors.push({
            node: declaration
          });
        }
      });
    });

    return errors;
  }
};
