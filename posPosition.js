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

function calculateWhiteSpace(spaceLength, key, value, col) {
    var total;
    var whiteSpace = '';
    var i;
    var stringTrimmed = value;
    var result = '';
    if (col) {
        if(value.length > (spaceLength*col)-2){
            stringTrimmed = value.substring(0,(spaceLength*col)-5) + '...';
            total = (spaceLength * col) - stringTrimmed.length;
        } else {
            total = (spaceLength * col) - stringTrimmed.length;
        }
    } else {
        total = spaceLength - key.length - stringTrimmed.length;
    }
    for (i = 0; i < total; i++) {
        whiteSpace = whiteSpace + ' ';
    } 
    if(col){
        if(key === 'name'){
            result = result + stringTrimmed + whiteSpace;
        }else{
            result = result + whiteSpace + stringTrimmed;
        }
    }else{
        result = key + whiteSpace + stringTrimmed;
    }
    return result;
}
console.log(calculateWhiteSpace(80, 'subtotal', '589.00', null));
console.log(calculateWhiteSpace(80, 'name', 'chicken ihgiheaioghioaehghahioaheiogdsmbgrksjhlkehabjkekgkleangklehnaklgnkleangkleangeklangl', 0.4) + calculateWhiteSpace(80, 'quantity', '20', 0.3) + calculateWhiteSpace(80, 'rate', '34.20', 0.3));