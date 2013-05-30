$(function(){
    var productHeader = $('#product-header');
    if (productHeader.length == 0)
        return;
    var artist = productHeader.find('#product-header-artist').attr('data-product_artist');
    var title = productHeader.find('#product-header-title').attr('data-product_title');
    
    var glorybeats = 'http://glorybeats.com/?s=' + encodeURIComponent(artist + ' ' + title);
    var nodata = 'http://nodata.tv/?s=' + encodeURIComponent(artist + ' ' + title);
    
    var SearchElem = function(URL){
        this.elem = $('<a href="' + URL + '">');
    };
    SearchElem.prototype.addElem = function() {
        this.elem.text('Download')
        .addClass('mini-summary')
        .attr('target', '_blank')
        .css({
            'position' : 'absolute',
            'top' : '20px',
            'right' : '10px'
        });
    };
    var searchGB = new SearchElem(glorybeats);
    var searchND = new SearchElem(nodata);

    var searchErrorElem = $('<div>Download unavailable</div>')
                    .attr({'id' : 'product-header-catalog-number'})
                    .css({
                        'position' : 'absolute',
                        
                        'top' : '10px',
                        'right' : '10px'
                    });
    $.get(glorybeats, function(data){
        if (data.indexOf('No matches') != -1) {
            $.get(nodata, function(data){
            if (data.indexOf('Our Apologies') != -1) {
                productHeader.find('#product-header-body').append(searchND.addElem);
            } else {
                productHeader.find('#product-header-body').append(searchErrorElem);
            };
        });
        } else {
            productHeader.find('#product-header-body').append(searchGB.addElem);
        }
    });
});