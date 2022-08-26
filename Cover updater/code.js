var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Load UI to execute network calls
figma.showUI("<b>Hello from Figma</b>", { visible: false });
figma.ui.postMessage({ type: 'networkRequest' });
console.log('Starting Cover Updater');
// Loading all the needed fonts
const loadFonts = () => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Inter", style: "Medium" });
    console.log("Awaiting the fonts.");
});
loadFonts().then(() => {
    console.log("Fonts fetched and ready to go!");
    // Define component nodes to enable edit
    let authorComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "authorName");
    let updateComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "lastUpdate");
    // Define templates 
    let newAuthor = authorComponent;
    let templateName = newAuthor.findOne(node => node.type == "TEXT");
    // Print designer name
    templateName.characters = figma.currentUser.name;
    // Define templates
    let newUpdate = updateComponent;
    let templateDate = newUpdate.findOne(node => node.type == "TEXT");
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let day = date.getDate();
    let month = monthName[date.getMonth()];
    let year = date.getFullYear();
    let newDate = day + ' ' + month + ' ' + year;
    // Print last update
    templateDate.characters = newDate;
    console.log("All done baby! Sayonara!");
    figma.closePlugin("Cover updated");
});
