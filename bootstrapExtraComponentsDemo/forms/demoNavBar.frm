customProperties:"formComponent:false",
items:[
{
location:"270,200",
onActionMethodID:"B4E14E6F-6ED0-4130-B92E-24422C07CB3B",
size:"110,35",
text:"Remove item",
typeid:7,
uuid:"22B2FD5A-C28B-401F-AAAA-41E5A43D3658"
},
{
dataProviderID:"invertedNavbar",
displayType:4,
location:"20,160",
name:"invertedNavbar",
onDataChangeMethodID:"D19F4982-AA64-4B3F-A77B-2D23AF2180AF",
size:"200,30",
text:"Inverse",
typeid:4,
uuid:"2C7AE110-8DC0-40E5-9F36-39B252975C77"
},
{
json:{
location:{
x:20,
y:119
},
size:{
height:30,
width:600
}
},
location:"20,119",
name:"lblLastClick",
size:"600,30",
typeName:"servoydefault-label",
typeid:47,
uuid:"38C844F8-31F9-4F82-818C-F478C5A42728"
},
{
location:"520,200",
onActionMethodID:"DF0B5339-9EDD-4562-B335-A90A68C345EF",
size:"110,35",
text:"Enable item",
typeid:7,
uuid:"8AFB2086-AE84-4C7D-8B98-35026C82C30D"
},
{
height:480,
partType:5,
typeid:19,
uuid:"A5AEBECB-F9E7-48FE-A501-92FE2F5A2F90"
},
{
json:{
location:{
x:20,
y:85
},
size:{
height:30,
width:170
},
text:"Last click:"
},
location:"20,85",
name:"label_855",
size:"170,30",
typeName:"servoydefault-label",
typeid:47,
uuid:"AB00E08E-D941-4110-89DF-214574453645"
},
{
location:"395,200",
onActionMethodID:"EFD5D754-D9C0-4389-8EE9-D66737CB2A96",
size:"110,35",
text:"Select item",
typeid:7,
uuid:"B7F07B0F-9427-4C1F-B03C-CCC213DC883D"
},
{
location:"145,200",
onActionMethodID:"AC5386BE-7204-4FB0-9D23-D38A16AE2FDE",
size:"110,35",
text:"Add item",
typeid:7,
uuid:"BD3F294C-0357-466F-BE30-0E363D94BEA3"
},
{
anchors:11,
json:{
anchors:11,
brandLogo:"BAF87A22-88C2-42EE-BD88-D10BAACA7D62",
brandText:"Servoy Navbar",
collapsing:false,
inverse:false,
location:{
x:20,
y:20
},
markClickedItemActive:true,
menuItems:[
{
displayType:"BUTTON",
itemId:"1",
itemText:"Link 1",
svyUUID:"A9888801-2C14-4363-8747-3F5BB0F715E6",
text:"Link 1"
},
{
displayType:"BUTTON",
iconName:"glyphicon glyphicon-camera",
itemId:"2",
itemText:"Link 2",
styleClass:"btn-primary",
svyUUID:"2B2CCD4B-61ED-48A5-B48E-22EAD7F4D781",
text:"Button 1"
},
{
enabled:true,
itemId:"3",
itemText:"Dropdown",
subMenuItems:[
{
iconName:"glyphicon glyphicon-thumbs-up",
isDivider:false,
itemId:"3.1",
itemText:"Action",
svyUUID:"C9249CA7-FB02-45E9-9413-427D6084B8BE",
text:"Action"
},
{
itemId:"3.2",
itemText:"Another action",
svyUUID:"D487DE5E-0EB7-4736-9684-F37DC3DBCD33",
text:"More action"
},
{
enabled:false,
isDivider:false,
itemId:"3.3",
svyUUID:"01D55A10-E171-4B26-8A13-6420A7BA4763"
},
{
enabled:true,
iconName:"fa fa-futbol-o",
itemId:"3.4",
itemText:"Last action",
svyUUID:"8CB0B744-B476-42C7-B5D1-210AAD3200A4",
text:"Last action"
}
],
svyUUID:"DDE7F4F1-81A3-44F2-A2D5-9515218F485D",
text:"Dropdown"
},
{
dataProvider:"searchField",
displayType:"INPUT_GROUP",
iconName:"glyphicon glyphicon-search",
inputButtonText:"Search",
itemId:"4",
itemText:"Enter search",
onAction:"972F73D6-F645-4BB2-B6A1-F52B7AB90CCC",
svyUUID:"789BCD02-3017-4F83-8E7D-C14293246CC6",
text:"Enter search",
valuelist:null
},
{
dataProvider:"searchField",
displayType:"INPUT",
itemId:"42",
onAction:"972F73D6-F645-4BB2-B6A1-F52B7AB90CCC",
svyUUID:"2F78EAFD-1B4B-4DE3-9D64-3393980AED75",
text:"Input Search"
},
{
dataProvider:"searchTypeahead",
displayType:"INPUT_GROUP",
iconName:"fa fa-search",
inputButtonText:"Search",
itemId:"41",
onAction:"17ED2B3A-B6F5-4B66-91EF-8BB9F7387FDB",
svyUUID:"057D9ECB-D702-424A-BE85-99A7C634EB9D",
text:"Enter product name",
valuelist:"4A1A4ADB-E138-4E47-B912-AC718E1FD795"
},
{
displayType:"TEXT",
position:"RIGHT",
svyUUID:"36D7E0C2-EE29-4BA0-80B0-121F0A2A3F9B",
text:"Just some text"
},
{
iconName:"glyphicon glyphicon-user",
inputButtonStyleClass:"btn-danger",
itemId:"5",
itemText:"John Doe",
position:"RIGHT",
subMenuItems:[
{
iconName:"glyphicon glyphicon-cog",
itemId:"5.1",
itemText:"Settings",
svyUUID:"8554F1AB-06A9-4B53-8487-42786D0577C9",
text:"Settings"
},
{
iconName:"fa fa-lock",
isDivider:false,
itemId:"5.2",
itemText:"Log out",
svyUUID:"86E615CE-0ED6-4BD9-8529-0203B3CBD11F",
text:"Log out"
}
],
svyUUID:"6DC240CD-042A-4E0E-93B2-C0EF5A0ED74D",
text:"John Doe"
}
],
onBrandClicked:"FC8A259F-8EE2-4292-8F30-21E46DE57F40",
onBrandLogoClicked:"FC8A259F-8EE2-4292-8F30-21E46DE57F40",
onMenuItemClicked:"1C2DE078-10A9-418B-BD65-D909FBEB82F1",
size:{
height:55,
width:600
},
visible:true
},
location:"20,20",
name:"navbar",
size:"600,55",
typeName:"bootstrapextracomponents-navbar",
typeid:47,
uuid:"D45C0DC3-07B1-4BCB-88F3-D793BBA90A38"
},
{
location:"20,250",
onActionMethodID:"45BEF13D-9EA4-4FF6-87A8-CD258E3644D4",
size:"110,35",
text:"Icon menu",
typeid:7,
uuid:"F50DEE44-CEB5-468A-9A64-507307065B01"
},
{
location:"20,200",
onActionMethodID:"6C2A9AC6-8498-46A2-AA71-BE3EDDB0DD34",
size:"110,35",
text:"Create menu",
typeid:7,
uuid:"F85E52CE-0214-4E8B-B59E-917B1B659017"
}
],
name:"demoNavBar",
navigatorID:"-1",
showInMenu:true,
typeid:3,
uuid:"CF6FFD6A-2ECA-4CB8-BE39-B00D206AC4B6"