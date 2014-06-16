soysauce.lateload = function(selector) {

    function loadItem(selector) {
        var curr = jQuery(selector);
        var val = curr.attr("data-ss-ll-src");
        if (val) {
            curr.attr("src", val).removeAttr("data-ss-ll-src");
            return true;
        }
        return false;
    }

    if (selector) {
        return loadItem(selector);
    } else {
        jQuery(document).on("DOMContentLoaded", function() {
            jQuery("[data-ss-ll-src][data-ss-options='dom']").each(function(i, e) {
                loadItem(e);
            });
        });
        jQuery(window).on("load", function() {
            if (!jQuery("[data-ss-ll-src][data-ss-options='load']")) return;
            jQuery("[data-ss-ll-src][data-ss-options='load']").each(function(i, e) {
                loadItem(e);
            });
        });
    }
};

soysauce.lateload();