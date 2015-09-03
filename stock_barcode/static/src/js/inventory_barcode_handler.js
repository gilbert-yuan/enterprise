odoo.define('stock_barcode.InventoryBarcodeHandler', function (require) {
"use strict";

var core = require('web.core');
var FormViewBarcodeHandler = require('barcodes.FormViewBarcodeHandler');

var InventoryBarcodeHandler = FormViewBarcodeHandler.extend({
    start: function() {
        this._super();
        this.map_barcode_method['O-CMD.MAIN-MENU'] = _.bind(this.do_action, this, 'stock_barcode.stock_barcode_action_main_menu', {clear_breadcrumbs: true});
    },

    pre_onchange_hook: function(barcode) {
        // If there already is an inventory line for scanned product
        // at current location, just increment its product_qty.
        var record = null;
        var field = this.form_view.fields.line_ids;
        var view = field.viewmanager.active_view;
        var scan_location_id = this.form_view.fields.scan_location_id.get_value();
        if (view) { // Weird, sometimes is undefined. Due to an asynchronous field re-rendering ?
            record = view.controller.records.find(function(record) {
                return record.get('product_barcode') === barcode && record.get('location_id')[0] === scan_location_id;
            });
        }
        if (record) {
            return field.data_update(record.get('id'), {'product_qty': record.get('product_qty') + 1}).then(function () {
                return view.controller.reload_record(record);
            });
        } else {
            return false;
        }
    },
});

core.form_widget_registry.add('inventory_barcode_handler', InventoryBarcodeHandler);

});