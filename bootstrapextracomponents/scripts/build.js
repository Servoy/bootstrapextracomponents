var AdmZip = require('adm-zip');

// creating archives
var zip = new AdmZip();

zip.addLocalFolder("./META-INF/", "/META-INF/");
zip.addLocalFolder("./dist/servoy/bootstrapextracomponents/", "/dist/servoy/bootstrapextracomponents/");
zip.addLocalFolder("./badge/", "/badge/");
zip.addLocalFolder("./breadcrumbs/", "/breadcrumbs/");
zip.addLocalFolder("./buttonsGroup/", "/buttonsGroup/");
zip.addLocalFolder("./carousel/", "/carousel/");
zip.addLocalFolder("./dropdown/", "/dropdown/");
zip.addLocalFolder("./icon/", "/icon/");
zip.addLocalFolder("./inputgroup/", "/inputgroup/");
zip.addLocalFolder("./navbar/", "/navbar/");
zip.addLocalFolder("./progressbar/", "/progressbar/");
zip.addLocalFolder("./rating/", "/rating/");
zip.addLocalFolder("./switch/", "/switch/");
zip.addLocalFolder("./lib/", "/lib/");

zip.writeZip("bootstrapextracomponents.zip");