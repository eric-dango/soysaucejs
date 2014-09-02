$(function() {
  describe('Inheritance - Unit Tests', function() {
    describe('extend()', function() {
      var subject, Widget, ExtendedClass;

      before(function() {
        var widget;

        Widget = soysauce.testing.classes['Widget'];

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          }
        });

        widget = new ExtendedClass();
        subject = widget.init();
      });

      it('new widget should be an instance of the base', function() {
        expect(subject instanceof Widget).to.be.true;
      });

      it('new widget should be an instance of itself', function() {
        expect(subject instanceof ExtendedClass).to.be.true;
      });

      it('new widget should expose _super in an inherited method', function() {
        var widget;

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          },
          validate: function() {
            return this._super;
          },
          nonInheritedMethod: function() {
            return this._super;
          }
        });

        widget = new ExtendedClass();

        expect(widget.validate()).to.not.be.undefined;
      });

      it('new widget should not expose _super in an non-inherited method', function() {
        var widget;

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          },
          validate: function() {
            return this._super;
          },
          nonInheritedMethod: function() {
            return this._super;
          }
        });

        widget = new ExtendedClass();

        expect(widget.nonInheritedMethod()).to.be.undefined;
      });
    });
  });
});
