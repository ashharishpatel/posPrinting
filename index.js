var config = qz.configs.create("Printer Name");

var data = [
   { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "escp", dotDensity: 'double' } },
   '\x1B' + '\x40',          // init
   '\x1B' + '\x61' + '\x31', // center align
   'Beverly Hills, CA  90210' + '\x0A',
   '\x0A',                   // line break
   'www.qz.io' + '\x0A',     // text and line break
   '\x0A',                   // line break
   '\x0A',                   // line break
   'May 18, 2016 10:30 AM' + '\x0A',
   '\x0A',                   // line break
   '\x0A',                   // line break    
   '\x0A',
   'Transaction # 123456 Register: 3' + '\x0A',
   '\x0A',
   '\x0A',
   '\x0A',
   '\x1B' + '\x61' + '\x30', // left align
   'Baklava (Qty 4)       9.00' + '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
   '\x0A',
   'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',       
   '\x1B' + '\x45' + '\x0D', // bold on
   'Here\'s some bold text!',
   '\x1B' + '\x45' + '\x0A', // bold off
   '\x0A' + '\x0A',
   '\x1B' + '\x61' + '\x32', // right align
   '\x1B' + '\x21' + '\x30', // em mode on
   'DRINK ME',
   '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
   '\x0A' + '\x0A',
   '\x1B' + '\x61' + '\x30', // left align
   '------------------------------------------' + '\x0A',
   '\x1B' + '\x4D' + '\x31', // small text
   'EAT ME' + '\x0A',
   '\x1B' + '\x4D' + '\x30', // normal text
   '------------------------------------------' + '\x0A',
   'normal text',
   '\x1B' + '\x61' + '\x30', // left align
   '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
   '\x1B' + '\x69',          // cut paper
   '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                // **for legacy drawer cable CD-005A.  Research before using.
];

qz.print(config, data).catch(function(e) { console.error(e); });