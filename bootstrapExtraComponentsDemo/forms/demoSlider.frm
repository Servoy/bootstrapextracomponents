customProperties:"formComponent:false",
items:[
{
dataProviderID:"sliderValueHigh",
horizontalAlignment:0,
location:"185,15",
size:"50,25",
typeid:4,
uuid:"130AF6DF-5FB0-4768-B34F-2C21815211B9"
},
{
dataProviderID:"sliderValue",
horizontalAlignment:0,
location:"100,15",
size:"50,25",
typeid:4,
uuid:"1E05A979-DEF1-4E32-AD31-D13ECA2E520F"
},
{
json:{
anchors:0,
ceil:20,
dataProvider:"sliderValue",
dataProviderHigh:"sliderValueHigh",
dataProviderHighID:"sliderValueHigh",
dataProviderID:"sliderValue",
formattingFunction:"function formatValue(value, type) { \t\r\
\tif (type === 'value' || type === 'high') {\r\
\t\treturn numberFormat(value, '#,###.0') + 'k'; \r\
\t} else {\r\
\t\treturn numberFormat(value, '#,###') + 'k'; \r\
\t}\r\
}",
location:{
x:15,
y:59
},
noSwitching:true,
numberFormat:"###0.0",
onDataChange:"40C20564-40D9-40A8-9AF6-F9B35D863DB5",
onDataChangeHigh:"F1D744E8-0201-4F30-B0FD-062D13A92165",
onDataChangeMethodID:"0B848961-7FCD-4329-9214-B47C209C6671",
onSlideEnd:"959D34F9-379B-40BC-9AD5-4BC29557A323",
onSlideStart:"60772E9A-A896-4E15-9344-4CF362605D90",
showTicks:true,
size:{
height:63,
width:542
},
updateOnSlideEnd:false
},
location:"15,59",
name:"slider_1",
size:"542,63",
typeName:"bootstrapextracomponents-slider",
typeid:47,
uuid:"4CF910F1-6C55-49E1-827D-5C933AE92FE8"
},
{
horizontalAlignment:0,
location:"155,15",
size:"25,25",
text:"to",
transparent:true,
typeid:7,
uuid:"92DD41BF-3A3B-4FED-982C-B25E29130817"
},
{
location:"15,15",
size:"80,25",
text:"Value (from)",
transparent:true,
typeid:7,
uuid:"B87075B0-D99E-4C39-9F91-0FC56D84EAB8"
},
{
height:480,
partType:5,
typeid:19,
uuid:"D75AD138-2C09-489B-B02C-A6A3EB90C10A"
}
],
name:"demoSlider",
navigatorID:"-1",
showInMenu:true,
typeid:3,
uuid:"753A1315-EF2D-4CF1-97DA-5069C0BD5D09"