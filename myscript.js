$(function(){
    var productHeader = $('#product-header');
    if (productHeader.length == 0)
        return;
    var artist = productHeader.find('#product-header-artist').attr('data-product_artist');
    var title = productHeader.find('#product-header-title').attr('data-product_title');
    var searchURL = 'http://glorybeats.com/?s=' + encodeURIComponent(artist + ' ' + title);
    var searchElem = $('<a href="' + searchURL + '">')
                    .text('Download')
                    .addClass('mini-summary')
                    .attr('target', '_blank')
                    .css({
                        'position' : 'absolute',
                        'top' : '20px',
                        'right' : '10px'
                    });
    var searchURL2 = 'http://nodata.tv/?s=' + encodeURIComponent(artist + ' ' + title);
    var searchElem2 = $('<a href="' + searchURL2 + '">')
                    .text('Download')
                    .addClass('mini-summary')
                    .attr('target', '_blank')
                    .css({
                        'position' : 'absolute',
                        'top' : '20px',
                        'right' : '10px'
                    });
    var searchErrorElem = $('<div>Download unavailable</div>')
                    .attr({'id' : 'product-header-catalog-number'})
                    .css({
                        'position' : 'absolute',
                        
                        'top' : '10px',
                        'right' : '10px'
                    });
    $.get(searchURL, function(data){
        if (data.indexOf('No matches') != -1) {
            $.get(searchURL, function(data){
            if (data.indexOf('Our Apologies') != -1) {
                productHeader.find('#product-header-body').append(searchElem2);
            } else {
                productHeader.find('#product-header-body').append(searchErrorElem);
            };
        });
        } else {
            productHeader.find('#product-header-body').append(searchElem);
        }
    });
});