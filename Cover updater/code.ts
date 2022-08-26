// Load UI to execute network calls
figma.showUI( "<b>Hello from Figma</b>", { visible: false })
figma.ui.postMessage({ type: 'networkRequest' })
console.log('Starting Cover Updater')

// Loading all the needed fonts
const loadFonts = async () => {

  await figma.loadFontAsync({ family: "Inter", style: "Medium" })

  console.log("Awaiting the fonts.")

}

loadFonts().then(() => {
    console.log("Fonts fetched and ready to go!")

    // Define component nodes to enable edit
    let authorComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "authorName")  as ComponentNode;
    let updateComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "lastUpdate")  as ComponentNode;
   
    // Define templates 
    let newAuthor = authorComponent;
    let templateName = newAuthor.findOne(node => node.type == "TEXT") as TextNode;

    // Print designer name
    templateName.characters = figma.currentUser.name
    
    // Define templates
    let newUpdate = updateComponent;
    let templateDate = newUpdate.findOne(node => node.type == "TEXT") as TextNode;
    
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date();
    let day = date.getDate()
    let month = monthName[date.getMonth()];
    let year = date.getFullYear()
  
    let newDate = day + ' ' + month + ' ' + year;

    // Print last update
    templateDate.characters = newDate

    console.log("All done baby! Sayonara!")
    
    figma.closePlugin("Cover updated")
})
