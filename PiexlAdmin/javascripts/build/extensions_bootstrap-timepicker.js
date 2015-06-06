(function() {
  var timepicker_init;

  if (!$.fn.timepicker) {
    throw new Error('bootstrap-timepicker.js required');
  }

  timepicker_init = $.fn.timepicker.Constructor.prototype._init;

  $.fn.timepicker.Constructor.prototype._init = function() {
    if (this.$element.parent().hasClass('input-group')) {
      this.$element.parent('.input-group').find('.input-group-addon').on('click.timepicker', $.proxy(this.showWidget, this));
      this.$element.on({
        'focus.timepicker': $.proxy(this.highlightUnit, this),
        'click.timepicker': $.proxy(this.highlightUnit, this),
        'keydown.timepicker': $.proxy(this.elementKeydown, this),
        'blur.timepicker': $.proxy(this.blurElement, this)
      });
    }
    return timepicker_init.call(this);
  };

  $.fn.timepicker.Constructor.prototype.getTemplate = function() {
    var hourTemplate, meridianTemplate, minuteTemplate, secondTemplate, template, templateContent;
    if (this.showInputs) {
      hourTemplate = '<input type="text" name="hour" class="bootstrap-timepicker-hour form-control" maxlength="2"/>';
      minuteTemplate = '<input type="text" name="minute" class="bootstrap-timepicker-minute form-control" maxlength="2"/>';
      secondTemplate = '<input type="text" name="second" class="bootstrap-timepicker-second form-control" maxlength="2"/>';
      meridianTemplate = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian form-control" maxlength="2"/>';
    } else {
      hourTemplate = '<span class="bootstrap-timepicker-hour"></span>';
      minuteTemplate = '<span class="bootstrap-timepicker-minute"></span>';
      secondTemplate = '<span class="bootstrap-timepicker-second"></span>';
      meridianTemplate = '<span class="bootstrap-timepicker-meridian"></span>';
    }
    templateContent = '<table>';
    templateContent += '<tr>';
    templateContent += '<td><a href="#" data-action="incrementHour" class="timepicker-increment"><i class="fa fa-chevron-up"></i></a></td>';
    templateContent += '<td class="separator">&nbsp;</td>';
    templateContent += '<td><a href="#" data-action="incrementMinute" class="timepicker-increment"><i class="fa fa-chevron-up"></i></a></td>';
    if (this.showSeconds) {
      templateContent += '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond" class="timepicker-increment"><i class="fa fa-chevron-up"></i></a></td>';
    }
    if (this.showMeridian) {
      templateContent += '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian" class="timepicker-increment"><i class="fa fa-chevron-up"></i></a></td>';
    }
    templateContent += '</tr>';
    templateContent += '<tr>';
    templateContent += '<td>' + hourTemplate + '</td> ';
    templateContent += '<td class="separator">:</td>';
    templateContent += '<td>' + minuteTemplate + '</td> ';
    if (this.showSeconds) {
      templateContent += '<td class="separator">:</td><td>' + secondTemplate + '</td>';
    }
    if (this.showMeridian) {
      templateContent += '<td class="separator">&nbsp;</td><td>' + meridianTemplate + '</td>';
    }
    templateContent += '</tr>';
    templateContent += '<tr>';
    templateContent += '<td><a href="#" data-action="decrementHour" class="timepicker-decrement"><i class="fa fa-chevron-down"></i></a></td>';
    templateContent += '<td class="separator"></td>';
    templateContent += '<td><a href="#" data-action="decrementMinute" class="timepicker-decrement"><i class="fa fa-chevron-down"></i></a></td>';
    if (this.showSeconds) {
      templateContent += '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond" class="timepicker-decrement"><i class="fa fa-chevron-down"></i></a></td>';
    }
    if (this.showMeridian) {
      templateContent += '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian" class="timepicker-decrement"><i class="fa fa-chevron-down"></i></a></td>';
    }
    templateContent += '</tr>';
    templateContent += '</table>';
    if (this.template === 'modal') {
      template = '<div class="bootstrap-timepicker-widget modal fade" tabindex="-1" role="dialog" style="display: none;">';
      template += '<div class="modal-dialog modal-sm">';
      template += '<div class="modal-content">';
      template += '<div class="modal-header">';
      template += '<button type="button" class="close" data-dismiss="modal">×</button>';
      template += '<h4>Pick a Time</h4>';
      template += '</div>';
      template += '<div class="modal-body">' + templateContent + '</div>';
      template += '<div class="modal-footer">';
      template += '<buttom class="btn btn-primary" data-dismiss="modal">OK</buttom>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
    } else if (this.template === 'dropdown') {
      template = '<div class="bootstrap-timepicker-widget dropdown-menu">' + templateContent + '</div>';
    }
    return template;
  };

}).call(this);
