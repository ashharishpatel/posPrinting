var customerHeaderArray = [];
var billComponentsArray = [];

function init() {
  return ['\x1B' + '\x41']; // init
}

function createCustomerHeader(customer) {
  customerHeaderArray.push('\x1B' + '\x61' + '\x31') // center align
  _.each(customer, function (value, key) {
    if (value && key !== 'address') {
      customerHeaderArray.push(value + '\x0A')
    }
    customerHeaderArray.push('\x0A'); // line break
  })
  _.each(customer.address, function (value, key) {
    if (value) {
      customerHeaderArray.push(value + '\x0A');
    }
  });
  customerHeaderArray.push('\x0A'); // line break
  customerHeaderArray.push('\x0A'); // line break
  return customerHeaderArray;
}

function businessHeader(businessHeader) {
  var businessHeaderArray = [];
  businessHeaderArray.push('\x1B' + '\x61' + '\x31'); // center align
  businessHeaderArray.push(businessHeaderArray.name + '\x0A');
  businessHeaderArray.push('\x0A');
  var businessAddress = businessHeaderArray.address.split(',');
  _.each(businessAddress, function (address) {
    businessHeaderArray.push(address);
    // body...
  })
  businessHeaderArray.push(businessHeaderArray.address + '\x0A');
  // businessHeaderArray.push('Contact No. '+businessHeaderArray.contact+'\x0A');
  businessHeaderArray.push('\x0A');
  businessHeaderArray.push('\x0A');
  businessHeaderArray.push('\x1B' + '\x61' + '\x30');
  businessHeaderArray.push('Bill No. ' + businessHeaderArray.invoiceNumber + '\x0A');
  // $log.log(businessHeaderArray);
  return businessHeaderArray;

}

function mainBody(items) {
  var itemsArray = [];
  itemsArray.push('\x0A');
  itemsArray.push('\x0A');
  _.each(items, function (item) {
    itemsArray.push('\x1B' + '\x61' + '\x30'); // left align
    itemsArray.push(item.name.replace(/(^| )(\w)/g, function (x) {
      return x.toUpperCase()
    }));
    itemsArray.push('\x1B' + '\x61' + '\x32'); //right align
    itemsArray.push(item.quantity + '    ' + (item.cost * item.quantity) + '\x0A');
  });
  itemsArray.push('\x0A');
  itemsArray.push('____________________________________________________________________________');
  // $log.log(items);
  return itemsArray;
  // body...
}

function createBillComponents(billComponents) {
  _.each(billComponents, function (billComponent, index) {
    if (billComponent) {
      if (index !== 4) {
        var keys = _.keys(billComponent)[0];
        billComponentsArray.push('\x1B' + '\x61' + '\x30');
        billComponentsArray.push(keys.charAt(0).toUpperCase() + keys.slice(1));
        billComponentsArray.push('\x1B' + '\x61' + '\x32');
        billComponentsArray.push(_.values(billComponent)[0] + '\x0A');
      } else if (index === 4) {
        _.each(billComponents[index], function (aot) {
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

function footer(billInfo) {
  var footerArray = [];
  footerArray.push('\x1B' + '\x61' + '\x31', '\x1B' + '\x4D' + '\x32', '\x1B' + '\x21' + '\x08', billInfo.reference, '\x1B' + '\x21' + '\x00');
  footerArray.push('\x1B' + '\x61' + '\x30'); // left align
  footerArray.push('\x1B' + '\x4D' + '\x30'); // normal text
  _.each(billInfo.info, function (info) {
    footerArray.push(info);
    // body...
  });
  console.log(footerArray);
  return footerArray;
}
var a = [{
  category: 'beverages',
  cost: 150,
  id: 'OztZypClxv',
  itemId: 'h2u2FLESUO',
  name: 'bud light',
  quantity: 2
}];

console.log(mainBody(a));
