$(function(){
        
    $.fn.sexyDrop = function(options) {
                
        var settings = $.extend( {
            autoWidth : true,
            verticallyAlign : true,
            wrapperClass : 'pxuSexyDropWrapper',
            wrapperElement : 'div',
            wrapperPosition : 'relative',
            textClass : 'pxuSexyDrop',
            textElement : 'div',
            selectPosition : 'absolute'
        }, options);
        
        var selectElements = (this.is('select')) ? this : this.find('select');
            selectElements.css('opacity','0');
        
        /* Iterate through and return the selection
        -------------------------------------------------------*/
        return this.each(function() {
            
            var originalSelect = $(this);
            var originalWidth = originalSelect.width();
            var originalHeight = originalSelect.height();
            var originalText = originalSelect.val();
                        
            /* Create and append all elements
            -------------------------------------------------------*/
            var wrapper = $('<'+ settings.wrapperElement +'>', {
               'class'  : settings.wrapperClass
            });
            
            var textBox = $('<'+ settings.textElement +'>', {
               'class'  : settings.textClass
            });
                
            originalSelect
                .wrap(wrapper)
                .after(textBox);
            
            var wrapper = originalSelect.parent();  // redefined after 'wrap' for dom manipulation
            
            
            /* Initialize change event
            -------------------------------------------------------*/
            
            textBox.text(originalText); // Set default text
            
            originalSelect.change(function(){
               textBox.text($(this).val());
            });
            
            
            /* Adjust and position elements
            -------------------------------------------------------*/
            
            wrapper
                .css('position', settings.wrapperPosition); // default: relative
            
            originalSelect
                .css('position', settings.selectPosition) // default: absolute  
            
            if (settings.autoWidth) {
                var textBoxPadding = parseInt(textBox.css('padding-left')) + parseInt(textBox.css('padding-right'));
                textBox.css('width', (originalWidth - textBoxPadding) );
            }
            
            if (settings.verticallyAlign) {
                var textBoxHeight = textBox.outerHeight();
                var verticalOffset = ((textBoxHeight - originalHeight) / 2);
                originalSelect.css('top', verticalOffset);
            }
      
        }); // end of 'return this.each(function() {'

    };

    $('.drop-this').sexyDrop();

});