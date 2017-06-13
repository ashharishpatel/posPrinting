var customerHeaderArray = [];
var billComponentsArray = [];

function init() {
    return ['\x1B' + '\x41']; // init
}

function createCustomerHeader(customer) {
    customerHeaderArray.push('\x1B' + '\x61' + '\x31') // center align
    _.each(customer, function(value, key) {
        if (value && key !== 'address') {
            customerHeaderArray.push(value + '\x0A')
        }
        customerHeaderArray.push('\x0A'); // line break
    })
    _.each(customer.address, function(value, key) {
        if (value) {
            customerHeaderArray.push(value + '\x0A');
        }
    });
    customerHeaderArray.push('\x0A'); // line break
    customerHeaderArray.push('\x0A'); // line break
    return customerHeaderArray;
}

function createBillComponents(billComponents) {
    _.each(billComponents, function(billComponent, index) {
        if (billComponent) {
            if (index !== 4) {
                var keys = _.keys(billComponent)[0];
                billComponentsArray.push('\x1B' + '\x61' + '\x30');
                billComponentsArray.push(keys.charAt(0).toUpperCase() + keys.slice(1));
                billComponentsArray.push('\x1B' + '\x61' + '\x32');
                billComponentsArray.push(_.values(billComponent)[0] + '\x0A');
            } else if (index === 4) {
                _.each(billComponents[index], function(aot) {
                    billComponentsArray.push('\x1B' + '\x61' + '\x30');
                    billComponentsArray.push(aot.name + ' @ ' + aot.percent + '%');
                    billComponentsArray.push('\x1B' + '\x61' + '\x32');
                    billComponentsArray.push(aot.amount + '\x0A');
                });
            }
        }
    });
    return billComponentsArray;
}
